import OpenAI from 'openai';

let openai: OpenAI | null = null;

function getOpenAI(): OpenAI {
  if (!openai) {
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('NEXT_PUBLIC_OPENAI_API_KEY is not set. Please add your OpenAI API key to your environment variables.');
    }
    openai = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true // Allow client-side usage
    });
  }
  return openai;
}

export interface DiagnosisPromptData {
  questions: Array<{
    question: string;
    selectedAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    category: string;
    difficulty: string;
  }>;
  score: number;
  totalQuestions: number;
}

export async function generateAIDiagnosis(data: DiagnosisPromptData): Promise<string> {
  const incorrectAnswers = data.questions.filter(q => !q.isCorrect);
  
  const prompt = `You are an expert quantum computing tutor analyzing a student's quiz performance. 

**Quiz Results:**
- Score: ${data.score}% (${data.totalQuestions - incorrectAnswers.length}/${data.totalQuestions} correct)
- Areas tested: ${[...new Set(data.questions.map(q => q.category))].join(', ')}

**Incorrect Answers Analysis:**
${incorrectAnswers.map((q, i) => `
${i + 1}. **Question:** ${q.question}
   **Student's Answer:** ${q.selectedAnswer}
   **Correct Answer:** ${q.correctAnswer}
   **Category:** ${q.category}
   **Difficulty:** ${q.difficulty}
`).join('')}

**All Questions for Context:**
${data.questions.map((q, i) => `
${i + 1}. ${q.question} (${q.category} - ${q.difficulty})
   Selected: ${q.selectedAnswer} ${q.isCorrect ? '✓' : '✗'}
`).join('')}

Please provide a comprehensive diagnosis as a flowing narrative that naturally weaves together:
- An encouraging assessment of their overall performance
- Identification of specific knowledge gaps revealed by their answers
- Clear explanations of why certain misconceptions occurred
- A logical learning path with prioritized next steps
- Actionable recommendations for improvement
- Motivational guidance for continued learning

Write this as a cohesive, conversational narrative - like a knowledgeable tutor having a one-on-one discussion with the student. Avoid bullet points, numbered lists, or rigid formatting. Instead, create smooth transitions between topics and maintain an encouraging, supportive tone throughout. The diagnosis should read like natural speech, guiding the student through their results with empathy and expertise.`;

  try {
    const client = getOpenAI();
    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a warm, knowledgeable quantum computing tutor having a personal conversation with a student about their quiz performance. Write in a natural, flowing narrative style - as if you\'re sitting across from them, discussing their results with empathy and expertise. Avoid formal structures, bullet points, or numbered lists. Instead, create a cohesive story about their learning journey, weaving together encouragement, insights, and guidance in a conversational tone.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 1000,
      temperature: 0.8
    });

    return completion.choices[0]?.message?.content || 'Unable to generate diagnosis at this time.';
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('Failed to generate AI diagnosis. Please check your API configuration.');
  }
}

export async function generateStudyPlan(knowledgeGaps: string[], score: number): Promise<string[]> {
  const prompt = `As a quantum computing tutor, create a prioritized study plan for a student who:
- Scored ${score}%
- Has these knowledge gaps: ${knowledgeGaps.join(', ')}

Provide 3-5 specific, actionable study steps in priority order. Each step should be concrete and achievable.
Return only the study steps as a JSON array of strings.

Example format: ["Step 1 description", "Step 2 description", "Step 3 description"]`;

  try {
    const client = getOpenAI();
    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a quantum computing tutor. Respond with only a JSON array of study steps, no additional text.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 300,
      temperature: 0.5
    });

    const response = completion.choices[0]?.message?.content?.trim() || '[]';
    return JSON.parse(response);
  } catch (error) {
    console.error('Study plan generation error:', error);
    return [
      'Review fundamental quantum mechanics concepts',
      'Practice with quantum circuit diagrams',
      'Study quantum measurement and superposition',
      'Explore quantum algorithms and applications'
    ];
  }
}