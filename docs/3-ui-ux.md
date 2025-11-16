# UI/UX Design

## Color Palette

### Primary Colors
- **Pink**: `#FFD6E8` (Pastel Pink)
- **Purple**: `#E8D5FF` (Pastel Purple)
- **Blue**: `#D5E8FF` (Pastel Blue)
- **Yellow**: `#FFF4D5` (Pastel Yellow)
- **Mint**: `#D5FFE8` (Pastel Mint)

### Gradient Combinations
- **Primary Gradient**: `from-pink-400 to-purple-400`
- **Background**: `from-pink-100 via-purple-100 to-blue-100`
- **Accent Gradients**: Various combinations for different worlds

### Semantic Colors
- **Success**: Green (`#10B981`)
- **Error**: Red (`#EF4444`)
- **Warning**: Yellow (`#F59E0B`)
- **Info**: Blue (`#3B82F6`)

## Typography

### Font Family
- **Primary**: Comic Sans MS, Comic Sans, cursive, system-ui
- **Fallback**: System fonts for better performance

### Font Sizes
- **Hero**: `text-5xl md:text-6xl` (48-60px)
- **Headings**: `text-2xl md:text-3xl` (24-30px)
- **Body**: `text-base` (16px)
- **Small**: `text-sm` (14px)

### Font Weights
- **Bold**: `font-bold` (700) for headings
- **Medium**: `font-medium` (500) for emphasis
- **Regular**: `font-normal` (400) for body text

## Component Styles

### Cards
```css
.pastel-card {
  rounded-2xl
  bg-white/80
  backdrop-blur-sm
  border border-pink-200/50
  shadow-lg shadow-pink-200/60
}
```

### Buttons
- **Primary**: Gradient background with hover scale
- **Secondary**: White background with colored border
- **Hover Effects**: Scale 1.05, shadow enhancement

### Animations
- **Fade In**: `opacity: 0 → 1`
- **Slide Up**: `y: 50 → 0`
- **Scale**: `scale: 0.9 → 1`
- **Hover**: `scale: 1.05`

## Wireframes

### Home Page
```
┌─────────────────────────────────────┐
│           Navbar                    │
├─────────────────────────────────────┤
│                                     │
│      [Sparkle Icon]                 │
│      Welcome to LearnVerse          │
│      Subtitle text                  │
│      [Start Your Journey Button]    │
│                                     │
│  ┌──────┐ ┌──────┐ ┌──────┐        │
│  │Story │ │  AI  │ │Game  │        │
│  │Based │ │Power │ │Reward│        │
│  └──────┘ └──────┘ └──────┘        │
│                                     │
└─────────────────────────────────────┘
```

### Worlds Page
```
┌─────────────────────────────────────┐
│           Navbar                    │
├─────────────────────────────────────┤
│   Choose Your Learning World        │
│                                     │
│  ┌──────┐ ┌──────┐ ┌──────┐        │
│  │Math  │ │Science│ │History│       │
│  │Meadow│ │Galaxy │ │Haven │        │
│  └──────┘ └──────┘ └──────┘        │
│                                     │
│  ┌──────┐ ┌──────┐ ┌──────┐        │
│  │Lang  │ │ Art  │ │ Code │        │
│  │Lagoon│ │Atelier│ │Castle│        │
│  └──────┘ └──────┘ └──────┘        │
└─────────────────────────────────────┘
```

### Story Mode
```
┌─────────────────────────────────────┐
│           Navbar                    │
├─────────────────────────────────────┤
│   [Back]  World Name                │
│                                     │
│   Choose Your Learning Style        │
│   [Story] [Comic] [Rap]             │
│   [Generate Lesson Button]          │
│                                     │
│   ┌─────────────────────────────┐   │
│   │ Generated Lesson Content    │   │
│   │ ...                         │   │
│   │                             │   │
│   │ Comprehension Questions:    │   │
│   │ 1. ...                      │   │
│   │ 2. ...                      │   │
│   │ 3. ...                      │   │
│   └─────────────────────────────┘   │
│                                     │
│   [Take Quiz & Earn Rewards]        │
└─────────────────────────────────────┘
```

## User Experience Principles

1. **Delightful Interactions**: Every click feels rewarding
2. **Clear Feedback**: Immediate visual response to actions
3. **Progressive Disclosure**: Information revealed as needed
4. **Consistent Patterns**: Similar actions behave similarly
5. **Accessible Design**: High contrast, readable fonts, clear labels

## Responsive Design

- **Mobile First**: Designed for 320px+ screens
- **Breakpoints**: 
  - `sm`: 640px
  - `md`: 768px
  - `lg`: 1024px
  - `xl`: 1280px
- **Grid Layouts**: Responsive columns (1 → 2 → 3)
- **Touch Targets**: Minimum 44x44px for mobile

