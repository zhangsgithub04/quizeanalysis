# Question Set Format Documentation

This document describes the JSON format required for uploading custom question sets to the Knowledge Gap Diagnostic Tool.

## File Structure

Your question set should be a JSON file with the following structure:

```json
{
  "title": "Your Quiz Title",
  "description": "Brief description of what this quiz covers",
  "subject": "Subject Area (e.g., Physics, Mathematics, Computer Science)",
  "questions": [
    // Array of question objects (see below)
  ],
  "knowledgeGaps": {
    // Object mapping gap IDs to gap definitions (see below)
  }
}
```

## Required Fields

### Root Level
- **title** (string): The name of your quiz
- **description** (string, optional): Description shown to students
- **subject** (string, optional): Subject area, defaults to "General Knowledge"
- **questions** (array): Array of question objects (minimum 1 question)
- **knowledgeGaps** (object, optional): Knowledge gap definitions

### Question Object
```json
{
  "id": "unique-question-id",
  "question": "Your question text here?",
  "category": "Topic Category",
  "difficulty": "beginner|intermediate|advanced",
  "options": [
    // Array of option objects (minimum 2, exactly 1 must be correct)
  ]
}
```

**Required fields:**
- **id** (string): Unique identifier for the question
- **question** (string): The question text
- **category** (string): Topical category for grouping
- **difficulty** (string): One of: "beginner", "intermediate", "advanced"
- **prereq** (string, optional): Prerequisites or background knowledge needed
- **options** (array): Array of 2-6 answer options

### Option Object
```json
{
  "id": "unique-option-id",
  "text": "Answer choice text",
  "isCorrect": true,
  "knowledgeGap": "gap-identifier",
  "concept": "Description of what this option tests"
}
```

**Required fields:**
- **id** (string): Unique identifier for the option
- **text** (string): The answer choice text
- **isCorrect** (boolean): true for correct answer, false for incorrect
- **knowledgeGap** (string): Knowledge gap ID (use "none" for correct answers)
- **concept** (string): Description of the misconception or concept being tested

### Knowledge Gap Object
```json
{
  "gap-identifier": {
    "concept": "Name of the Knowledge Gap",
    "description": "Detailed description of the misconception",
    "recommendation": "What the student should focus on",
    "resources": ["Resource 1", "Resource 2", "Resource 3"]
  }
}
```

**Required fields:**
- **concept** (string): Name of the knowledge gap
- **description** (string): What this gap represents
- **recommendation** (string): Study advice for addressing this gap
- **resources** (array): List of recommended learning resources

## Complete Example

```json
{
  "title": "Basic Physics Quiz",
  "description": "Test your understanding of fundamental physics concepts",
  "subject": "Physics",
  "questions": [
    {
      "id": "physics-1",
      "question": "What is the unit of force in the SI system?",
      "category": "Units and Measurements", 
      "difficulty": "beginner",
      "prereq": "Basic understanding of SI units and physical quantities",
      "options": [
        {
          "id": "physics-1a",
          "text": "Joule",
          "isCorrect": false,
          "knowledgeGap": "units-confusion",
          "concept": "Confusing energy and force units"
        },
        {
          "id": "physics-1b",
          "text": "Newton",
          "isCorrect": true,
          "knowledgeGap": "none",
          "concept": "Correct understanding of force units"
        },
        {
          "id": "physics-1c",
          "text": "Watt",
          "isCorrect": false,
          "knowledgeGap": "units-confusion",
          "concept": "Confusing power and force units"
        },
        {
          "id": "physics-1d",
          "text": "Pascal",
          "isCorrect": false,
          "knowledgeGap": "units-confusion",
          "concept": "Confusing pressure and force units"
        }
      ]
    }
  ],
  "knowledgeGaps": {
    "units-confusion": {
      "concept": "Units Confusion",
      "description": "Difficulty distinguishing between different physical quantities and their units",
      "recommendation": "Review the definitions of force, energy, power, and pressure. Practice unit conversions.",
      "resources": [
        "Physics textbook chapter on units",
        "Online unit conversion practice",
        "SI units reference chart"
      ]
    }
  }
}
```

## Validation Rules

1. **File Format**: Must be valid JSON
2. **Questions**: At least 1 question required
3. **Options**: Each question must have 2-6 options with exactly 1 correct answer
4. **IDs**: All question and option IDs must be unique within the file
5. **Knowledge Gaps**: Referenced gap IDs in options should exist in knowledgeGaps object
6. **Difficulty**: Must be one of: "beginner", "intermediate", "advanced"

## Best Practices

### Writing Good Questions
- Make questions clear and unambiguous
- Avoid trick questions or overly complex wording
- Test specific concepts rather than memorization
- Use realistic scenarios when possible

### Designing Answer Options
- Make incorrect options plausible but clearly wrong
- Each wrong option should test a specific misconception
- Avoid "all of the above" or "none of the above" options
- Keep option lengths roughly similar

### Knowledge Gap Design
- Focus on common misconceptions in your subject area
- Make gaps specific enough to provide targeted feedback
- Provide actionable recommendations
- Include diverse resource types (books, videos, practice, etc.)

### Categories and Difficulty
- Group related concepts into logical categories
- Use consistent category names throughout
- Set difficulty appropriately:
  - **Beginner**: Basic definitions and simple applications
  - **Intermediate**: Application of concepts with some complexity
  - **Advanced**: Complex scenarios requiring deep understanding

## Troubleshooting

### Common Upload Errors

**"Invalid question set format"**
- Check that your JSON has required fields: title, questions
- Ensure questions is an array with at least one question

**"Question X: Missing required fields"**
- Verify each question has: id, question, options, category, difficulty
- Check that options is an array

**"Question X: Must have exactly one correct option"**
- Ensure exactly one option has `"isCorrect": true`
- Check for typos in the isCorrect field

**"Invalid file format"**
- Verify your file is valid JSON (use a JSON validator)
- Check for missing commas, brackets, or quotes

### Testing Your Question Set
1. Start with a small set (2-3 questions) to test the format
2. Verify all knowledge gaps referenced in options exist
3. Test the quiz flow to ensure questions display correctly
4. Check that AI analysis provides meaningful feedback

## Technical Notes

- The system uses OpenAI GPT-4o-mini for intelligent analysis
- Knowledge gaps are used for both local analysis and AI prompts
- Categories and difficulty levels help organize feedback
- The system falls back gracefully if AI analysis fails