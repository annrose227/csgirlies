import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { X, FileText } from 'lucide-react';
import { Island, Level } from '@/data/islandData';
import ProgressGlobe from './ProgressGlobe';
import SidekickCharacter from './SidekickCharacter';
import { useNavigate } from 'react-router-dom';
import { documentationData } from '@/data/documentation';

interface LevelCarouselProps {
  island: Island;
  onClose: () => void;
}

export default function LevelCarousel({ island, onClose }: LevelCarouselProps) {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const sidekickX = useTransform(springX, (v) => v * 0.3);

  const handleLevelClick = (level: Level) => {
    if (!level.locked) {
      navigate(`/story-mode?world=${encodeURIComponent(island.name)}&level=${level.id}`);
    }
  };

  const handleDragEnd = () => {
    if (!carouselRef.current) return;
    const itemWidth = 160; // 128px globe + 32px margin
    
    const currentX = x.get();
    const snapIndex = Math.round(-currentX / itemWidth);
    const clampedIndex = Math.max(0, Math.min(snapIndex, island.levels.length - 1));
    const snapX = -clampedIndex * itemWidth;
    
    setCurrentIndex(clampedIndex);
    x.set(snapX);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl mx-4 bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl border-4"
        style={{
          borderColor: island.themeColors[0],
          background: `linear-gradient(135deg, ${island.themeColors[0]}20, ${island.themeColors[1]}20)`,
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-lg transition-colors"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>

        {/* Island Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2" style={{ color: island.themeColors[0] }}>
            {island.name}
          </h2>
          <p className="text-gray-600 mb-4">Select a level to begin your journey</p>
          
          {/* Quick Documentation Access */}
          <div className="flex flex-wrap justify-center gap-2">
            {island.levels.filter(level => documentationData[level.id]).map((level) => (
              <motion.button
                key={level.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/documentation?level=${level.id}`);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-white shadow-md"
                style={{
                  background: `linear-gradient(135deg, ${island.themeColors[0]}, ${island.themeColors[1]})`,
                }}
              >
                <FileText className="w-3 h-3 inline mr-1" />
                {level.title} Notes
              </motion.button>
            ))}
          </div>
        </div>

        {/* Sidekick */}
        <div className="absolute left-8 top-1/2 transform -translate-y-1/2 z-10">
          <motion.div style={{ x: sidekickX }}>
            <SidekickCharacter
              sidekick={island.sidekick}
              themeColors={island.themeColors}
              isVisible={true}
            />
          </motion.div>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden px-20">
          <motion.div
            ref={carouselRef}
            className="flex"
            drag="x"
            dragConstraints={{ left: -(island.levels.length - 1) * 160, right: 0 }}
            dragElastic={0.2}
            style={{ x: springX }}
            onDragStart={() => setDragStart(x.get())}
            onDragEnd={handleDragEnd}
            whileDrag={{ cursor: 'grabbing' }}
          >
            {island.levels.map((level) => (
              <ProgressGlobe
                key={level.id}
                level={level}
                themeColors={island.themeColors}
                onClick={() => handleLevelClick(level)}
              />
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {island.levels.map((_, index) => {
            const isActive = currentIndex === index;
            return (
              <motion.div
                key={index}
                className="w-2 h-2 rounded-full"
                style={{
                  background: isActive ? island.themeColors[0] : '#D1D5DB',
                }}
                animate={{
                  scale: isActive ? 1.3 : 1,
                }}
              />
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}

