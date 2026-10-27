export type DifficultyLevel = 'Fondamental' | 'Intermédiaire' | 'Avancé' | 'Expert';

export type ExerciseCategory = 
  | 'Traitement & Qualité des Données'
  | 'Ratios Prudentiels & Risque'
  | 'Séries Temporelles & Marché des Changes'
  | 'Politique Monétaire & Agrégats'
  | 'Stress-Testing & Modélisation';

export interface ExerciseTestCase {
  id: string;
  name: string;
  description: string;
  expectedOutput: string | number | boolean;
}

export interface ExerciseDataRow {
  [key: string]: string | number | null;
}

export interface Exercise {
  id: string;
  title: string;
  category: ExerciseCategory;
  difficulty: DifficultyLevel;
  estimatedTimeMin: number;
  tags: string[];
  department: 'DSIF (Surveillance Bancaire)' | 'DRE (Recherche & Études)' | 'DSI (Systèmes d\'Information)' | 'DOM (Opérations Monétaires)';
  context: string;
  objective: string;
  datasetName: string;
  datasetDescription: string;
  sampleData: ExerciseDataRow[];
  columns: { key: string; label: string; type: 'string' | 'number' | 'date' }[];
  initialCodeSQL: string;
  initialCodePython: string;
  solutionSQL: string;
  solutionPython: string;
  solutionExplanation: string;
  hints: string[];
  bccContextNotes: string;
  expectedResultMetric?: {
    label: string;
    value: string;
    explanation: string;
  };
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  bccReference?: string;
}

export interface ReadingModule {
  id: string;
  moduleNumber: string;
  title: string;
  subtitle: string;
  estimatedReadingTime: string;
  category: string;
  priority: 'Priorité Absolue' | 'Hautement Recommandé' | 'Approfondissement';
  summary: string;
  keyTakeaways: string[];
  officialReferences: string[];
  contentSections: {
    heading: string;
    body: string;
    callout?: {
      type: 'law' | 'formula' | 'bcc-note';
      title: string;
      content: string;
    };
  }[];
  quiz: QuizQuestion[];
}

export interface ExamQuestion {
  id: string;
  section: 'Partie 1: Réglementation & Missions BCC' | 'Partie 2: Calculs Financiers & Ratios' | 'Partie 3: Analyse de Données & SQL/Python';
  question: string;
  contextSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  points: number;
}

export interface DatasetItem {
  id: string;
  name: string;
  filename: string;
  description: string;
  frequency: 'Quotidienne' | 'Hebdomadaire' | 'Mensuelle' | 'Trimestrielle';
  source: string;
  recordCount: number;
  headers: string[];
  previewRows: Record<string, string | number>[];
  downloadData: string; // CSV formatted string
}
