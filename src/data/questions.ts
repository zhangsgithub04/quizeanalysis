import { MCQQuestion, KnowledgeGap } from '@/types/mcq';

export const quantumQuestions: MCQQuestion[] = [
  {
    id: '1',
    question: 'What is the fundamental unit of quantum information?',
    category: 'Basic Concepts',
    difficulty: 'beginner',
    options: [
      {
        id: '1a',
        text: 'Bit',
        isCorrect: false,
        knowledgeGap: 'classical-vs-quantum',
        concept: 'Confusing classical and quantum information units'
      },
      {
        id: '1b',
        text: 'Qubit',
        isCorrect: true,
        knowledgeGap: 'none',
        concept: 'Understanding quantum information basics'
      },
      {
        id: '1c',
        text: 'Quantum gate',
        isCorrect: false,
        knowledgeGap: 'information-vs-operations',
        concept: 'Confusing information storage with operations'
      },
      {
        id: '1d',
        text: 'Quantum circuit',
        isCorrect: false,
        knowledgeGap: 'components-vs-units',
        concept: 'Confusing system components with fundamental units'
      }
    ]
  },
  {
    id: '2',
    question: 'Which property allows a qubit to exist in multiple states simultaneously?',
    category: 'Quantum Properties',
    difficulty: 'beginner',
    options: [
      {
        id: '2a',
        text: 'Entanglement',
        isCorrect: false,
        knowledgeGap: 'superposition-vs-entanglement',
        concept: 'Confusing single-qubit and multi-qubit phenomena'
      },
      {
        id: '2b',
        text: 'Superposition',
        isCorrect: true,
        knowledgeGap: 'none',
        concept: 'Understanding quantum superposition'
      },
      {
        id: '2c',
        text: 'Interference',
        isCorrect: false,
        knowledgeGap: 'superposition-vs-interference',
        concept: 'Confusing state existence with wave properties'
      },
      {
        id: '2d',
        text: 'Decoherence',
        isCorrect: false,
        knowledgeGap: 'constructive-vs-destructive',
        concept: 'Confusing quantum properties with noise effects'
      }
    ]
  },
  {
    id: '3',
    question: 'What happens when you measure a qubit in superposition?',
    category: 'Measurement',
    difficulty: 'intermediate',
    options: [
      {
        id: '3a',
        text: 'It remains in superposition',
        isCorrect: false,
        knowledgeGap: 'measurement-collapse',
        concept: 'Misunderstanding measurement effects'
      },
      {
        id: '3b',
        text: 'It collapses to a definite state',
        isCorrect: true,
        knowledgeGap: 'none',
        concept: 'Understanding quantum measurement'
      },
      {
        id: '3c',
        text: 'It becomes entangled',
        isCorrect: false,
        knowledgeGap: 'measurement-vs-entanglement',
        concept: 'Confusing measurement with entanglement creation'
      },
      {
        id: '3d',
        text: 'Nothing happens',
        isCorrect: false,
        knowledgeGap: 'measurement-effects',
        concept: 'Not understanding measurement consequences'
      }
    ]
  },
  {
    id: '4',
    question: 'Which gate is equivalent to a classical NOT gate in quantum computing?',
    category: 'Quantum Gates',
    difficulty: 'beginner',
    options: [
      {
        id: '4a',
        text: 'Hadamard gate',
        isCorrect: false,
        knowledgeGap: 'gate-functions',
        concept: 'Confusing different gate operations'
      },
      {
        id: '4b',
        text: 'Pauli-X gate',
        isCorrect: true,
        knowledgeGap: 'none',
        concept: 'Understanding basic quantum gates'
      },
      {
        id: '4c',
        text: 'CNOT gate',
        isCorrect: false,
        knowledgeGap: 'single-vs-multi-qubit',
        concept: 'Confusing single and multi-qubit gates'
      },
      {
        id: '4d',
        text: 'Phase gate',
        isCorrect: false,
        knowledgeGap: 'bit-flip-vs-phase',
        concept: 'Confusing bit-flip with phase operations'
      }
    ]
  },
  {
    id: '5',
    question: 'What is quantum entanglement?',
    category: 'Quantum Properties',
    difficulty: 'intermediate',
    options: [
      {
        id: '5a',
        text: 'When qubits are physically connected',
        isCorrect: false,
        knowledgeGap: 'physical-vs-quantum-correlation',
        concept: 'Misunderstanding quantum correlation as physical connection'
      },
      {
        id: '5b',
        text: 'When qubits share correlated quantum states',
        isCorrect: true,
        knowledgeGap: 'none',
        concept: 'Understanding quantum entanglement'
      },
      {
        id: '5c',
        text: 'When qubits are in superposition',
        isCorrect: false,
        knowledgeGap: 'entanglement-vs-superposition',
        concept: 'Confusing entanglement with superposition'
      },
      {
        id: '5d',
        text: 'When qubits interfere with each other',
        isCorrect: false,
        knowledgeGap: 'entanglement-vs-interference',
        concept: 'Confusing entanglement with interference'
      }
    ]
  },
  {
    id: '6',
    question: 'Which algorithm demonstrates quantum advantage for factoring large numbers?',
    category: 'Quantum Algorithms',
    difficulty: 'intermediate',
    options: [
      {
        id: '6a',
        text: 'Grover\'s algorithm',
        isCorrect: false,
        knowledgeGap: 'algorithm-applications',
        concept: 'Confusing search and factoring algorithms'
      },
      {
        id: '6b',
        text: 'Shor\'s algorithm',
        isCorrect: true,
        knowledgeGap: 'none',
        concept: 'Understanding quantum algorithm applications'
      },
      {
        id: '6c',
        text: 'Deutsch-Jozsa algorithm',
        isCorrect: false,
        knowledgeGap: 'theoretical-vs-practical',
        concept: 'Confusing theoretical demonstrations with practical applications'
      },
      {
        id: '6d',
        text: 'Simon\'s algorithm',
        isCorrect: false,
        knowledgeGap: 'algorithm-specificity',
        concept: 'Not understanding specific algorithm purposes'
      }
    ]
  },
  {
    id: '7',
    question: 'What causes decoherence in quantum systems?',
    category: 'Quantum Errors',
    difficulty: 'advanced',
    options: [
      {
        id: '7a',
        text: 'Interaction with the environment',
        isCorrect: true,
        knowledgeGap: 'none',
        concept: 'Understanding quantum decoherence'
      },
      {
        id: '7b',
        text: 'Too many quantum gates',
        isCorrect: false,
        knowledgeGap: 'decoherence-sources',
        concept: 'Misunderstanding decoherence causes'
      },
      {
        id: '7c',
        text: 'Quantum entanglement',
        isCorrect: false,
        knowledgeGap: 'decoherence-vs-entanglement',
        concept: 'Confusing beneficial and harmful quantum effects'
      },
      {
        id: '7d',
        text: 'Measurement operations',
        isCorrect: false,
        knowledgeGap: 'decoherence-vs-measurement',
        concept: 'Confusing intentional and unintentional state changes'
      }
    ]
  },
  {
    id: '8',
    question: 'What is the primary advantage of Grover\'s algorithm?',
    category: 'Quantum Algorithms',
    difficulty: 'intermediate',
    options: [
      {
        id: '8a',
        text: 'Factoring large numbers efficiently',
        isCorrect: false,
        knowledgeGap: 'algorithm-confusion',
        concept: 'Confusing Grover\'s and Shor\'s algorithms'
      },
      {
        id: '8b',
        text: 'Searching unsorted databases quadratically faster',
        isCorrect: true,
        knowledgeGap: 'none',
        concept: 'Understanding quantum search algorithms'
      },
      {
        id: '8c',
        text: 'Creating quantum entanglement',
        isCorrect: false,
        knowledgeGap: 'algorithm-vs-phenomenon',
        concept: 'Confusing algorithms with quantum phenomena'
      },
      {
        id: '8d',
        text: 'Error correction in quantum circuits',
        isCorrect: false,
        knowledgeGap: 'algorithm-applications',
        concept: 'Misunderstanding algorithm purposes'
      }
    ]
  }
];

