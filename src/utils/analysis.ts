import { QuizResult, DiagnosisResult, KnowledgeGap, MCQQuestion } from '@/types/mcq';
import { knowledgeGapDefinitions } from '@/data/questions';
import { generateAIDiagnosis, generateStudyPlan, DiagnosisPromptData } from '@/lib/openai';

export async function analyzeQuizResults(
  results: QuizResult[], 
  questions: MCQQuestion[], 
  useAI: boolean = true,
  customKnowledgeGaps?: Record<string, KnowledgeGap>
): Promise<DiagnosisResult> {
  const totalQuestions = results.length;
  const correctAnswers = results.filter(result => result.isCorrect).length;
  const score = Math.round((correctAnswers / totalQuestions) * 100);

  // Collect knowledge gaps from incorrect answers
  const knowledgeGapCounts: Record<string, number> = {};
  const identifiedGaps = new Set<string>();

  results.forEach(result => {
    if (!result.isCorrect && result.knowledgeGap && result.knowledgeGap !== 'none') {
      knowledgeGapCounts[result.knowledgeGap] = (knowledgeGapCounts[result.knowledgeGap] || 0) + 1;
      identifiedGaps.add(result.knowledgeGap);
    }
  });

  // Use custom knowledge gaps if provided, otherwise fall back to default
  const gapDefinitions = customKnowledgeGaps || knowledgeGapDefinitions;
  
  // Convert to knowledge gap objects with recommendations
  const knowledgeGaps: (KnowledgeGap & { frequency: number })[] = Array.from(identifiedGaps)
    .map(gapKey => {
      const gapDefinition = gapDefinitions[gapKey];
      return gapDefinition ? {
        ...gapDefinition,
        frequency: knowledgeGapCounts[gapKey] || 1
      } : null;
    })
    .filter((gap): gap is KnowledgeGap & { frequency: number } => gap !== null)
    .sort((a, b) => b.frequency - a.frequency); // Sort by frequency, most common first

  // Generate personalized feedback using AI or fallback to local logic
  let feedback = '';
  
  if (useAI) {
    try {
      // Prepare data for OpenAI analysis
      const diagnosisData: DiagnosisPromptData = {
        questions: results.map(result => {
          const question = questions.find(q => q.id === result.questionId);
          const selectedOption = question?.options.find(opt => opt.id === result.selectedOptionId);
          const correctOption = question?.options.find(opt => opt.isCorrect);
          
          return {
            question: question?.question || 'Unknown question',
            selectedAnswer: selectedOption?.text || 'Unknown answer',
            correctAnswer: correctOption?.text || 'Unknown correct answer',
            isCorrect: result.isCorrect,
            category: question?.category || 'Unknown category',
            difficulty: question?.difficulty || 'beginner'
          };
        }),
        score,
        totalQuestions
      };
      
      feedback = await generateAIDiagnosis(diagnosisData);
    } catch (error) {
      console.error('AI diagnosis failed, falling back to local analysis:', error);
      feedback = generateFeedback(score, knowledgeGaps, totalQuestions);
    }
  } else {
    feedback = generateFeedback(score, knowledgeGaps, totalQuestions);
  }

  return {
    knowledgeGaps,
    score,
    totalQuestions,
    feedback
  };
}

function generateFeedback(score: number, knowledgeGaps: (KnowledgeGap & { frequency: number })[], totalQuestions: number): string {
  let feedback = '';

  // Performance assessment
  if (score >= 90) {
    feedback += '🎉 Excellent work! You have a strong understanding of quantum computing concepts. ';
  } else if (score >= 70) {
    feedback += '👍 Good job! You have a solid foundation in quantum computing, with some areas for improvement. ';
  } else if (score >= 50) {
    feedback += '📚 You\'re on the right track! There are several key concepts that need more attention. ';
  } else {
    feedback += '🎯 This is a great starting point! Focus on building your fundamental understanding of quantum computing. ';
  }

  // Knowledge gap analysis
  if (knowledgeGaps.length === 0) {
    feedback += 'You demonstrated clear understanding across all the quantum computing topics covered.';
  } else if (knowledgeGaps.length <= 2) {
    feedback += `You have ${knowledgeGaps.length} main area${knowledgeGaps.length > 1 ? 's' : ''} to focus on: `;
    feedback += knowledgeGaps.map(gap => gap.concept.toLowerCase()).join(' and ') + '.';
  } else {
    feedback += `You have ${knowledgeGaps.length} areas that need attention. `;
    feedback += `Focus particularly on ${knowledgeGaps.slice(0, 2).map(gap => gap.concept.toLowerCase()).join(' and ')}, `;
    feedback += 'as these appeared most frequently in your incorrect answers.';
  }

  // Encouragement and next steps
  if (score < 70) {
    feedback += ' Consider reviewing the fundamental concepts before moving to advanced topics.';
  } else {
    feedback += ' You\'re ready to explore more advanced quantum computing applications!';
  }

  return feedback;
}

export function getStudyPriority(knowledgeGaps: (KnowledgeGap & { frequency?: number })[]): string[] {
  // Define concept hierarchies and dependencies
  const conceptHierarchy: Record<string, number> = {
    'Classical vs Quantum Information': 1,
    'Information Storage vs Operations': 1,
    'System Components vs Fundamental Units': 1,
    'Quantum Properties vs Noise Effects': 2,
    'Superposition vs Entanglement': 2,
    'Superposition vs Interference': 2,
    'Quantum Measurement Effects': 3,
    'Measurement Consequences': 3,
    'Measurement vs Entanglement Creation': 3,
    'Quantum Gate Operations': 3,
    'Single vs Multi-Qubit Gates': 4,
    'Bit-Flip vs Phase Operations': 4,
    'Physical vs Quantum Correlations': 4,
    'Entanglement vs Superposition': 4,
    'Entanglement vs Interference': 4,
    'Quantum Algorithm Applications': 5,
    'Algorithm-Specific Purposes': 5,
    'Theoretical vs Practical Algorithms': 5,
    'Decoherence Sources': 6,
    'Decoherence vs Entanglement': 6,
    'Decoherence vs Measurement': 6,
    'Algorithm Confusion': 6,
    'Algorithms vs Quantum Phenomena': 6
  };

  // Sort by hierarchy level first, then by frequency
  return knowledgeGaps
    .sort((a, b) => {
      const levelA = conceptHierarchy[a.concept] || 99;
      const levelB = conceptHierarchy[b.concept] || 99;
      
      if (levelA !== levelB) {
        return levelA - levelB; // Lower level = higher priority
      }
      
      return (b.frequency || 1) - (a.frequency || 1); // Higher frequency = higher priority
    })
    .map(gap => gap.concept);
}