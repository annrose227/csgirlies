import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, BookOpen, Star, Trophy, ArrowRight } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: BookOpen,
      title: "Story-Based Learning",
      description: "Learn through engaging stories, comics, and raps tailored to your style"
    },
    {
      icon: Star,
      title: "Personalized AI",
      description: "AI-powered lessons that adapt to your learning preferences"
    },
    {
      icon: Trophy,
      title: "Gamified Rewards",
      description: "Earn coins, XP, and unlock amazing stickers and themes"
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 1
            }}
            className="inline-block mb-6"
          >
            <Sparkles className="w-16 h-16 text-pink-500" />
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Welcome to LearnVerse
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A magical universe where learning comes alive through stories, games, and personalized adventures!
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/worlds')}
            className="inline-flex items-center space-x-2 px-8 py-4 rounded-xl bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold text-lg shadow-lg shadow-pink-200/60 hover:shadow-pink-300/80 transition-all"
          >
            <span>Start Your Journey</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="pastel-card card-glow p-6 text-center"
              >
                <div className="inline-block p-4 rounded-full bg-gradient-to-br from-pink-200 to-purple-200 mb-4">
                  <Icon className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Floating Sparkles Animation */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="sparkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

