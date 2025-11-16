# Getting Started

## Prerequisites

- **Node.js**: v18 or higher
- **npm** or **yarn** package manager
- **Firebase Account**: For authentication and database (optional for demo)

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd learnverse
```

### 2. Install Dependencies

```bash
npm install
```

or

```bash
yarn install
```

### 3. Environment Variables

Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

**Note**: For demo purposes, the app will work with mock Firebase configuration if environment variables are not set.

### 4. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Development

### Project Structure

```
learnverse/
├── frontend/
│   └── src/
│       ├── components/     # Reusable UI components
│       ├── pages/          # Page components
│       ├── styles/         # Global styles
│       ├── utils/          # Utility functions
│       ├── App.tsx         # Main app component
│       └── main.tsx        # Entry point
├── docs/                   # Documentation
├── package.json
├── vite.config.ts
└── tailwind.config.js
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Firebase Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project"
3. Follow the setup wizard

### 2. Enable Authentication

1. Go to Authentication → Sign-in method
2. Enable Email/Password authentication

### 3. Create Firestore Database

1. Go to Firestore Database
2. Click "Create Database"
3. Start in test mode (for development)

### 4. Get Configuration

1. Go to Project Settings → General
2. Scroll to "Your apps"
3. Click Web icon (</>)
4. Copy the configuration object
5. Add to `.env` file

## Deployment

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow prompts

### Netlify

1. Install Netlify CLI: `npm i -g netlify-cli`
2. Run: `netlify deploy`
3. For production: `netlify deploy --prod`

### Firebase Hosting

1. Install Firebase CLI: `npm i -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Build: `npm run build`
5. Deploy: `firebase deploy`

## Troubleshooting

### Common Issues

**Port already in use**
```bash
# Kill process on port 5173
npx kill-port 5173
```

**Module not found errors**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Firebase connection errors**
- Check environment variables
- Verify Firebase project settings
- Ensure Firestore rules allow read/write

**Build errors**
```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run build
```

## Next Steps

1. **Customize Worlds**: Add more worlds in `Worlds.tsx`
2. **Connect Real AI**: Replace mock in `aiClient.ts` with OpenAI API
3. **Add Authentication**: Implement Firebase Auth in components
4. **Enhance Rewards**: Add more reward types and unlock conditions
5. **Leaderboard**: Create competitive features

