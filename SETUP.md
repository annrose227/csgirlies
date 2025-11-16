# Quick Setup Guide

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. (Optional) Configure Firebase
Create a `.env` file in the root directory with your Firebase credentials:
```env
VITE_FIREBASE_API_KEY=your-key
VITE_FIREBASE_AUTH_DOMAIN=your-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

**Note**: The app works without Firebase for demo purposes (uses mock data).

### 3. Run the App
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser!

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run lint` - Run linter

## 🎨 Features to Try

1. **Explore Worlds** - Click on any of the 6 learning worlds
2. **Generate Lessons** - Choose Story, Comic, or Rap mode
3. **Take Quizzes** - Test your knowledge and earn rewards
4. **View Profile** - See your progress and unlocked rewards

## 🐛 Troubleshooting

**Port already in use?**
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5173 | xargs kill
```

**Module errors?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Build errors?**
```bash
npm run build
# Check dist/ folder for output
```

## 📚 Next Steps

- Read the full [README.md](README.md)
- Check out [Documentation](docs/)
- Customize worlds in `frontend/src/pages/Worlds.tsx`
- Connect real AI API in `frontend/src/utils/aiClient.ts`

Happy Learning! ✨

