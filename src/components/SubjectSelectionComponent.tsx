'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, BookOpen, ArrowRight, Download } from 'lucide-react';
import { predefinedSubjects, PredefinedSubject } from '@/data/predefined-subjects';

interface SubjectSelectionProps {
  onSubjectSelect: (subject: PredefinedSubject) => void;
  onCustomUpload: () => void;
}

export default function SubjectSelectionComponent({ onSubjectSelect, onCustomUpload }: SubjectSelectionProps) {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const handleSubjectClick = (subject: PredefinedSubject) => {
    setSelectedSubject(subject.id);
    // Small delay for visual feedback
    setTimeout(() => {
      onSubjectSelect(subject);
    }, 150);
  };

  const downloadSample = async (filename: string, displayName: string) => {
    try {
      const response = await fetch(`/sample-question-sets/${filename}`);
      const data = await response.json();
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${displayName.toLowerCase().replace(/\s+/g, '-')}-questions.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download sample:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto p-6 pt-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="h-12 w-12 text-blue-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Knowledge Gap Diagnostic Tool
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover your knowledge gaps and get AI-powered personalized learning recommendations
          </p>
        </div>

        {/* Subject Selection */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-2">Choose Your Subject</h2>
          <p className="text-muted-foreground text-center mb-8">
            Select a predefined subject area or upload your own custom questions
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {predefinedSubjects.map((subject) => (
              <Card 
                key={subject.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] ${
                  selectedSubject === subject.id ? 'ring-2 ring-blue-500 shadow-lg' : ''
                }`}
                onClick={() => handleSubjectClick(subject)}
              >
                <CardHeader className="text-center pb-4">
                  <div className="text-4xl mb-3">{subject.icon}</div>
                  <CardTitle className="text-lg">{subject.title}</CardTitle>
                  <Badge variant="secondary" className="self-center">
                    {subject.subject}
                  </Badge>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-center text-sm leading-relaxed">
                    {subject.description}
                  </CardDescription>
                  <div className="mt-4 text-center">
                    <Button 
                      size="sm" 
                      className={`bg-gradient-to-r ${subject.color} hover:opacity-90 text-white`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSubjectClick(subject);
                      }}
                    >
                      Start Quiz
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Custom Upload Section */}
        <Card className="mb-8">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Upload className="h-6 w-6 text-blue-600" />
              <CardTitle className="text-xl">Custom Question Set</CardTitle>
            </div>
            <CardDescription>
              Upload your own questions in JSON format for any subject area
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button 
              onClick={onCustomUpload}
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6"
            >
              <Upload className="h-5 w-5 mr-2" />
              Upload Custom Questions
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              Perfect for instructors and custom training scenarios
            </p>
          </CardContent>
        </Card>

        {/* Downloadable Samples Section */}
        <Card className="mb-8">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Download className="h-6 w-6 text-green-600" />
              <CardTitle className="text-xl">Download Sample Question Sets</CardTitle>
            </div>
            <CardDescription>
              Get example question sets to use as templates for creating your own
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl mb-2">🔬</div>
                <h4 className="font-semibold mb-2">Quantum Computing</h4>
                <p className="text-sm text-muted-foreground mb-3">8 questions covering qubits, gates, and algorithms</p>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => downloadSample('quantum-computing.json', 'Quantum Computing')}
                  className="w-full"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </div>

              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl mb-2">📐</div>
                <h4 className="font-semibold mb-2">Category Theory</h4>
                <p className="text-sm text-muted-foreground mb-3">5 questions on categories, functors, and morphisms</p>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => downloadSample('category-theory.json', 'Category Theory')}
                  className="w-full"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </div>

              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl mb-2">🔗</div>
                <h4 className="font-semibold mb-2">Blockchain Technology</h4>
                <p className="text-sm text-muted-foreground mb-3">6 questions on distributed ledgers and crypto</p>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => downloadSample('blockchain.json', 'Blockchain Technology')}
                  className="w-full"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </div>

              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl mb-2">🔢</div>
                <h4 className="font-semibold mb-2">Basic Mathematics</h4>
                <p className="text-sm text-muted-foreground mb-3">3 questions on arithmetic, geometry, and calculus</p>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => downloadSample('basic-math.json', 'Basic Mathematics')}
                  className="w-full"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </div>

              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl mb-2">💻</div>
                <h4 className="font-semibold mb-2">Computer Science</h4>
                <p className="text-sm text-muted-foreground mb-3">3 questions on algorithms, data structures, and OOP</p>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => downloadSample('computer-science.json', 'Computer Science')}
                  className="w-full"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </div>

              <div className="text-center p-4 border rounded-lg bg-muted/30">
                <div className="text-2xl mb-2">📝</div>
                <h4 className="font-semibold mb-2">Create Your Own</h4>
                <p className="text-sm text-muted-foreground mb-3">Use these as templates for your subject area</p>
                <Button 
                  size="sm" 
                  variant="secondary"
                  onClick={onCustomUpload}
                  className="w-full"
                >
                  <Upload className="h-4 w-4 mr-1" />
                  Start Creating
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardHeader>
              <div className="text-3xl mb-2">🤖</div>
              <CardTitle className="text-lg">AI-Powered Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Advanced GPT-4 analysis provides personalized feedback and identifies specific knowledge gaps
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="text-3xl mb-2">🎯</div>
              <CardTitle className="text-lg">Targeted Learning</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Get specific recommendations and study resources based on your individual misconceptions
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="text-3xl mb-2">📊</div>
              <CardTitle className="text-lg">Progress Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Detailed analysis shows your strengths and areas for improvement with actionable next steps
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}