import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';

interface Sticker {
  id: string;
  name: string;
  icon: string;
  category: 'hat' | 'accessory' | 'background' | 'effect';
  unlocked: boolean;
}

interface AvatarDressUpProps {
  stickers: Sticker[];
  onStickerSelect?: (sticker: Sticker) => void;
}

export default function AvatarDressUp({ stickers, onStickerSelect }: AvatarDressUpProps) {
  const [selectedSticker, setSelectedSticker] = useState<Sticker | null>(null);
  const [equippedStickers, setEquippedStickers] = useState<{ [key: string]: Sticker }>({});

  const handleStickerClick = (sticker: Sticker) => {
    if (!sticker.unlocked) return;
    
    setSelectedSticker(sticker);
    if (onStickerSelect) {
      onStickerSelect(sticker);
    }

    // Toggle equip/unequip
    if (equippedStickers[sticker.category]?.id === sticker.id) {
      const newEquipped = { ...equippedStickers };
      delete newEquipped[sticker.category];
      setEquippedStickers(newEquipped);
    } else {
      setEquippedStickers({ ...equippedStickers, [sticker.category]: sticker });
    }
  };

  const categories = ['hat', 'accessory', 'background', 'effect'] as const;
  const categoryLabels = {
    hat: '👒 Hats',
    accessory: '💍 Accessories',
    background: '🎨 Backgrounds',
    effect: '✨ Effects'
  };

  return (
    <div className="space-y-6">
      {/* Avatar Display */}
      <div className="relative w-64 h-64 mx-auto">
        <motion.div
          className="relative w-full h-full rounded-full bg-gradient-to-br from-pink-200 to-purple-200 border-4 border-white shadow-2xl flex items-center justify-center overflow-hidden"
          animate={{
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Background */}
          {equippedStickers.background && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute inset-0 text-6xl flex items-center justify-center"
            >
              {equippedStickers.background.icon}
            </motion.div>
          )}

          {/* Avatar Base */}
          <motion.div
            className="relative z-10 text-8xl"
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            👤
          </motion.div>

          {/* Hat */}
          {equippedStickers.hat && (
            <motion.div
              initial={{ scale: 0, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 text-5xl z-20"
            >
              {equippedStickers.hat.icon}
            </motion.div>
          )}

          {/* Accessory */}
          {equippedStickers.accessory && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-4xl z-20"
            >
              {equippedStickers.accessory.icon}
            </motion.div>
          )}

          {/* Effect */}
          {equippedStickers.effect && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center text-6xl z-30"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {equippedStickers.effect.icon}
            </motion.div>
          )}

          {/* Sparkles around avatar */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-pink-300"
              style={{
                left: `${50 + 40 * Math.cos((i * Math.PI) / 4)}%`,
                top: `${50 + 40 * Math.sin((i * Math.PI) / 4)}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.25,
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Sticker Inventory */}
      <div className="space-y-4">
        {categories.map((category) => {
          const categoryStickers = stickers.filter(s => s.category === category);
          if (categoryStickers.length === 0) return null;

          return (
            <div key={category} className="pastel-card p-4">
              <h3 className="text-lg font-bold mb-3 text-pink-600">{categoryLabels[category]}</h3>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
                {categoryStickers.map((sticker) => {
                  const isEquipped = equippedStickers[category]?.id === sticker.id;
                  const isUnlocked = sticker.unlocked;

                  return (
                    <motion.button
                      key={sticker.id}
                      onClick={() => handleStickerClick(sticker)}
                      whileHover={isUnlocked ? { scale: 1.1, rotate: 5 } : {}}
                      whileTap={isUnlocked ? { scale: 0.9 } : {}}
                      className={`
                        relative w-16 h-16 rounded-xl
                        flex items-center justify-center text-3xl
                        transition-all duration-300
                        ${isEquipped 
                          ? 'bg-gradient-to-br from-pink-400 to-purple-400 border-4 border-white shadow-xl scale-110' 
                          : isUnlocked
                          ? 'bg-white/80 border-2 border-pink-200 hover:border-pink-400'
                          : 'bg-gray-200 border-2 border-gray-300 opacity-50 cursor-not-allowed'
                        }
                      `}
                    >
                      {isUnlocked ? (
                        <>
                          {sticker.icon}
                          {isEquipped && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute -top-1 -right-1 bg-green-400 rounded-full p-0.5"
                            >
                              <Sparkles className="w-3 h-3 text-white" />
                            </motion.div>
                          )}
                        </>
                      ) : (
                        <>
                          <span className="filter grayscale blur-sm">🔒</span>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs text-gray-500">🔒</span>
                          </div>
                        </>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Sticker Preview Modal */}
      <AnimatePresence>
        {selectedSticker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setSelectedSticker(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="pastel-card p-8 max-w-md mx-4 text-center relative"
            >
              <button
                onClick={() => setSelectedSticker(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
              
              <motion.div
                className="text-8xl mb-4"
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                {selectedSticker.icon}
              </motion.div>
              
              <h3 className="text-2xl font-bold mb-2 text-pink-600">{selectedSticker.name}</h3>
              <p className="text-gray-600 mb-4">Category: {selectedSticker.category}</p>
              
              {equippedStickers[selectedSticker.category]?.id === selectedSticker.id ? (
                <p className="text-green-600 font-bold">✓ Equipped</p>
              ) : (
                <p className="text-pink-600">Click to equip!</p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

