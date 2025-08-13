'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { X } from 'lucide-react';
import { MCQQuestion, QuizResult } from '@/types/mcq';

interface MCQComponentProps {
  questions: MCQQuestion[];
  onComplete: (results: QuizResult[]) => void;
  onExit?: () => void;
}

export default function MCQComponent({ questions, onComplete, onExit }: MCQComponentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<QuizResult[]>([]);

  const handleAnswerSelect = (questionId: string, optionId: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleNext = () => {
    const question = questions[currentQuestion];
    const selectedOptionId = selectedAnswers[question.id];
    
    if (selectedOptionId) {
      const selectedOption = question.options.find(opt => opt.id === selectedOptionId);
      
      const result: QuizResult = {
        questionId: question.id,
        selectedOptionId,
        isCorrect: selectedOption?.isCorrect || false,
        knowledgeGap: selectedOption?.isCorrect ? undefined : selectedOption?.knowledgeGap
      };

      const newResults = [...results, result];
      setResults(newResults);

      if (currentQuestion === questions.length - 1) {
        onComplete(newResults);
      } else {
        setCurrentQuestion(prev => prev + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      // Remove the result for the current question since we're going back
      setResults(prev => prev.slice(0, -1));
    }
  };

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestion === questions.length - 1;
  const hasSelectedAnswer = selectedAnswers[question.id];

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header with Exit Button */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm text-muted-foreground">
              {question.category} • {question.difficulty}
            </span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>
        
        {onExit && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onExit}
            className="ml-4 text-muted-foreground hover:text-foreground"
            title="Exit Quiz"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl">{question.question}</CardTitle>
          <CardDescription>
            Select the best answer from the options below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedAnswers[question.id] || ''}
            onValueChange={(value) => handleAnswerSelect(question.id, value)}
          >
            {question.options.map((option) => (
              <div key={option.id} className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50">
                <RadioGroupItem value={option.id} id={option.id} />
                <Label htmlFor={option.id} className="flex-1 cursor-pointer text-sm leading-relaxed">
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          Previous
        </Button>
        
        <Button
          onClick={handleNext}
          disabled={!hasSelectedAnswer}
          className="min-w-24"
        >
          {isLastQuestion ? 'Finish' : 'Next'}
        </Button>
      </div>
    </div>
  );
}