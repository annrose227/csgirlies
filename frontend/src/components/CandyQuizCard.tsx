import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import { type QuizQuestion } from '@/utils/aiClient';
import { cn } from '@/utils/cn';

interface CandyQuizCardProps {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (isCorrect: boolean) => void;
}

const candyShapes = ['🍩', '🧁', '🍦', '🍭'];
const candyColors = [
  'from-pink-300 to-rose-300',
  'from-purple-300 to-indigo-300',
  'from-blue-300 to-cyan-300',
  'from-yellow-300 to-orange-300'
];

export default function CandyQuizCard({ question, questionNumber, totalQuestions, onAnswer }: CandyQuizCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [dragState, setDragState] = useState<{ isDragging: boolean; draggedIndex: number | null }>({
    isDragging: false,
    draggedIndex: null
  });

  const handleSelect = (index: number) => {
    if (showResult) return;
    
    setSelectedAnswer(index);
    const correct = index === question.answer;
    setIsCorrect(correct);
    setShowResult(true);
    
    setTimeout(() => {
      onAnswer(correct);
    }, 2000);
  };

  const handleDragStart = (index: number) => {
    setDragState({ isDragging: true, draggedIndex: index });
  };

  const handleDragEnd = () => {
    setDragState({ isDragging: false, draggedIndex: null });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="pastel-card card-glow p-8 max-w-3xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-pink-500" />
          <span className="text-sm font-medium text-gray-500">
            Question {questionNumber} of {totalQuestions}
          </span>
        </div>
        <div className="w-32 h-3 bg-pink-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            className="h-full bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"
          />
        </div>
      </div>

      {/* Question */}
      <h3 className="text-3xl font-bold mb-8 text-center text-gray-800 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
        {question.q}
      </h3>

      {/* Candy Options Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrectAnswer = index === question.answer;
          const showCorrect = showResult && isCorrectAnswer;
          const showIncorrect = showResult && isSelected && !isCorrect;

          return (
            <motion.div
              key={index}
              drag={!showResult && !dragState.isDragging}
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              onDragStart={() => handleDragStart(index)}
              onDragEnd={handleDragEnd}
              whileHover={!showResult ? { scale: 1.05, rotate: 2 } : {}}
              whileTap={!showResult ? { scale: 0.95 } : {}}
              onClick={() => !showResult && handleSelect(index)}
              className={cn(
                "relative cursor-pointer",
                showResult && "cursor-not-allowed"
              )}
            >
              <motion.div
                className={cn(
                  "relative w-full h-32 rounded-3xl",
                  "flex flex-col items-center justify-center",
                  "border-4 transition-all duration-300",
                  showCorrect
                    ? "bg-gradient-to-br from-green-200 to-emerald-200 border-green-400 candy-burst"
                    : showIncorrect
                    ? "bg-gradient-to-br from-red-200 to-rose-200 border-red-400 soft-shake"
                    : isSelected
                    ? `bg-gradient-to-br ${candyColors[index]} border-pink-400 shadow-xl`
                    : `bg-gradient-to-br ${candyColors[index]} border-white/50 hover:border-pink-300`,
                  dragState.isDragging && dragState.draggedIndex === index && "opacity-50"
                )}
                animate={showResult && isCorrectAnswer ? {
                  scale: [1, 1.2, 1],
                  rotate: [0, 360]
                } : {}}
                transition={{ duration: 0.6 }}
              >
                {/* Candy Shape Icon */}
                <div className="text-5xl mb-2">{candyShapes[index]}</div>
                
                {/* Option Text */}
                <p className={cn(
                  "text-sm font-bold text-center px-2",
                  showCorrect ? "text-green-800" : showIncorrect ? "text-red-800" : "text-gray-700"
                )}>
                  {option}
                </p>

                {/* Result Icons */}
                {showCorrect && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1 shadow-lg"
                  >
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </motion.div>
                )}
                {showIncorrect && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 shadow-lg"
                  >
                    <XCircle className="w-6 h-6 text-white" />
                  </motion.div>
                )}

                {/* Sparkles for correct answer */}
                {showCorrect && (
                  <>
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full bg-yellow-300"
                        style={{
                          left: `${20 + i * 15}%`,
                          top: `${10 + (i % 2) * 80}%`,
                        }}
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0, 2, 0],
                          y: [0, -30, 0],
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </>
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={cn(
              "p-4 rounded-2xl flex items-center space-x-3 text-center",
              isCorrect
                ? "bg-green-50 border-2 border-green-200"
                : "bg-red-50 border-2 border-red-200"
            )}
          >
            {isCorrect ? (
              <>
                <CheckCircle2 className="w-8 h-8 text-green-600" />
                <div>
                  <p className="font-bold text-green-800 text-lg">Correct! 🎉</p>
                  <p className="text-sm text-green-600">+10 Coins • +20 XP</p>
                </div>
              </>
            ) : (
              <>
                <XCircle className="w-8 h-8 text-red-600" />
                <div>
                  <p className="font-bold text-red-800 text-lg">Not quite right</p>
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

