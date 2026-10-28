/**
 * Accès centralisé au localStorage : toutes les clés de progression au même endroit,
 * lecture/écriture protégées (navigation privée, quota, stockage bloqué).
 */

export const STORAGE_KEYS = {
  strictMode: 'bcc_prep_strict_mode',
  completedExercises: 'bcc_prep_completed_exercises',
  completedModules: 'bcc_prep_completed_modules',
  examPassed: 'bcc_prep_exam_passed',
  masteredInterview: 'bcc_prep_mastered_interview',
  studyTasks: 'bcc_prep_study_tasks',
} as const;

export function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

export function writeJSON(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // stockage indisponible : la progression reste en mémoire pour la session
  }
}

export function readBoolean(key: string, fallback: boolean): boolean {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : raw === 'true';
  } catch {
    return fallback;
  }
}

export function writeBoolean(key: string, value: boolean): void {
  try {
    localStorage.setItem(key, String(value));
  } catch {
    // ignoré
  }
}

const BACKUP_VERSION = 1;

export interface ProgressBackup {
  app: 'bcc-dataprep';
  version: number;
  exportedAt: string;
  data: Record<string, string>;
}

/** Instantané de toute la progression, au format JSON téléchargeable. */
export function exportProgress(): ProgressBackup {
  const data: Record<string, string> = {};
  for (const key of Object.values(STORAGE_KEYS)) {
    try {
      const value = localStorage.getItem(key);
      if (value !== null) data[key] = value;
    } catch {
      // ignoré
    }
  }
  return { app: 'bcc-dataprep', version: BACKUP_VERSION, exportedAt: new Date().toISOString(), data };
}

/** Restaure une sauvegarde. Seules les clés connues, de type texte, sont acceptées. */
export function importProgress(raw: string): { ok: true } | { ok: false; error: string } {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { ok: false, error: "Ce fichier n'est pas un JSON valide." };
  }
  const backup = parsed as Partial<ProgressBackup> | null;
  if (!backup || backup.app !== 'bcc-dataprep' || typeof backup.data !== 'object' || backup.data === null) {
    return { ok: false, error: "Ce fichier n'est pas une sauvegarde BCC DataPrep." };
  }
  const allowed = new Set<string>(Object.values(STORAGE_KEYS));
  try {
    for (const [key, value] of Object.entries(backup.data)) {
      if (allowed.has(key) && typeof value === 'string') {
        localStorage.setItem(key, value);
      }
    }
  } catch {
    return { ok: false, error: "Impossible d'écrire dans le stockage du navigateur." };
  }
  return { ok: true };
}

export function resetProgress(): void {
  for (const key of Object.values(STORAGE_KEYS)) {
    try {
      localStorage.removeItem(key);
    } catch {
      // ignoré
    }
  }
}
