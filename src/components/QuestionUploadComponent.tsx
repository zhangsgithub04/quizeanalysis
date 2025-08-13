'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, CheckCircle, AlertCircle, Download } from 'lucide-react';
import { MCQQuestion, KnowledgeGap } from '@/types/mcq';

interface QuestionSet {
  title: string;
  description: string;
  subject: string;
  questions: MCQQuestion[];
  knowledgeGaps: Record<string, KnowledgeGap>;
}

interface QuestionUploadProps {
  onQuestionsLoaded: (questionSet: QuestionSet) => void;
  onBack: () => void;
}

export default function QuestionUploadComponent({ onQuestionsLoaded, onBack }: QuestionUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [questionSet, setQuestionSet] = useState<QuestionSet | null>(null);

  const validateQuestionSet = (data: unknown): QuestionSet => {
    // Type guard for basic structure
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid data format. Must be a valid JSON object.');
    }

    const typedData = data as Record<string, unknown>;

    if (!typedData.title || !typedData.questions || !Array.isArray(typedData.questions)) {
      throw new Error('Invalid question set format. Must include title and questions array.');
    }

    if (typedData.questions.length === 0) {
      throw new Error('Question set must contain at least one question.');
    }

    // Validate each question
    typedData.questions.forEach((question: unknown, index: number) => {
      if (!question || typeof question !== 'object') {
        throw new Error(`Question ${index + 1}: Invalid question format.`);
      }

      const typedQuestion = question as Record<string, unknown>;

      if (!typedQuestion.id || !typedQuestion.question || !typedQuestion.options || !Array.isArray(typedQuestion.options)) {
        throw new Error(`Question ${index + 1}: Missing required fields (id, question, options).`);
      }

      if (typedQuestion.options.length < 2) {
        throw new Error(`Question ${index + 1}: Must have at least 2 options.`);
      }

      const correctOptions = typedQuestion.options.filter((opt: unknown) => {
        if (!opt || typeof opt !== 'object') return false;
        return (opt as Record<string, unknown>).isCorrect === true;
      });
      
      if (correctOptions.length !== 1) {
        throw new Error(`Question ${index + 1}: Must have exactly one correct option.`);
      }

      typedQuestion.options.forEach((option: unknown, optIndex: number) => {
        if (!option || typeof option !== 'object') {
          throw new Error(`Question ${index + 1}, Option ${optIndex + 1}: Invalid option format.`);
        }

        const typedOption = option as Record<string, unknown>;
        
        if (!typedOption.id || !typedOption.text || typeof typedOption.isCorrect !== 'boolean') {
          throw new Error(`Question ${index + 1}, Option ${optIndex + 1}: Missing required fields.`);
        }
      });
    });

    return {
      title: typedData.title as string,
      description: (typedData.description as string) || 'Custom question set',
      subject: (typedData.subject as string) || 'General Knowledge',
      questions: typedData.questions as MCQQuestion[],
      knowledgeGaps: (typedData.knowledgeGaps as Record<string, KnowledgeGap>) || {}
    };
  };

  const handleFile = async (file: File) => {
    setUploadStatus('loading');
    setErrorMessage('');

    try {
      const text = await file.text();
      const data = JSON.parse(text);
      const validatedQuestionSet = validateQuestionSet(data);
      
      setQuestionSet(validatedQuestionSet);
      setUploadStatus('success');
    } catch (error) {
      setUploadStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Invalid file format');
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type === 'application/json') {
      handleFile(file);
    } else {
      setUploadStatus('error');
      setErrorMessage('Please upload a JSON file');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const downloadTemplate = () => {
    const template = {
      title: "Sample Quiz",
      description: "A sample quiz for demonstration",
      subject: "Sample Subject",
      questions: [
        {
          id: "1",
          question: "What is 2 + 2?",
          category: "Basic Math",
          difficulty: "beginner",
          options: [
            {
              id: "1a",
              text: "3",
              isCorrect: false,
              knowledgeGap: "basic-arithmetic",
              concept: "Basic addition confusion"
            },
            {
              id: "1b", 
              text: "4",
              isCorrect: true,
              knowledgeGap: "none",
              concept: "Correct arithmetic"
            },
            {
              id: "1c",
              text: "5",
              isCorrect: false,
              knowledgeGap: "basic-arithmetic",
              concept: "Basic addition confusion"
            }
          ]
        }
      ],
      knowledgeGaps: {
        "basic-arithmetic": {
          concept: "Basic Arithmetic",
          description: "Understanding fundamental mathematical operations",
          recommendation: "Practice basic addition and subtraction",
          resources: ["Math basics textbook", "Online arithmetic practice"]
        }
      }
    };

    const blob = new Blob([JSON.stringify(template, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'question-template.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleStartQuiz = () => {
    if (questionSet) {
      onQuestionsLoaded(questionSet);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto p-6 pt-12">
        <div className="mb-8">
          <Button variant="outline" onClick={onBack} className="mb-4">
            ← Back to Home
          </Button>
          <h1 className="text-3xl font-bold mb-2">Upload Question Set</h1>
          <p className="text-muted-foreground">Upload a custom JSON file with your quiz questions</p>
        </div>

        {/* Template Download */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Question Format Template
            </CardTitle>
            <CardDescription>
              Download a sample template to understand the required JSON format
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={downloadTemplate} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download Template
            </Button>
          </CardContent>
        </Card>

        {/* File Upload */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Upload Questions</CardTitle>
            <CardDescription>
              Drag and drop a JSON file or click to browse
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950' 
                  : 'border-gray-300 dark:border-gray-600'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept=".json"
                onChange={handleChange}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium mb-2">
                  Drop JSON file here or click to browse
                </p>
                <p className="text-sm text-muted-foreground">
                  Supports .json files only
                </p>
              </label>
            </div>

            {uploadStatus === 'loading' && (
              <div className="mt-4 text-center">
                <p>Processing file...</p>
              </div>
            )}

            {uploadStatus === 'error' && (
              <Alert className="mt-4" variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Success State */}
        {uploadStatus === 'success' && questionSet && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                Question Set Loaded Successfully!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{questionSet.title}</h3>
                <p className="text-muted-foreground">{questionSet.description}</p>
              </div>
              
              <div className="flex items-center gap-4">
                <Badge variant="outline">
                  <FileText className="h-3 w-3 mr-1" />
                  {questionSet.questions.length} questions
                </Badge>
                <Badge variant="secondary">{questionSet.subject}</Badge>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Categories:</h4>
                  <div className="flex flex-wrap gap-1">
                    {[...new Set(questionSet.questions.map(q => q.category))].map(category => (
                      <Badge key={category} variant="outline" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Difficulty Levels:</h4>
                  <div className="flex flex-wrap gap-1">
                    {[...new Set(questionSet.questions.map(q => q.difficulty))].map(difficulty => (
                      <Badge key={difficulty} variant="outline" className="text-xs">
                        {difficulty}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button onClick={handleStartQuiz} size="lg" className="w-full">
                  Start Quiz with Custom Questions
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}