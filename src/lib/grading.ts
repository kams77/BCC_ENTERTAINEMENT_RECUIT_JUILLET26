/**
 * Correction automatique des exercices.
 *
 * Fonctions pures (sans dépendance au navigateur) : le résultat de l'étudiant est
 * comparé à celui de la solution de référence, exécutée sur les mêmes données.
 * Aucune valeur attendue n'est codée en dur.
 */

export type Cell = string | number | null;

export interface ResultSet {
  columns: string[];
  rows: Cell[][];
}

export interface GradeResult {
  passed: boolean;
  /** Raisons de l'échec (aucune valeur attendue n'y est révélée). */
  issues: string[];
  /** Remarques qui n'empêchent pas la validation. */
  warnings: string[];
}

const ABS_TOLERANCE = 0.011;
const REL_TOLERANCE = 1e-9;

function toNumber(value: Cell): number | null {
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  if (typeof value === 'string' && value.trim() !== '' && Number.isFinite(Number(value))) {
    return Number(value);
  }
  return null;
}

export function cellsEqual(a: Cell, b: Cell): boolean {
  if (a === null || b === null) return a === b;
  const na = toNumber(a);
  const nb = toNumber(b);
  if (na !== null && nb !== null) {
    return Math.abs(na - nb) <= Math.max(ABS_TOLERANCE, REL_TOLERANCE * Math.abs(nb));
  }
  return String(a).trim() === String(b).trim();
}

/**
 * Compare le résultat d'une requête SQL à celui de la solution.
 * - les colonnes attendues doivent exister (par leur nom, sans tenir compte de la casse) ;
 *   des colonnes supplémentaires sont tolérées ;
 * - les lignes sont comparées sans tenir compte de l'ordre (un ordre différent
 *   est signalé en avertissement) ;
 * - les nombres sont comparés à 0,01 près.
 */
export function compareResultSets(actual: ResultSet, expected: ResultSet): GradeResult {
  const issues: string[] = [];
  const warnings: string[] = [];

  if (actual.columns.length === 0) {
    return { passed: false, issues: ['La requête ne renvoie aucun tableau de résultats.'], warnings };
  }

  // Association colonnes attendues -> colonnes obtenues
  const actualIndex = new Map<string, number>();
  actual.columns.forEach((name, i) => {
    const key = name.trim().toLowerCase();
    if (!actualIndex.has(key)) actualIndex.set(key, i);
  });
  const mapping: number[] = [];
  const missing: string[] = [];
  expected.columns.forEach((name) => {
    const idx = actualIndex.get(name.trim().toLowerCase());
    if (idx === undefined) missing.push(name);
    else mapping.push(idx);
  });
  if (missing.length > 0) {
    issues.push(
      `Colonne${missing.length > 1 ? 's' : ''} manquante${missing.length > 1 ? 's' : ''} ou mal nommée${
        missing.length > 1 ? 's' : ''
      } : ${missing.join(', ')}.`
    );
    return { passed: false, issues, warnings };
  }

  if (actual.rows.length !== expected.rows.length) {
    issues.push(
      `Nombre de lignes incorrect : ${actual.rows.length} obtenue${actual.rows.length > 1 ? 's' : ''}, ${
        expected.rows.length
      } attendue${expected.rows.length > 1 ? 's' : ''}. Vérifiez vos filtres (WHERE) et regroupements (GROUP BY).`
    );
  }

  // Appariement glouton des lignes, indépendamment de l'ordre
  const projected = actual.rows.map((row) => mapping.map((i) => row[i] ?? null));
  const used = new Array<boolean>(projected.length).fill(false);
  const matchedPositions: number[] = [];
  const unmatchedExpected: number[] = [];

  expected.rows.forEach((expRow, e) => {
    const found = projected.findIndex(
      (row, i) => !used[i] && row.every((cell, c) => cellsEqual(cell, expRow[c] ?? null))
    );
    if (found === -1) {
      unmatchedExpected.push(e);
    } else {
      used[found] = true;
      matchedPositions.push(found);
    }
  });

  if (unmatchedExpected.length > 0) {
    // Diagnostic : pour la première ligne non trouvée, quelles colonnes divergent-elles
    // dans la ligne obtenue la plus proche ? (sans afficher la valeur attendue)
    const expRow = expected.rows[unmatchedExpected[0]];
    let best: { row: Cell[]; score: number } | null = null;
    projected.forEach((row, i) => {
      if (used[i]) return;
      const score = row.filter((cell, c) => cellsEqual(cell, expRow[c] ?? null)).length;
      if (!best || score > best.score) best = { row, score };
    });
    if (best) {
      const found = best as { row: Cell[]; score: number };
      const wrongCols = expected.columns.filter((_, c) => !cellsEqual(found.row[c], expRow[c] ?? null));
      if (wrongCols.length > 0 && found.score > 0) {
        issues.push(`Valeurs incorrectes dans : ${wrongCols.join(', ')}.`);
      }
    }
    if (issues.length === 0 || actual.rows.length === expected.rows.length) {
      issues.push(
        `${unmatchedExpected.length} ligne${unmatchedExpected.length > 1 ? 's' : ''} attendue${
          unmatchedExpected.length > 1 ? 's' : ''
        } absente${unmatchedExpected.length > 1 ? 's' : ''} de votre résultat.`
      );
    }
  }

  if (issues.length === 0) {
    const inOrder = matchedPositions.every((pos, i) => i === 0 || pos > matchedPositions[i - 1]);
    if (!inOrder) {
      warnings.push("Les lignes sont correctes mais dans un ordre différent de celui demandé (ORDER BY).");
    }
  }

  return { passed: issues.length === 0, issues, warnings };
}

