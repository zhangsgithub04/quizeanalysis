import { quantumQuestions, knowledgeGapDefinitions } from './questions';
import { MCQQuestion, KnowledgeGap } from '@/types/mcq';

export interface PredefinedSubject {
  id: string;
  title: string;
  description: string;
  subject: string;
  questions: MCQQuestion[];
  knowledgeGaps: Record<string, KnowledgeGap>;
  icon: string;
  color: string;
}

export const predefinedSubjects: PredefinedSubject[] = [
  {
    id: 'quantum-computing',
    title: 'Quantum Computing Fundamentals',
    description: 'Test your understanding of quantum computing concepts including qubits, superposition, entanglement, and quantum algorithms',
    subject: 'Quantum Computing',
    questions: quantumQuestions,
    knowledgeGaps: knowledgeGapDefinitions,
    icon: '⚛️',
    color: 'from-blue-600 to-purple-600'
  },
  {
    id: 'category-theory',
    title: 'Category Theory Fundamentals', 
    description: 'Explore the mathematical foundations of category theory including categories, functors, and natural transformations',
    subject: 'Category Theory',
    questions: [], // Will be loaded from JSON
    knowledgeGaps: {},
    icon: '📐',
    color: 'from-green-600 to-teal-600'
  },
  {
    id: 'blockchain',
    title: 'Blockchain Technology Fundamentals',
    description: 'Learn about distributed ledgers, cryptocurrencies, smart contracts, and blockchain security',
    subject: 'Blockchain & Cryptocurrency', 
    questions: [], // Will be loaded from JSON
    knowledgeGaps: {},
    icon: '🔗',
    color: 'from-orange-600 to-red-600'
  }
];

// Helper function to load JSON question sets
export async function loadQuestionSet(subjectId: string): Promise<PredefinedSubject | null> {
  const subject = predefinedSubjects.find(s => s.id === subjectId);
  if (!subject) return null;

  if (subject.id === 'quantum-computing') {
    return subject; // Already has questions loaded
  }

  try {
    // In a real app, you might load from an API or import dynamically
    // For now, we'll return the subject structure and let the component handle loading
    return subject;
  } catch (error) {
    console.error(`Failed to load questions for ${subjectId}:`, error);
    return null;
  }
}