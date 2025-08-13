# Quantum Computing Knowledge Gap Diagnostic Tool

A React application that presents annotated multiple-choice questions on quantum computing to diagnose specific knowledge gaps and provide targeted learning recommendations.

## Features

- **Customizable Question Sets**: Upload your own JSON question files or use the default quantum computing quiz
- **Multi-Subject Support**: Designed for any subject area - instructors can create questions for their specific needs
- **AI-Powered Analysis**: Uses OpenAI GPT-4 to provide personalized diagnosis and feedback
- **Annotated Options**: Each answer option is annotated with the specific concept it tests
- **Knowledge Gap Analysis**: Identifies specific misconceptions and knowledge gaps based on incorrect answers
- **Personalized Feedback**: Provides targeted recommendations and study resources powered by AI
- **Priority-Based Learning Path**: Suggests study order based on concept hierarchy and frequency of gaps
- **Modern UI**: Built with Next.js 15, TypeScript, and shadcn/ui components

## How It Works

1. **Choose or Upload Questions**: Use the default quantum computing quiz or upload your own custom question set
2. **Answer Questions**: Each option in the MCQ tests specific subject concepts and misconceptions
3. **AI Analysis**: The system analyzes responses to identify knowledge gaps and misconceptions
4. **Targeted Feedback**: Get personalized recommendations based on your specific weaknesses
5. **Study Plan**: Receive a prioritized learning path to maximize efficiency

## Default Topics Covered (Quantum Computing)

- Basic Concepts (qubits, classical vs quantum information)
- Quantum Properties (superposition, entanglement, interference)
- Quantum Measurement (measurement effects, state collapse)
- Quantum Gates (single-qubit and multi-qubit operations)
- Quantum Algorithms (Shor's, Grover's, and others)
- Quantum Errors (decoherence, environmental effects)

## Custom Question Sets

The system supports uploading custom question sets in JSON format for any subject area. See [Question Format Documentation](docs/question-format.md) for detailed instructions.

## Knowledge Gap Categories

The system can identify 20+ specific knowledge gaps including:
- Classical vs Quantum Information confusion
- Superposition vs Entanglement misconceptions
- Measurement effect misunderstandings
- Gate operation confusion
- Algorithm application errors
- Decoherence source confusion

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   
   Add your OpenAI API key to `.env.local`:
   ```
   NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
   ```
   
   Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Creating Custom Question Sets

### Quick Start
1. Click "Upload Custom Questions" on the home page
2. Download the provided template
3. Modify the template with your questions
4. Upload your JSON file

### Sample Question Sets
The repository includes sample question sets in `sample-question-sets/`:
- `basic-math.json` - Mathematics fundamentals
- `computer-science.json` - CS concepts

### Detailed Documentation
See [docs/question-format.md](docs/question-format.md) for complete formatting instructions.

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **AI Integration**: OpenAI GPT-4o-mini for intelligent analysis
- **UI Components**: shadcn/ui (based on Radix UI)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## Project Structure

```
src/
├── app/
│   └── page.tsx              # Main app component with state management
├── components/
│   ├── MCQComponent.tsx           # Quiz interface component
│   ├── ResultsComponent.tsx       # Results and feedback display
│   ├── QuestionUploadComponent.tsx # Question file upload interface
│   └── ui/                        # shadcn/ui components
├── data/
│   └── questions.ts               # Default quantum computing questions
├── docs/
│   └── question-format.md         # Question format documentation
├── lib/
│   └── openai.ts                  # OpenAI API integration and utilities
├── sample-question-sets/
│   ├── basic-math.json           # Sample mathematics question set
│   └── computer-science.json     # Sample CS question set
├── types/
│   └── mcq.ts                    # TypeScript type definitions
└── utils/
    └── analysis.ts               # Knowledge gap analysis logic (AI + local fallback)
```

## Key Features Explained

### Annotated MCQs
Each answer option includes:
- `isCorrect`: Whether the option is correct
- `knowledgeGap`: The specific gap revealed by choosing this option
- `concept`: Description of the misconception being tested

### Knowledge Gap Analysis
- Identifies patterns in incorrect answers
- Maps misconceptions to specific learning concepts
- Prioritizes gaps based on frequency and concept hierarchy
- Provides targeted recommendations and resources

### Adaptive Feedback
- Personalized based on performance level (90%+, 70%+, 50%+, <50%)
- Identifies most critical gaps to address first
- Suggests appropriate next steps based on current understanding

## License

MIT License

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
