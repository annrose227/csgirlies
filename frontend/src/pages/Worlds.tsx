import { motion } from 'framer-motion';
import CSMap from '@/components/CSMap';

export default function Worlds() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            🗺️ CS Learning Map
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore floating islands of knowledge! Click on any candy node to begin your learning adventure.
          </p>
        </motion.div>

        <CSMap />
      </div>
    </div>
  );
}

