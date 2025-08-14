# Knowledge Gap Diagnostic Tool

A universal React application that diagnoses knowledge gaps across any subject area using annotated multiple-choice questions and AI-powered personalized feedback. Includes sample question sets for Quantum Computing, Category Theory, and Blockchain Technology.

## Features

- **Multi-Subject Platform**: Built-in support for Quantum Computing, Category Theory, and Blockchain Technology
- **Universal Framework**: Designed for any subject area - instructors can create questions for their specific needs  
- **Subject Selection**: Choose from predefined subjects or upload custom question sets
- **AI-Powered Analysis**: Uses OpenAI GPT-4 to provide personalized diagnosis and feedback
- **Annotated Options**: Each answer option is annotated with the specific concept it tests
- **Knowledge Gap Analysis**: Identifies specific misconceptions and knowledge gaps based on incorrect answers
- **Personalized Feedback**: Provides targeted recommendations and study resources powered by AI
- **Priority-Based Learning Path**: Suggests study order based on concept hierarchy and frequency of gaps
- **Modern UI**: Built with Next.js 15, TypeScript, and shadcn/ui components

## How It Works

1. **Select Subject**: Choose from Quantum Computing, Category Theory, Blockchain, or upload custom questions
2. **Answer Questions**: Each option in the MCQ tests specific subject concepts and misconceptions
3. **AI Analysis**: The system analyzes responses to identify knowledge gaps and misconceptions
4. **Targeted Feedback**: Get personalized recommendations based on your specific weaknesses
5. **Study Plan**: Receive a prioritized learning path to maximize efficiency

## Built-in Subject Areas

### 🔬 Quantum Computing
- Basic Concepts (qubits, classical vs quantum information)
- Quantum Properties (superposition, entanglement, interference)
- Quantum Measurement (measurement effects, state collapse)
- Quantum Gates (single-qubit and multi-qubit operations)
- Quantum Algorithms (Shor's, Grover's, and others)
- Quantum Errors (decoherence, environmental effects)

### 📐 Category Theory
- Basic Definitions (categories, objects, morphisms)
- Morphisms and Composition (composition rules, associativity)
- Functors (structure-preserving mappings between categories)
- Examples of Categories (Set, Group, topology categories)
- Natural Transformations (functor transformations, naturality condition)

### 🔗 Blockchain & Cryptocurrency
- Basic Concepts (distributed ledgers, decentralization)
- Mining and Consensus (proof-of-work, transaction validation)
- Smart Contracts (self-executing code, Ethereum)
- Cryptographic Security (hash functions, double-spending problem)
- Blockchain Types (public vs private, permissioned networks)

## Custom Question Sets

The system supports uploading custom question sets in JSON format for any subject area. See [Question Format Documentation](docs/question-format.md) for detailed instructions.

## Knowledge Gap Categories

The system can identify 50+ specific knowledge gaps across different subjects including:

**Quantum Computing**: Classical vs quantum confusion, superposition vs entanglement misconceptions, measurement effects, gate operations, algorithm applications

**Category Theory**: Category vs algebraic structure confusion, functor vs morphism distinction, naturality conditions, categorical levels

**Blockchain**: Blockchain vs cryptocurrency distinction, centralized vs decentralized systems, mining vs consensus, smart contracts vs legal contracts

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
The repository includes sample question sets for various subjects:
- **Built-in**: Quantum Computing (default), Category Theory, Blockchain Technology  
- **Additional samples**: `basic-math.json`, `computer-science.json`
- **Custom**: Upload your own JSON files for any subject

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
├── public/sample-question-sets/
│   ├── category-theory.json      # Category theory questions
│   ├── blockchain.json           # Blockchain & crypto questions
│   ├── basic-math.json           # Sample mathematics question set
│   └── computer-science.json     # Sample CS question set
├── sample-question-sets/
│   └── (same files as above)     # Development copies
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
