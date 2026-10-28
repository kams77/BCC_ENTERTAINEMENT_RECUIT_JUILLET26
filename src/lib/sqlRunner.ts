/**
 * Exécution réelle des requêtes SQL dans le navigateur (SQLite compilé en WebAssembly,
 * via sql.js). Le moteur est chargé à la demande depuis un CDN, puis mis en cache par
 * le service worker pour fonctionner hors ligne.
 */
import type { Cell, ResultSet } from './grading';

const SQLJS_VERSION = '1.10.3';
const SQLJS_BASE = `https://cdnjs.cloudflare.com/ajax/libs/sql.js/${SQLJS_VERSION}/`;

interface SqlJsStatement {
  run(values: unknown[]): void;
  free(): void;
}
interface SqlJsDatabase {
  run(sql: string): void;
  exec(sql: string): { columns: string[]; values: Cell[][] }[];
  prepare(sql: string): SqlJsStatement;
  close(): void;
}
interface SqlJsStatic {
  Database: new () => SqlJsDatabase;
}
declare global {
  interface Window {
    initSqlJs?: (config: { locateFile: (file: string) => string }) => Promise<SqlJsStatic>;
  }
}

let enginePromise: Promise<SqlJsStatic> | null = null;

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('script-load-failed'));
    document.head.appendChild(script);
  });
}

/** Charge le moteur SQL (une seule fois). */
export function loadSqlEngine(): Promise<SqlJsStatic> {
  if (!enginePromise) {
    enginePromise = (async () => {
      if (!window.initSqlJs) await loadScript(`${SQLJS_BASE}sql-wasm.js`);
      if (!window.initSqlJs) throw new Error('sql-engine-unavailable');
      return window.initSqlJs({ locateFile: (file) => `${SQLJS_BASE}${file}` });
    })().catch((error) => {
      enginePromise = null; // permet de réessayer (ex. connexion rétablie)
      throw error;
    });
  }
  return enginePromise;
}

const quote = (identifier: string) => `"${identifier.replace(/"/g, '""')}"`;

/**
 * Crée la table dans une base en mémoire, exécute la requête, renvoie le dernier
 * tableau de résultats. Les colonnes numériques sont déclarées REAL pour que les
 * divisions se comportent comme dans les corrigés (pas de division entière).
 */
export async function runSql(
  tableName: string,
  rows: Record<string, Cell>[],
  query: string
): Promise<ResultSet> {
  const SQL = await loadSqlEngine();
  const db = new SQL.Database();
  try {
    const columns = rows.length > 0 ? Object.keys(rows[0]) : [];
    if (columns.length > 0) {
      const defs = columns.map((col) => {
        const sample = rows.find((r) => r[col] !== null && r[col] !== undefined)?.[col];
        return `${quote(col)} ${typeof sample === 'number' ? 'REAL' : 'TEXT'}`;
      });
      db.run(`CREATE TABLE ${quote(tableName)} (${defs.join(', ')})`);
      const insert = db.prepare(
        `INSERT INTO ${quote(tableName)} VALUES (${columns.map(() => '?').join(', ')})`
      );
      for (const row of rows) insert.run(columns.map((col) => row[col] ?? null));
      insert.free();
    }

    const results = db.exec(query);
    const last = results[results.length - 1];
    return last ? { columns: last.columns, rows: last.values } : { columns: [], rows: [] };
  } finally {
    db.close();
  }
}
