import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trophy, Coins, TrendingUp } from 'lucide-react';
import CandyQuizCard from '@/components/CandyQuizCard';
import { aiClient, type QuizQuestion } from '@/utils/aiClient';
import { db } from '@/utils/firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export default function QuizPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const world = searchParams.get('world') || 'Unknown World';
  const lesson = searchParams.get('lesson') || '';
  
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [xp, setXp] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  useEffect(() => {
    const loadQuiz = async () => {
      setLoading(true);
      try {
        const quizQuestions = await aiClient.generateQuiz(lesson);
        setQuestions(quizQuestions);
      } catch (error) {
        console.error('Error loading quiz:', error);
      } finally {
        setLoading(false);
      }
    };

    if (lesson) {
      loadQuiz();
    }
  }, [lesson]);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prev => prev + 1);
      setCoins(prev => prev + 10);
      setXp(prev => prev + 20);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        completeQuiz();
      }
    }, 2000);
  };

  const completeQuiz = async () => {
    setQuizComplete(true);
    
    // Save progress to Firebase (mock user ID for demo)
    const userId = 'demo-user'; // In real app, get from auth
    try {
      const progressRef = doc(db, 'users', userId, 'progress', world);
      const progressDoc = await getDoc(progressRef);
      
      const currentData = progressDoc.exists() ? progressDoc.data() : { totalScore: 0, totalCoins: 0, totalXP: 0 };
      
      await setDoc(progressRef, {
        world,
        totalScore: (currentData.totalScore || 0) + score,
        totalCoins: (currentData.totalCoins || 0) + coins,
        totalXP: (currentData.totalXP || 0) + xp,
        lastCompleted: new Date().toISOString(),
        quizzesCompleted: (currentData.quizzesCompleted || 0) + 1
      }, { merge: true });
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-pink-400 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (quizComplete) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="pastel-card card-glow p-8 text-center"
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
              className="text-6xl mb-4"
            >
              🎉
            </motion.div>
            
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Quiz Complete!
            </h2>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="pastel-card p-4">
                <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">{score}/{questions.length}</p>
                <p className="text-sm text-gray-600">Score</p>
              </div>
              <div className="pastel-card p-4">
                <Coins className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">+{coins}</p>
                <p className="text-sm text-gray-600">Coins</p>
              </div>
              <div className="pastel-card p-4">
                <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">+{xp}</p>
                <p className="text-sm text-gray-600">XP</p>
              </div>
            </div>

            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/profile')}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold shadow-lg shadow-pink-200/60"
              >
                View Profile & Rewards
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/worlds')}
                className="w-full py-3 rounded-xl bg-white border-2 border-pink-300 text-pink-600 font-bold hover:bg-pink-50"
              >
                Explore More Worlds
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -5 }}
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-pink-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </motion.button>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{world} Quiz</h1>
            <p className="text-gray-600">Test your knowledge and earn rewards!</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="flex items-center space-x-1 text-yellow-600">
                <Coins className="w-5 h-5" />
                <span className="font-bold">{coins}</span>
              </div>
              <p className="text-xs text-gray-500">Coins</p>
            </div>
            <div className="text-center">
              <div className="flex items-center space-x-1 text-green-600">
                <TrendingUp className="w-5 h-5" />
                <span className="font-bold">{xp}</span>
              </div>
              <p className="text-xs text-gray-500">XP</p>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {questions.length > 0 && (
            <CandyQuizCard
              key={currentQuestion}
              question={questions[currentQuestion]}
              questionNumber={currentQuestion + 1}
              totalQuestions={questions.length}
              onAnswer={handleAnswer}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

