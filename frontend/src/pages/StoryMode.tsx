import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, BookOpen, Sparkles, FileText } from 'lucide-react';
import StoryGenerator from '@/components/StoryGenerator';
import { type LessonResult } from '@/utils/aiClient';

export default function StoryMode() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const world = searchParams.get('world') || 'Unknown World';
  const levelId = searchParams.get('level') || '';
  const [lesson, setLesson] = useState<LessonResult | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [showQuizButton, setShowQuizButton] = useState(false);

  const handleLessonGenerated = (generatedLesson: LessonResult) => {
    setLesson(generatedLesson);
    setShowQuizButton(true);
  };

  const handleStartQuiz = () => {
    if (lesson) {
      navigate(`/quiz?world=${encodeURIComponent(world)}&lesson=${encodeURIComponent(lesson.lesson)}`);
    }
  };

  // Split lesson into pages (3-4 sentences per page)
  const lessonPages = lesson ? lesson.lesson.split(/(?<=[.!?])\s+/).reduce((acc: string[][], sentence: string, index: number) => {
    const pageIndex = Math.floor(index / 3);
    if (!acc[pageIndex]) acc[pageIndex] = [];
    acc[pageIndex].push(sentence);
    return acc;
  }, []) : [];

  const totalPages = lessonPages.length + (lesson ? 1 : 0); // +1 for questions page

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="max-w-5xl mx-auto">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -5 }}
          onClick={() => navigate('/worlds')}
          className="flex items-center space-x-2 text-gray-600 hover:text-pink-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Map</span>
        </motion.button>

        {!lesson ? (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <div className="inline-flex items-center space-x-2 mb-4">
                <Sparkles className="w-6 h-6 text-pink-500" />
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  {world}
                </h1>
              </div>
              <p className="text-gray-600 mb-4">Choose your learning style and generate a personalized storybook!</p>
              
              {/* Documentation Button */}
              {levelId && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(`/documentation?level=${levelId}`)}
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-400 to-cyan-400 text-white font-bold shadow-lg shadow-blue-200/60 hover:shadow-blue-300/80 transition-all mb-6"
                >
                  <FileText className="w-5 h-5" />
                  <span>View Documentation & Notes</span>
                </motion.button>
              )}
            </motion.div>
            <StoryGenerator topic={world} onLessonGenerated={handleLessonGenerated} />
          </div>
        ) : (
          <div className="relative">
            {/* Storybook Container */}
            <div className="perspective-1000">
              <motion.div
                className="relative w-full"
                style={{ perspective: '1000px' }}
              >
                {/* Storybook Pages */}
                <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-amber-200 min-h-[600px]">
                  {/* Illustrated Header */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-6"
                  >
                    <div className="inline-block text-6xl mb-2">
                      {['📖', '🎨', '🎭'][currentPage % 3]}
                    </div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-3">
                      {world} Storybook
                    </h2>
                    
                    {/* Documentation Button in Storybook */}
                    {levelId && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate(`/documentation?level=${levelId}`)}
                        className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-400 to-cyan-400 text-white text-sm font-medium shadow-lg"
                      >
                        <FileText className="w-4 h-4" />
                        <span>View Notes</span>
                      </motion.button>
                    )}
                  </motion.div>

                  {/* Page Content */}
                  <AnimatePresence mode="wait">
                    {currentPage < lessonPages.length ? (
                      <motion.div
                        key={`page-${currentPage}`}
                        initial={{ opacity: 0, x: 100, rotateY: 90 }}
                        animate={{ opacity: 1, x: 0, rotateY: 0 }}
                        exit={{ opacity: 0, x: -100, rotateY: -90 }}
                        transition={{ duration: 0.6 }}
                        className="prose prose-lg max-w-none text-center"
                      >
                        <div className="bg-white/80 rounded-2xl p-8 shadow-lg border-2 border-pink-200">
                          {lessonPages[currentPage].map((sentence, idx) => (
                            <motion.p
                              key={idx}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="text-lg text-gray-700 mb-4 leading-relaxed"
                            >
                              {sentence}
                            </motion.p>
                          ))}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="questions-page"
                        initial={{ opacity: 0, x: 100, rotateY: 90 }}
                        animate={{ opacity: 1, x: 0, rotateY: 0 }}
                        exit={{ opacity: 0, x: -100, rotateY: -90 }}
                        transition={{ duration: 0.6 }}
                        className="bg-white/80 rounded-2xl p-8 shadow-lg border-2 border-purple-200"
                      >
                        <h3 className="text-2xl font-bold mb-6 text-center text-purple-600">
                          📝 Comprehension Questions
                        </h3>
                        <ul className="space-y-4">
                          {lesson.questions.map((q, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="flex items-start space-x-3 p-4 bg-pink-50 rounded-xl border-2 border-pink-200"
                            >
                              <span className="text-2xl font-bold text-pink-500">{idx + 1}.</span>
                              <span className="text-gray-700 text-lg flex-1">{q}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Page Number */}
                  <div className="absolute bottom-4 right-8 text-sm text-gray-500 font-medium">
                    Page {currentPage + 1} of {totalPages}
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center mt-6">
                  <motion.button
                    onClick={handlePrevPage}
                    disabled={currentPage === 0}
                    whileHover={currentPage > 0 ? { scale: 1.1 } : {}}
                    whileTap={currentPage > 0 ? { scale: 0.9 } : {}}
                    className={`
                      flex items-center space-x-2 px-6 py-3 rounded-2xl font-bold text-white
                      ${currentPage > 0 
                        ? 'bg-gradient-to-r from-pink-400 to-rose-400 shadow-lg cursor-pointer' 
                        : 'bg-gray-300 cursor-not-allowed'
                      }
                    `}
                  >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Previous</span>
                  </motion.button>

                  {currentPage === totalPages - 1 && showQuizButton && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleStartQuiz}
                      className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold text-lg shadow-xl flex items-center space-x-2"
                    >
                      <span>Take Quiz & Earn Rewards</span>
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  )}

                  <motion.button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages - 1}
                    whileHover={currentPage < totalPages - 1 ? { scale: 1.1 } : {}}
                    whileTap={currentPage < totalPages - 1 ? { scale: 0.9 } : {}}
                    className={`
                      flex items-center space-x-2 px-6 py-3 rounded-2xl font-bold text-white
                      ${currentPage < totalPages - 1 
                        ? 'bg-gradient-to-r from-purple-400 to-indigo-400 shadow-lg cursor-pointer' 
                        : 'bg-gray-300 cursor-not-allowed'
                      }
                    `}
                  >
                    <span>Next</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
