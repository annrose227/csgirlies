# Features

## 1. Learning Worlds

### Overview
Six distinct learning worlds, each representing a different subject area. Users can explore any world and begin their learning journey.

### Worlds Available
1. **Math Meadow** 🔢
   - Numbers, equations, mathematical concepts
   - Beautiful meadow aesthetic

2. **Science Galaxy** 🔬
   - Chemistry, physics, biology
   - Space-themed exploration

3. **History Haven** 🏛️
   - Ancient civilizations, historical events
   - Time-travel themed

4. **Language Lagoon** 📚
   - Grammar, vocabulary, communication
   - Underwater paradise theme

5. **Art Atelier** 🎨
   - Colors, techniques, artistic expression
   - Creative studio environment

6. **Code Castle** 💻
   - Programming, algorithms, logic
   - Digital fortress theme

### Implementation
- Grid layout with animated cards
- Click to enter world → Story Mode
- Visual distinction through colors and icons

## 2. Story Generator

### Modes
- **Story Mode**: Traditional narrative format
- **Comic Mode**: Visual storytelling approach
- **Rap Mode**: Rhythmic, musical learning

### Features
- AI-powered content generation
- Personalized based on topic
- Three comprehension questions included
- Beautiful card-based display

### User Flow
1. Select world → Story Mode page
2. Choose learning style (Story/Comic/Rap)
3. Click "Generate Lesson"
4. View personalized lesson
5. Review comprehension questions
6. Proceed to quiz

## 3. Quiz System

### Question Types
- Multiple Choice Questions (MCQs)
- Auto-generated from lesson content
- 5 questions per quiz

### Features
- **Real-time Feedback**: Immediate correct/incorrect indication
- **Progress Tracking**: Visual progress bar
- **Scoring System**:
  - +10 Coins per correct answer
  - +20 XP per correct answer
- **Animated Transitions**: Smooth question transitions

### Results
- Final score display
- Total coins earned
- Total XP gained
- Options to view profile or explore more

## 4. Avatar Rewards

### Reward Types
- **Stickers**: Decorative elements
- **Themes**: Color scheme unlocks
- **Badges**: Achievement markers

### Unlock System
- Rewards unlocked by completing quizzes
- Saved to Firebase user profile
- Displayed in Profile page

### Visual Design
- Grid layout with unlocked/locked states
- Animated unlock celebrations
- Sparkle effects on unlocked items

## 5. Aesthetic UI

### Design Elements
- **Pastel Color Scheme**: Soft, friendly colors
- **Rounded Corners**: `rounded-2xl` for cards
- **Glow Effects**: `shadow-lg shadow-pink-200/60`
- **Gradient Backgrounds**: Multi-color gradients
- **Sparkle Animations**: Floating sparkles throughout

### Animations
- **Framer Motion**: Smooth transitions
- **Hover Effects**: Scale and lift on hover
- **Loading States**: Spinning indicators
- **Success Celebrations**: Confetti-like effects

### Components
- Consistent card styling
- Gradient buttons
- Icon integration (Lucide React)
- Responsive layouts

## 6. Progress Tracking

### Firebase Integration
- User progress stored in Firestore
- Per-world statistics
- Cumulative totals (XP, Coins, Quizzes)

### Profile Display
- Total XP
- Total Coins
- Quizzes Completed
- Worlds Explored
- Reward Collection

## 7. Navigation

### Navbar Features
- Fixed top navigation
- Active route highlighting
- Icon + text labels
- Smooth transitions

### Routes
- `/` - Home
- `/worlds` - World selection
- `/story-mode?world=...` - Lesson generation
- `/quiz?world=...&lesson=...` - Quiz interface
- `/profile` - User profile

