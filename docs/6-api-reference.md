# API Reference

## AI Client

The `aiClient` utility provides methods for generating educational content.

### `generateLesson(topic, mode)`

Generates a personalized lesson based on topic and learning mode.

#### Parameters
- `topic` (string): The subject or topic to learn about
- `mode` ("story" | "comic" | "rap"): The learning style preference

#### Returns
```typescript
Promise<LessonResult>
```

#### LessonResult Interface
```typescript
interface LessonResult {
  lesson: string;        // The generated lesson content
  questions: string[];   // Array of 3 comprehension questions
}
```

#### Example
```typescript
import { aiClient } from '@/utils/aiClient';

const result = await aiClient.generateLesson("Algebra", "story");
console.log(result.lesson);
console.log(result.questions);
```

#### Implementation Notes
- Currently uses mock implementation with simulated delay
- Can be replaced with OpenAI API call:
  ```typescript
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [{
        role: 'user',
        content: `Generate a ${mode} lesson about ${topic}...`
      }]
    })
  });
  ```

---

### `generateQuiz(lesson)`

Generates quiz questions based on lesson content.

#### Parameters
- `lesson` (string): The lesson text to generate questions from

#### Returns
```typescript
Promise<QuizQuestion[]>
```

#### QuizQuestion Interface
```typescript
interface QuizQuestion {
  q: string;           // The question text
  options: string[];   // Array of 4 answer options
  answer: number;      // Index of correct answer (0-3)
}
```

#### Example
```typescript
import { aiClient } from '@/utils/aiClient';

const questions = await aiClient.generateQuiz(lessonText);
questions.forEach((q, index) => {
  console.log(`Q${index + 1}: ${q.q}`);
  console.log(`Answer: ${q.options[q.answer]}`);
});
```

#### Implementation Notes
- Extracts key concepts from lesson
- Generates 5 multiple-choice questions
- Returns questions with shuffled options (in real implementation)

---

## Firebase API

### Firestore Collections

#### Users Collection
```
users/{uid}/
```

#### Progress Subcollection
```
users/{uid}/progress/{worldName}/
```

**Document Structure:**
```typescript
{
  world: string;
  totalScore: number;
  totalCoins: number;
  totalXP: number;
  lastCompleted: string;  // ISO timestamp
  quizzesCompleted: number;
}
```

#### Rewards Subcollection
```
users/{uid}/rewards/{rewardId}/
```

**Document Structure:**
```typescript
{
  id: string;
  name: string;
  type: 'sticker' | 'theme' | 'badge';
  unlocked: boolean;
  unlockedAt: string;  // ISO timestamp
}
```

### Example Usage

```typescript
import { db } from '@/utils/firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';

// Save progress
const progressRef = doc(db, 'users', userId, 'progress', worldName);
await setDoc(progressRef, {
  world: worldName,
  totalScore: score,
  totalCoins: coins,
  totalXP: xp,
  lastCompleted: new Date().toISOString(),
  quizzesCompleted: 1
});

// Get progress
const progressDoc = await getDoc(progressRef);
if (progressDoc.exists()) {
  const data = progressDoc.data();
  console.log(data.totalXP);
}
```

---

## Component Props

### WorldCard
```typescript
interface WorldCardProps {
  title: string;
  description: string;
  color: string;
  icon: string;
  index: number;
}
```

### StoryGenerator
```typescript
interface StoryGeneratorProps {
  topic: string;
  onLessonGenerated: (lesson: LessonResult) => void;
}
```

### QuizCard
```typescript
interface QuizCardProps {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (isCorrect: boolean) => void;
}
```

### AvatarRewards
```typescript
interface AvatarRewardsProps {
  rewards: Reward[];
}

interface Reward {
  id: string;
  name: string;
  type: 'sticker' | 'theme' | 'badge';
  icon: string;
  unlocked: boolean;
}
```

---

## Utility Functions

### `cn(...inputs)`

Merges Tailwind CSS class names with conflict resolution.

```typescript
import { cn } from '@/utils/cn';

const className = cn(
  'base-class',
  condition && 'conditional-class',
  'another-class'
);
```

