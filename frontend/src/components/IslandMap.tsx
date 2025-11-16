import { useState } from 'react';
import { motion } from 'framer-motion';
import { islandData, Island } from '@/data/islandData';
import IslandCard from './IslandCard';
import LevelCarousel from './LevelCarousel';
import { AnimatePresence } from 'framer-motion';

export default function IslandMap() {
  const [selectedIsland, setSelectedIsland] = useState<Island | null>(null);

  const handleIslandClick = (island: Island) => {
    setSelectedIsland(island);
  };

  return (
    <>
      <div className="relative w-full rounded-3xl border-4 border-pink-200/50 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #FFDCEB 0%, #DDEBFF 50%, #EBD8FF 100%)',
          minHeight: '600px',
        }}
      >
        {/* Background Sparkles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute w-1.5 h-1.5 rounded-full bg-white"
              style={{
                left: `${(i * 15) % 100}%`,
                top: `${(i * 20) % 100}%`,
                boxShadow: '0 0 6px rgba(255,255,255,0.9)',
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 3 + (i % 2),
                repeat: Infinity,
                delay: (i % 3) * 0.5,
              }}
            />
          ))}
        </div>

        {/* Islands Grid */}
        <div className="relative z-10 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {islandData.map((island, index) => (
              <IslandCard
                key={island.id}
                island={island}
                index={index}
                onClick={() => handleIslandClick(island)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Level Carousel Modal */}
      <AnimatePresence>
        {selectedIsland && (
          <LevelCarousel
            key={selectedIsland.id}
            island={selectedIsland}
            onClose={() => setSelectedIsland(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
