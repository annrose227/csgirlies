# Architecture

## System Overview

LearnVerse follows a modern full-stack architecture with a React frontend, Firebase backend, and AI-powered content generation.

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React)                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │  Pages   │  │Components│  │  Utils   │              │
│  └──────────┘  └──────────┘  └──────────┘              │
│       │             │             │                      │
│       └─────────────┼─────────────┘                      │
│                    │                                     │
└────────────────────┼─────────────────────────────────────┘
                     │
         ┌───────────┼───────────┐
         │           │           │
    ┌────▼────┐ ┌────▼────┐ ┌───▼────┐
    │Firebase │ │AI Client│ │Framer  │
    │(Auth +  │ │(OpenAI) │ │Motion  │
    │Firestore│ │         │ │        │
    └─────────┘ └─────────┘ └────────┘
```

## Component Architecture

### Pages
- **Home**: Landing page with feature overview
- **Worlds**: Grid of 6 learning worlds
- **StoryMode**: Lesson generation interface
- **QuizPage**: Interactive quiz with scoring
- **Profile**: User stats and rewards display

### Components
- **Navbar**: Navigation with active state indicators
- **WorldCard**: Clickable world entry cards
- **StoryGenerator**: AI lesson generation with mode selection
- **QuizCard**: Individual quiz question with feedback
- **AvatarRewards**: Reward collection display

### Utilities
- **aiClient.ts**: AI API interface (OpenAI/mock)
- **firebaseConfig.ts**: Firebase initialization
- **cn.ts**: Tailwind class name utility

## Firebase Setup

### Authentication
```typescript
import { getAuth } from 'firebase/auth';
export const auth = getAuth(app);
```

### Firestore Structure
```
users/
  {uid}/
    progress/
      {worldName}/
        totalScore: number
        totalCoins: number
        totalXP: number
        lastCompleted: timestamp
        quizzesCompleted: number
    rewards/
      {rewardId}/
        unlocked: boolean
        unlockedAt: timestamp
```

## AI Flow

### Lesson Generation
1. User selects topic and mode (story/comic/rap)
2. Frontend calls `aiClient.generateLesson(topic, mode)`
3. AI generates personalized lesson content
4. Returns lesson text + 3 comprehension questions

### Quiz Generation
1. User completes lesson
2. Frontend calls `aiClient.generateQuiz(lesson)`
3. AI extracts key concepts and generates MCQs
4. Returns array of quiz questions with answers

## Data Flow

```
User Action → Component → Utility → API/Firebase
                ↓
         State Update
                ↓
         UI Re-render
```

## Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS with custom pastel theme
- **UI Components**: Custom components (ShadCN-style)
- **Animations**: Framer Motion
- **Routing**: React Router v6
- **Backend**: Firebase (Auth + Firestore)
- **AI**: OpenAI API (mockable)

