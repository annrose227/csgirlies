import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";

interface WorldCardProps {
  title: string;
  description: string;
  color: string;
  icon: string;
  index: number;
}

export default function WorldCard({
  title,
  description,
  icon,
  index,
}: WorldCardProps) {
  const navigate = useNavigate();

  const handleEnter = () => {
    navigate(`/story-mode?world=${encodeURIComponent(title)}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="pastel-card card-glow p-6 cursor-pointer group"
      onClick={handleEnter}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="text-4xl">{icon}</div>
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        >
          <Sparkles className="w-6 h-6 text-pink-400" />
        </motion.div>
      </div>

      <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
        {title}
      </h3>
      <p className="text-gray-600 mb-4">{description}</p>

      <motion.button
        whileHover={{ x: 5 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-400 to-purple-400 text-white font-medium shadow-lg shadow-pink-200/60 group-hover:shadow-pink-300/80 transition-all"
      >
        <span>Enter World</span>
        <ArrowRight className="w-4 h-4" />
      </motion.button>
    </motion.div>
  );
}
