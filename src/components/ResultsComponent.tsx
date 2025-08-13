'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { DiagnosisResult, KnowledgeGap } from '@/types/mcq';
import { getStudyPriority } from '@/utils/analysis';
import { CheckCircle, AlertCircle, BookOpen, Target, RotateCcw } from 'lucide-react';

interface ResultsComponentProps {
  diagnosis: DiagnosisResult;
  onRestart: () => void;
}

export default function ResultsComponent({ diagnosis, onRestart }: ResultsComponentProps) {
  const { score, totalQuestions, knowledgeGaps, feedback } = diagnosis;
  const studyPriority = getStudyPriority(knowledgeGaps as (KnowledgeGap & { frequency?: number })[]);
  
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 70) return <CheckCircle className="h-6 w-6 text-green-500" />;
    return <AlertCircle className="h-6 w-6 text-yellow-500" />;
  };

  const getDifficultyColor = (index: number) => {
    if (index === 0) return 'destructive';
    if (index === 1) return 'secondary';
    return 'outline';
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Quiz Results</h1>
        <p className="text-muted-foreground">
          Your quantum computing knowledge assessment is complete
        </p>
      </div>

      {/* Score Card */}
      <Card>
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            {getScoreIcon(score)}
            <CardTitle className={`text-4xl ${getScoreColor(score)}`}>
              {score}%
            </CardTitle>
          </div>
          <CardDescription>
            You answered {totalQuestions - knowledgeGaps.length} out of {totalQuestions} questions correctly
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={score} className="w-full h-3" />
        </CardContent>
      </Card>

      {/* Feedback */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="text-sm leading-relaxed">
          {feedback}
        </AlertDescription>
      </Alert>

      {/* Knowledge Gaps */}
      {knowledgeGaps.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Knowledge Gaps Identified
            </CardTitle>
            <CardDescription>
              Areas where your understanding can be strengthened
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {knowledgeGaps.map((gap, index) => (
              <div key={gap.concept} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm">{gap.concept}</h3>
                    <Badge variant={getDifficultyColor(index)}>
                      Priority {index + 1}
                    </Badge>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">
                  {gap.description}
                </p>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium">
                    💡 Recommendation: {gap.recommendation}
                  </p>
                  
                  <div className="space-y-1">
                    <p className="text-sm font-medium flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      Study Resources:
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {gap.resources.map((resource, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-xs mt-1">•</span>
                          <span>{resource}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Study Plan */}
      {studyPriority.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Recommended Study Plan
            </CardTitle>
            <CardDescription>
              Focus on these concepts in order for maximum learning efficiency
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {studyPriority.slice(0, 5).map((concept, index) => (
                <div key={concept} className="flex items-center gap-3 p-2 rounded-md bg-muted/30">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>
                  <span className="text-sm font-medium">{concept}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex justify-center gap-4">
        <Button onClick={onRestart} variant="outline" className="flex items-center gap-2">
          <RotateCcw className="h-4 w-4" />
          Take Quiz Again
        </Button>
        <Button onClick={() => window.print()} className="flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          Save Results
        </Button>
      </div>
    </div>
  );
}