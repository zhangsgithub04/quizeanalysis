'use client';

import { useState } from 'react';
import MCQComponent from '@/components/MCQComponent';
import ResultsComponent from '@/components/ResultsComponent';
import QuestionUploadComponent from '@/components/QuestionUploadComponent';
import SubjectSelectionComponent from '@/components/SubjectSelectionComponent';
import { PredefinedSubject } from '@/data/predefined-subjects';
import { QuizResult, DiagnosisResult, MCQQuestion, KnowledgeGap } from '@/types/mcq';
import { analyzeQuizResults } from '@/utils/analysis';

type AppState = 'subject-selection' | 'upload' | 'quiz' | 'results';

interface QuestionSet {
  title: string;
  description: string;
  subject: string;
  questions: MCQQuestion[];
  knowledgeGaps: Record<string, KnowledgeGap>;
}

export default function Home() {
  const [appState, setAppState] = useState<AppState>('subject-selection');
  const [diagnosis, setDiagnosis] = useState<DiagnosisResult | null>(null);
  const [currentQuestionSet, setCurrentQuestionSet] = useState<QuestionSet | null>(null);

  const handleSubjectSelect = async (subject: PredefinedSubject) => {
    if (subject.id === 'quantum-computing') {
      // Quantum computing questions are already loaded
      setCurrentQuestionSet({
        title: subject.title,
        description: subject.description,
        subject: subject.subject,
        questions: subject.questions,
        knowledgeGaps: subject.knowledgeGaps
      });
      setAppState('quiz');
    } else {
      // Load questions from JSON files for other subjects
      try {
        const response = await fetch(`/sample-question-sets/${subject.id === 'category-theory' ? 'category-theory' : 'blockchain'}.json`);
        const data = await response.json();
        
        setCurrentQuestionSet({
          title: data.title,
          description: data.description,
          subject: data.subject,
          questions: data.questions,
          knowledgeGaps: data.knowledgeGaps
        });
        setAppState('quiz');
      } catch (error) {
        console.error('Failed to load question set:', error);
        // Fallback: use empty question set or show error
      }
    }
  };

  const handleUploadQuestions = () => {
    setAppState('upload');
  };

  const handleQuestionsLoaded = (questionSet: QuestionSet) => {
    setCurrentQuestionSet(questionSet);
    setAppState('quiz');
  };

  const handleQuizComplete = async (results: QuizResult[]) => {
    if (!currentQuestionSet) return;
    
    try {
      const diagnosisResult = await analyzeQuizResults(
        results, 
        currentQuestionSet.questions, 
        true, 
        currentQuestionSet.knowledgeGaps
      );
      setDiagnosis(diagnosisResult);
      setAppState('results');
    } catch (error) {
      console.error('Error analyzing quiz results:', error);
      // Fallback to local analysis
      const diagnosisResult = await analyzeQuizResults(
        results, 
        currentQuestionSet.questions, 
        false, 
        currentQuestionSet.knowledgeGaps
      );
      setDiagnosis(diagnosisResult);
      setAppState('results');
    }
  };

  const handleRestart = () => {
    setDiagnosis(null);
    setCurrentQuestionSet(null);
    setAppState('subject-selection');
  };

  const handleBackToSubjects = () => {
    setAppState('subject-selection');
  };

  if (appState === 'subject-selection') {
    return <SubjectSelectionComponent onSubjectSelect={handleSubjectSelect} onCustomUpload={handleUploadQuestions} />;
  }

  if (appState === 'upload') {
    return <QuestionUploadComponent onQuestionsLoaded={handleQuestionsLoaded} onBack={handleBackToSubjects} />;
  }

  if (appState === 'quiz' && currentQuestionSet) {
    return <MCQComponent 
      questions={currentQuestionSet.questions} 
      onComplete={handleQuizComplete}
      onExit={handleBackToSubjects}
    />;
  }

  if (appState === 'results' && diagnosis) {
    return <ResultsComponent diagnosis={diagnosis} onRestart={handleRestart} />;
  }

  // Fallback to subject selection if no valid state
  return <SubjectSelectionComponent onSubjectSelect={handleSubjectSelect} onCustomUpload={handleUploadQuestions} />;
}