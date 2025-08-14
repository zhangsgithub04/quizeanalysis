export interface MCQOption {
  id: string;
  text: string;
  isCorrect: boolean;
  knowledgeGap: string;
  concept: string;
}

export interface MCQQuestion {
  id: string;
  question: string;
  options: MCQOption[];
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  prereq?: string;
}

export interface KnowledgeGap {
  concept: string;
  description: string;
  recommendation: string;
  resources: string[];
}

export interface QuizResult {
  questionId: string;
  selectedOptionId: string;
  isCorrect: boolean;
  knowledgeGap?: string;
}

export interface DiagnosisResult {
  knowledgeGaps: (KnowledgeGap & { frequency: number })[];
  score: number;
  totalQuestions: number;
  feedback: string;
}