// ---------------------------------------------------------------------------
// Python : comparaison des nombres affichés
// ---------------------------------------------------------------------------

/**
 * Extrait les valeurs numériques d'une sortie texte (print, DataFrame…).
 * Les dates (2024-12-06), trimestres (2024-T1) sont ignorés, ainsi que les
 * séparateurs de milliers (1,234.50).
 */
export function extractNumbers(text: string): number[] {
  const cleaned = text
    .replace(/\d{4}-\d{2}-\d{2}/g, ' ')
    .replace(/\d{4}-T\d/gi, ' ')
    .replace(/(?<=\d),(?=\d{3}(?!\d))/g, '');
  const matches = cleaned.match(/-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g) ?? [];
  return matches.map(Number).filter((n) => Number.isFinite(n));
}

/** Les petits entiers sont, la plupart du temps, des index de lignes pandas : ignorés. */
function isSignificant(n: number): boolean {
  return !(Number.isInteger(n) && Math.abs(n) <= 50);
}

/**
 * Vérifie que chaque valeur significative affichée par la solution de référence
 * est aussi affichée par le code de l'étudiant (quelle que soit la mise en forme).
 */
export function compareNumericOutput(actualText: string, expectedText: string): GradeResult {
  const issues: string[] = [];
  const expected = extractNumbers(expectedText).filter(isSignificant);
  const actual = extractNumbers(actualText);

  if (actualText.trim() === '') {
    return {
      passed: false,
      issues: ["Votre script n'affiche rien : utilisez print(...) pour afficher le résultat final."],
      warnings: [],
    };
  }

  if (expected.length === 0) {
    return { passed: true, issues, warnings: [] };
  }

  // Garde-fou : afficher tout un tableau « en vrac » ne doit pas suffire à contenir
  // par hasard les bonnes valeurs.
  const significantActual = actual.filter(isSignificant).length;
  if (significantActual > expected.length * 2 + 10) {
    return {
      passed: false,
      issues: [
        "Votre affichage contient bien plus de valeurs que le résultat demandé : n'affichez que le résultat final de l'exercice.",
      ],
      warnings: [],
    };
  }

  const used = new Array<boolean>(actual.length).fill(false);
  let missing = 0;
  for (const value of expected) {
    const tol = Math.max(0.051, 1e-4 * Math.abs(value));
    const idx = actual.findIndex((a, i) => !used[i] && Math.abs(a - value) <= tol);
    if (idx === -1) missing += 1;
    else used[idx] = true;
  }

  if (missing > 0) {
    issues.push(
      `${missing} valeur${missing > 1 ? 's' : ''} sur ${expected.length} attendue${
        missing > 1 ? 's' : ''
      } ne figure${missing > 1 ? 'nt' : ''} pas dans votre affichage ou ${
        missing > 1 ? 'sont' : 'est'
      } incorrecte${missing > 1 ? 's' : ''}. Vérifiez vos calculs et que le résultat final est bien affiché.`
    );
  }
  return { passed: issues.length === 0, issues, warnings: [] };
}
