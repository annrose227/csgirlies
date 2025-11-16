import { motion } from "framer-motion";
import { Island } from "@/data/islandData";
import SidekickCharacter from "./SidekickCharacter";

interface IslandCardProps {
  island: Island;
  index: number;
  onClick: () => void;
}

export default function IslandCard({
  island,
  index,
  onClick,
}: IslandCardProps) {
  const completedLevels = island.levels.filter((l) => l.progress >= 1).length;
  const totalLevels = island.levels.length;
  const progress = completedLevels / totalLevels;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="cursor-pointer"
      onClick={onClick}
    >
      <motion.div
        className="relative rounded-3xl p-6 shadow-2xl border-4 backdrop-blur-md overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${island.themeColors[0]}30, ${island.themeColors[1]}30, ${island.themeColors[2]}30)`,
          borderColor: island.themeColors[0],
          boxShadow: `0 10px 40px ${island.themeColors[0]}40, 0 0 20px ${island.themeColors[1]}30`,
        }}
        animate={{
          boxShadow: [
            `0 10px 40px ${island.themeColors[0]}40`,
            `0 15px 50px ${island.themeColors[0]}60`,
            `0 10px 40px ${island.themeColors[0]}40`,
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Glow Background */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at top right, ${island.themeColors[0]}60, transparent 70%)`,
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Header with Sidekick */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${island.themeColors[0]}50, ${island.themeColors[1]}50)`,
                  boxShadow: `0 0 20px ${island.themeColors[0]}60`,
                }}
              >
                <SidekickCharacter
                  sidekick={island.sidekick}
                  themeColors={island.themeColors}
                  isVisible={true}
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white drop-shadow-lg">
                  {island.name}
                </h3>
                <p className="text-sm text-white/80">{island.sidekick.name}</p>
              </div>
            </div>
          </div>

          {/* Progress Section */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-white">Progress</span>
              <span className="text-sm text-white/90">
                {completedLevels}/{totalLevels} Levels
              </span>
            </div>
            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${island.themeColors[0]}, ${island.themeColors[1]})`,
                }}
                initial={{ width: 0 }}
                animate={{ width: `${progress * 100}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
              />
            </div>
          </div>

          {/* Levels List */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-white/90 block mb-2">
              Levels:
            </span>
            <div className="space-y-1.5 max-h-32 overflow-y-auto">
              {island.levels.map((level) => (
                <div
                  key={level.id}
                  className="flex items-center space-x-2 text-xs"
                >
                  <div
                    className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      level.locked
                        ? "bg-white/20"
                        : level.progress >= 1
                        ? "bg-green-400"
                        : "bg-white/60"
                    }`}
                  />
                  <span
                    className={`flex-1 ${
                      level.locked
                        ? "text-white/50 line-through"
                        : "text-white/90"
                    }`}
                  >
                    {level.title}
                  </span>
                  {level.progress > 0 && level.progress < 1 && (
                    <span className="text-white/60 text-xs">
                      {Math.round(level.progress * 100)}%
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Particle Effects */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              left: `${20 + i * 25}%`,
              top: `${15 + (i % 2) * 30}%`,
              background: island.themeColors[i % island.themeColors.length],
              boxShadow: `0 0 8px ${
                island.themeColors[i % island.themeColors.length]
              }`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 2 + Math.random(),
              repeat: Infinity,
              delay: i * 0.4,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
