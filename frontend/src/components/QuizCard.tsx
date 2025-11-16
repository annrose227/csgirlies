import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Sparkles, Coins, TrendingUp } from 'lucide-react';
import { type QuizQuestion } from '@/utils/aiClient';
import { cn } from '@/utils/cn';

interface QuizCardProps {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (isCorrect: boolean) => void;
}

export default function QuizCard({ question, questionNumber, totalQuestions, onAnswer }: QuizCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSelect = (index: number) => {
    if (showResult) return;
    
    setSelectedAnswer(index);
    const correct = index === question.answer;
    setIsCorrect(correct);
    setShowResult(true);
    
    setTimeout(() => {
      onAnswer(correct);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="pastel-card card-glow p-8 max-w-2xl mx-auto"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-pink-500" />
          <span className="text-sm font-medium text-gray-500">
            Question {questionNumber} of {totalQuestions}
          </span>
        </div>
        <div className="w-32 h-2 bg-pink-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            className="h-full bg-gradient-to-r from-pink-400 to-purple-400"
          />
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-6 text-gray-800">{question.q}</h3>

      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrectAnswer = index === question.answer;
          const showCorrect = showResult && isCorrectAnswer;
          const showIncorrect = showResult && isSelected && !isCorrect;

          return (
            <motion.button
              key={index}
              whileHover={!showResult ? { scale: 1.02, x: 5 } : {}}
              whileTap={!showResult ? { scale: 0.98 } : {}}
              onClick={() => handleSelect(index)}
              disabled={showResult}
              className={cn(
                "w-full text-left p-4 rounded-xl border-2 transition-all",
                showCorrect
                  ? "bg-green-100 border-green-400 text-green-800"
                  : showIncorrect
                  ? "bg-red-100 border-red-400 text-red-800"
                  : isSelected
                  ? "bg-pink-100 border-pink-400 text-pink-800"
                  : "bg-white/50 border-pink-200 text-gray-700 hover:border-pink-300 hover:bg-pink-50",
                showResult && "cursor-not-allowed"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{option}</span>
                {showCorrect && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </motion.div>
                )}
                {showIncorrect && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <XCircle className="w-6 h-6 text-red-600" />
                  </motion.div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={cn(
              "p-4 rounded-xl flex items-center space-x-3",
              isCorrect
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
            )}
          >
            {isCorrect ? (
              <>
                <CheckCircle2 className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-bold text-green-800">Correct! 🎉</p>
                  <p className="text-sm text-green-600">+10 Coins • +20 XP</p>
                </div>
              </>
            ) : (
              <>
                <XCircle className="w-6 h-6 text-red-600" />
                <div>
                  <p className="font-bold text-red-800">Not quite right</p>
                  <p className="text-sm text-red-600">Keep learning! 💪</p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

