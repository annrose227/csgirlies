import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, BookOpen, Image, Music } from 'lucide-react';
import { aiClient, type LessonResult } from '@/utils/aiClient';
import { cn } from '@/utils/cn';

interface StoryGeneratorProps {
  topic: string;
  onLessonGenerated: (lesson: LessonResult) => void;
}

export default function StoryGenerator({ topic, onLessonGenerated }: StoryGeneratorProps) {
  const [mode, setMode] = useState<"story" | "comic" | "rap">("story");
  const [loading, setLoading] = useState(false);
  const [lesson, setLesson] = useState<LessonResult | null>(null);

  const modes = [
    { value: "story" as const, label: "Story", icon: BookOpen, color: "from-pink-400 to-rose-400" },
    { value: "comic" as const, label: "Comic", icon: Image, color: "from-purple-400 to-indigo-400" },
    { value: "rap" as const, label: "Rap", icon: Music, color: "from-blue-400 to-cyan-400" },
  ];

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await aiClient.generateLesson(topic, mode);
      setLesson(result);
      onLessonGenerated(result);
    } catch (error) {
      console.error('Error generating lesson:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="pastel-card card-glow p-6">
        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          Choose Your Learning Style
        </h2>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          {modes.map((m) => {
            const Icon = m.icon;
            const isSelected = mode === m.value;
            
            return (
              <motion.button
                key={m.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMode(m.value)}
                className={cn(
                  "flex flex-col items-center space-y-2 p-4 rounded-xl border-2 transition-all",
                  isSelected
                    ? `bg-gradient-to-br ${m.color} text-white border-transparent shadow-lg`
                    : "bg-white/50 border-pink-200 text-gray-600 hover:border-pink-300"
                )}
              >
                <Icon className="w-6 h-6" />
                <span className="font-medium">{m.label}</span>
              </motion.button>
            );
          })}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold shadow-lg shadow-pink-200/60 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center space-x-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
              <span>Generating Magic...</span>
            </span>
          ) : (
            <span className="flex items-center justify-center space-x-2">
              <Sparkles className="w-5 h-5" />
              <span>Generate Lesson</span>
            </span>
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {lesson && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="pastel-card card-glow p-6"
          >
            <h3 className="text-xl font-bold mb-4 text-pink-600">Your Personalized Lesson</h3>
            <div className="prose prose-pink max-w-none">
              <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                {lesson.lesson}
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-pink-200">
              <h4 className="text-lg font-bold mb-3 text-purple-600">Comprehension Questions</h4>
              <ul className="space-y-2">
                {lesson.questions.map((q, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start space-x-2 text-gray-700"
                  >
                    <span className="text-pink-500 font-bold">{idx + 1}.</span>
                    <span>{q}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