export const knowledgeGapDefinitions: Record<string, KnowledgeGap> = {
  'classical-vs-quantum': {
    concept: 'Classical vs Quantum Information',
    description: 'Difficulty distinguishing between classical bits and quantum qubits',
    recommendation: 'Study the fundamental differences between classical and quantum information processing',
    resources: [
      'Review quantum information theory basics',
      'Practice with qubit vs bit comparisons',
      'Explore quantum superposition concepts'
    ]
  },
  'information-vs-operations': {
    concept: 'Information Storage vs Operations',
    description: 'Confusing information units with computational operations',
    recommendation: 'Learn to distinguish between data storage units and processing operations',
    resources: [
      'Study quantum circuit components',
      'Learn about qubits vs quantum gates',
      'Practice identifying system elements'
    ]
  },
  'components-vs-units': {
    concept: 'System Components vs Fundamental Units',
    description: 'Mixing up basic units with larger system components',
    recommendation: 'Understand the hierarchy of quantum computing elements',
    resources: [
      'Review quantum computing architecture',
      'Study the relationship between qubits, gates, and circuits',
      'Learn quantum system organization'
    ]
  },
  'superposition-vs-entanglement': {
    concept: 'Superposition vs Entanglement',
    description: 'Confusing single-qubit superposition with multi-qubit entanglement',
    recommendation: 'Study the distinct properties of superposition and entanglement',
    resources: [
      'Learn about single-qubit states',
      'Understand multi-qubit correlations',
      'Practice distinguishing quantum phenomena'
    ]
  },
  'superposition-vs-interference': {
    concept: 'Superposition vs Interference',
    description: 'Confusing quantum state existence with wave interference effects',
    recommendation: 'Understand superposition as a state property vs interference as a dynamic effect',
    resources: [
      'Study quantum state representation',
      'Learn about quantum interference patterns',
      'Explore wave-particle duality in quantum systems'
    ]
  },
  'constructive-vs-destructive': {
    concept: 'Quantum Properties vs Noise Effects',
    description: 'Mixing up beneficial quantum properties with detrimental effects',
    recommendation: 'Learn to distinguish useful quantum effects from error sources',
    resources: [
      'Study quantum coherence and decoherence',
      'Learn about quantum error sources',
      'Understand quantum system protection'
    ]
  },
  'measurement-collapse': {
    concept: 'Quantum Measurement Effects',
    description: 'Not understanding how measurement affects quantum states',
    recommendation: 'Study the quantum measurement postulate and state collapse',
    resources: [
      'Learn quantum measurement theory',
      'Understand wave function collapse',
      'Practice with measurement probability calculations'
    ]
  },
  'measurement-vs-entanglement': {
    concept: 'Measurement vs Entanglement Creation',
    description: 'Confusing measurement operations with entanglement generation',
    recommendation: 'Distinguish between measurement and entanglement processes',
    resources: [
      'Study quantum measurement protocols',
      'Learn entanglement creation methods',
      'Understand different quantum operations'
    ]
  },
  'measurement-effects': {
    concept: 'Measurement Consequences',
    description: 'Not understanding the irreversible nature of quantum measurement',
    recommendation: 'Learn about the fundamental role of measurement in quantum mechanics',
    resources: [
      'Study quantum measurement postulates',
      'Understand observer effects in quantum systems',
      'Learn about quantum non-demolition measurements'
    ]
  },
  'gate-functions': {
    concept: 'Quantum Gate Operations',
    description: 'Confusion about different quantum gate functions',
    recommendation: 'Study the specific operations performed by different quantum gates',
    resources: [
      'Learn quantum gate library',
      'Practice with gate matrix representations',
      'Understand gate effects on qubit states'
    ]
  },
  'single-vs-multi-qubit': {
    concept: 'Single vs Multi-Qubit Gates',
    description: 'Confusing single-qubit and multi-qubit gate operations',
    recommendation: 'Learn to distinguish between different types of quantum gates',
    resources: [
      'Study single-qubit gate operations',
      'Learn two-qubit and multi-qubit gates',
      'Practice gate classification'
    ]
  },
  'bit-flip-vs-phase': {
    concept: 'Bit-Flip vs Phase Operations',
    description: 'Not understanding the difference between amplitude and phase manipulations',
    recommendation: 'Study how quantum gates affect different aspects of qubit states',
    resources: [
      'Learn about Pauli gates (X, Y, Z)',
      'Understand amplitude vs phase rotations',
      'Study Bloch sphere representations'
    ]
  },
  'physical-vs-quantum-correlation': {
    concept: 'Physical vs Quantum Correlations',
    description: 'Thinking quantum correlations require physical connections',
    recommendation: 'Understand that quantum correlations transcend physical proximity',
    resources: [
      'Study Bell\'s theorem and non-locality',
      'Learn about quantum correlation experiments',
      'Understand spooky action at a distance'
    ]
  },
  'entanglement-vs-superposition': {
    concept: 'Entanglement vs Superposition',
    description: 'Confusing multi-qubit correlations with single-qubit superposition',
    recommendation: 'Learn the distinct characteristics of entanglement and superposition',
    resources: [
      'Study entangled state properties',
      'Learn superposition state characteristics',
      'Practice identifying quantum phenomena'
    ]
  },
  'entanglement-vs-interference': {
    concept: 'Entanglement vs Interference',
    description: 'Mixing up quantum correlations with interference effects',
    recommendation: 'Understand entanglement as correlation vs interference as wave effects',
    resources: [
      'Study entanglement properties',
      'Learn about quantum interference',
      'Understand different quantum phenomena'
    ]
  },
  'algorithm-applications': {
    concept: 'Quantum Algorithm Applications',
    description: 'Confusion about what problems different quantum algorithms solve',
    recommendation: 'Study the specific applications and advantages of each quantum algorithm',
    resources: [
      'Learn Shor\'s algorithm for factoring',
      'Study Grover\'s algorithm for search',
      'Understand algorithm complexity advantages'
    ]
  },
  'theoretical-vs-practical': {
    concept: 'Theoretical vs Practical Algorithms',
    description: 'Confusing theoretical demonstrations with practical applications',
    recommendation: 'Distinguish between proof-of-concept and practically useful algorithms',
    resources: [
      'Study algorithm complexity analysis',
      'Learn about practical quantum advantages',
      'Understand current quantum computing limitations'
    ]
  },
  'algorithm-specificity': {
    concept: 'Algorithm-Specific Purposes',
    description: 'Not understanding the specific problems each algorithm addresses',
    recommendation: 'Study the targeted applications of different quantum algorithms',
    resources: [
      'Learn algorithm classification',
      'Study problem-algorithm matching',
      'Understand quantum computational complexity'
    ]
  },
  'decoherence-sources': {
    concept: 'Decoherence Sources',
    description: 'Misunderstanding what causes quantum decoherence',
    recommendation: 'Study environmental factors that lead to quantum decoherence',
    resources: [
      'Learn about quantum-environment interactions',
      'Study decoherence mechanisms',
      'Understand quantum error sources'
    ]
  },
  'decoherence-vs-entanglement': {
    concept: 'Decoherence vs Entanglement',
    description: 'Confusing harmful decoherence with beneficial entanglement',
    recommendation: 'Distinguish between wanted and unwanted quantum effects',
    resources: [
      'Study beneficial quantum phenomena',
      'Learn about quantum noise and errors',
      'Understand quantum system protection'
    ]
  },
  'decoherence-vs-measurement': {
    concept: 'Decoherence vs Measurement',
    description: 'Confusing uncontrolled decoherence with intentional measurement',
    recommendation: 'Understand the difference between controlled and uncontrolled state changes',
    resources: [
      'Study quantum measurement theory',
      'Learn about environmental decoherence',
      'Understand quantum control techniques'
    ]
  },
  'algorithm-confusion': {
    concept: 'Algorithm Confusion',
    description: 'Mixing up different quantum algorithms and their purposes',
    recommendation: 'Study each algorithm\'s specific advantages and applications',
    resources: [
      'Create algorithm comparison charts',
      'Practice algorithm identification',
      'Study quantum algorithm taxonomy'
    ]
  },
  'algorithm-vs-phenomenon': {
    concept: 'Algorithms vs Quantum Phenomena',
    description: 'Confusing computational procedures with quantum physical effects',
    recommendation: 'Distinguish between algorithms that use quantum effects and the effects themselves',
    resources: [
      'Study quantum algorithm implementations',
      'Learn about quantum phenomena utilization',
      'Understand computation vs physics'
    ]
  }
};