import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Lightbulb, Code, CheckCircle } from 'lucide-react';
import { documentationData } from '@/data/documentation';

export default function Documentation() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const levelId = searchParams.get('level') || '';
  const doc = documentationData[levelId];

  if (!doc) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Documentation not found for this level.</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-xl bg-pink-400 text-white font-medium"
          >
            Go Back
          </button>
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
          <span>Back to Lesson</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pastel-card card-glow p-8"
        >
          {/* Header */}
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-br from-pink-400 to-purple-400">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                {doc.title}
              </h1>
              <p className="text-gray-600">Important Notes & Documentation</p>
            </div>
          </div>

          {/* Key Concepts */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-3">
              <CheckCircle className="w-5 h-5 text-pink-500" />
              <h2 className="text-xl font-bold text-gray-800">Key Concepts</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {doc.keyConcepts.map((concept, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-sm font-medium border border-pink-200"
                >
                  {concept}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Important Notes */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="w-5 h-5 text-purple-500" />
              <h2 className="text-xl font-bold text-gray-800">Important Notes</h2>
            </div>
            <div className="space-y-3">
              {doc.notes.map((note, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-xl bg-white/60 border-l-4 border-pink-400"
                >
                  <p className="text-gray-700 leading-relaxed">{note}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Examples */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <Code className="w-5 h-5 text-blue-500" />
              <h2 className="text-xl font-bold text-gray-800">Examples</h2>
            </div>
            <div className="space-y-2">
              {doc.examples.map((example, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-xl bg-blue-50 border border-blue-200"
                >
                  <code className="text-sm text-blue-800 font-mono">{example}</code>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              <h2 className="text-xl font-bold text-gray-800">Pro Tips</h2>
            </div>
            <div className="space-y-2">
              {doc.tips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-xl bg-yellow-50 border-l-4 border-yellow-400"
                >
                  <p className="text-gray-700">💡 {tip}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

