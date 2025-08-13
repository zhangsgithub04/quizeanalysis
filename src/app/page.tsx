'use client';

import { useState } from 'react';
import MCQComponent from '@/components/MCQComponent';
import ResultsComponent from '@/components/ResultsComponent';
import QuestionUploadComponent from '@/components/QuestionUploadComponent';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { quantumQuestions, knowledgeGapDefinitions } from '@/data/questions';
import { QuizResult, DiagnosisResult, MCQQuestion, KnowledgeGap } from '@/types/mcq';
import { analyzeQuizResults } from '@/utils/analysis';
import { Brain, Zap, Target, Upload } from 'lucide-react';

type AppState = 'welcome' | 'upload' | 'quiz' | 'results';

interface QuestionSet {
  title: string;
  description: string;
  subject: string;
  questions: MCQQuestion[];
  knowledgeGaps: Record<string, KnowledgeGap>;
}

export default function Home() {
  const [appState, setAppState] = useState<AppState>('welcome');
  const [diagnosis, setDiagnosis] = useState<DiagnosisResult | null>(null);
  const [currentQuestionSet, setCurrentQuestionSet] = useState<QuestionSet>({
    title: "Quantum Computing Knowledge Gap Diagnostic",
    description: "Test your understanding of fundamental quantum computing concepts",
    subject: "Quantum Computing",
    questions: quantumQuestions,
    knowledgeGaps: knowledgeGapDefinitions
  });

  const handleStartQuiz = () => {
    setAppState('quiz');
  };

  const handleUploadQuestions = () => {
    setAppState('upload');
  };

  const handleQuestionsLoaded = (questionSet: QuestionSet) => {
    setCurrentQuestionSet(questionSet);
    setAppState('quiz');
  };

  const handleQuizComplete = async (results: QuizResult[]) => {
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
    setCurrentQuestionSet({
      title: "Quantum Computing Knowledge Gap Diagnostic",
      description: "Test your understanding of fundamental quantum computing concepts",
      subject: "Quantum Computing",
      questions: quantumQuestions,
      knowledgeGaps: knowledgeGapDefinitions
    });
    setAppState('welcome');
  };

  const handleBackToWelcome = () => {
    setAppState('welcome');
  };

  if (appState === 'upload') {
    return <QuestionUploadComponent onQuestionsLoaded={handleQuestionsLoaded} onBack={handleBackToWelcome} />;
  }

  if (appState === 'quiz') {
    return <MCQComponent 
      questions={currentQuestionSet.questions} 
      onComplete={handleQuizComplete}
      onExit={handleBackToWelcome}
    />;
  }

  if (appState === 'results' && diagnosis) {
    return <ResultsComponent diagnosis={diagnosis} onRestart={handleRestart} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto p-6 pt-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="h-12 w-12 text-blue-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {currentQuestionSet.title}
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {currentQuestionSet.description}
          </p>
          <Badge variant="secondary" className="mt-2">
            {currentQuestionSet.subject}
          </Badge>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <Zap className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <CardTitle className="text-lg">Smart Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Each answer is analyzed to identify specific knowledge gaps and misconceptions
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Target className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <CardTitle className="text-lg">Targeted Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Get personalized recommendations and study resources based on your performance
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Brain className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <CardTitle className="text-lg">Learning Path</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Receive a prioritized study plan to maximize your learning efficiency
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Quiz Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Quiz Overview</CardTitle>
            <CardDescription>
              Test your understanding of fundamental quantum computing concepts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  📊 Quiz Details
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• {currentQuestionSet.questions.length} carefully crafted questions</li>
                  <li>• Multiple difficulty levels</li>
                  <li>• Estimated time: {Math.ceil(currentQuestionSet.questions.length * 1.5)}-{Math.ceil(currentQuestionSet.questions.length * 2)} minutes</li>
                  <li>• Covers {currentQuestionSet.subject.toLowerCase()} topics</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  🎯 Topics Covered
                </h3>
                <div className="flex flex-wrap gap-1">
                  {[...new Set(currentQuestionSet.questions.map(q => q.category))].map(category => (
                    <Badge key={category} variant="secondary">{category}</Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <h3 className="font-semibold mb-2">How it works:</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-start gap-2">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                  <div>
                    <p className="font-medium">Answer Questions</p>
                    <p className="text-muted-foreground">Each option tests specific concepts</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                  <div>
                    <p className="font-medium">Get Analysis</p>
                    <p className="text-muted-foreground">AI identifies knowledge gaps</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                  <div>
                    <p className="font-medium">Improve</p>
                    <p className="text-muted-foreground">Follow personalized study plan</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleStartQuiz} 
              size="lg" 
              className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Start Quiz
            </Button>
            <Button 
              onClick={handleUploadQuestions} 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6"
            >
              <Upload className="h-5 w-5 mr-2" />
              Upload Custom Questions
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Ready to test your knowledge? Start with the current set or upload your own questions.
          </p>
        </div>
      </div>
    </div>
  );
}