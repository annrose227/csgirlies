import { motion } from 'framer-motion';
import { Sidekick } from '@/data/islandData';

interface SidekickCharacterProps {
  sidekick: Sidekick;
  themeColors: string[];
  isVisible: boolean;
}

const idleAnimations = {
  float: {
    y: [0, -15, 0],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
  slow_walk: {
    x: [0, 10, 0],
    y: [0, -5, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
  bounce: {
    y: [0, -20, 0],
    scale: [1, 1.1, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeOut"
    }
  },
  teleport: {
    opacity: [1, 0.3, 1],
    scale: [1, 0.8, 1],
    x: [0, 20, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export default function SidekickCharacter({ sidekick, themeColors, isVisible }: SidekickCharacterProps) {
  if (!isVisible) return null;

  const animation = idleAnimations[sidekick.idleAnimation];

  return (
    <motion.div
      className="relative z-20"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      {...animation}
    >
      {/* Sidekick Sprite */}
      <div
        className="relative text-5xl filter drop-shadow-lg"
        style={{
          filter: `drop-shadow(0 0 15px ${themeColors[0]}80)`,
        }}
      >
        {sidekick.sprite}
        
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full blur-xl"
          style={{
            background: `radial-gradient(circle, ${themeColors[0]}40, transparent)`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Name Label */}
      <motion.div
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div
          className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${themeColors[0]}, ${themeColors[1]})`,
          }}
        >
          {sidekick.name}
        </div>
      </motion.div>

      {/* Particle effects */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${50 + (i - 2) * 15}%`,
            top: `${50 + (i % 2) * 20}%`,
            background: themeColors[i % themeColors.length],
            boxShadow: `0 0 8px ${themeColors[i % themeColors.length]}`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeOut"
          }}
        />
      ))}
    </motion.div>
  );
}

