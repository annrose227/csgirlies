import { motion } from "framer-motion";
import { Level } from "@/data/islandData";
import { Lock } from "lucide-react";

interface ProgressGlobeProps {
  level: Level;
  themeColors: string[];
  onClick: () => void;
}

export default function ProgressGlobe({
  level,
  themeColors,
  onClick,
}: ProgressGlobeProps) {
  const isCompleted = level.progress >= 1;
  const circumference = 2 * Math.PI * 40; // radius = 40
  const offset = circumference - level.progress * circumference;

  return (
    <motion.div
      className="flex-shrink-0 w-32 h-32 mx-4 cursor-pointer"
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <div className="relative w-full h-full">
        {/* Glass Globe Container */}
        <motion.div
          className={`
            relative w-full h-full rounded-full
            backdrop-blur-md border-4
            flex items-center justify-center
            overflow-hidden
            ${
              level.locked
                ? "bg-gray-200/30 border-gray-400/50 grayscale"
                : isCompleted
                ? "bg-gradient-to-br from-yellow-200/40 to-orange-200/40 border-yellow-400/70"
                : "bg-white/20 border-white/50"
            }
          `}
          style={{
            boxShadow: level.locked
              ? "inset 0 0 20px rgba(0,0,0,0.2)"
              : `0 0 30px ${themeColors[0]}60, inset 0 0 20px ${themeColors[1]}30`,
          }}
          animate={
            !level.locked
              ? {
                  boxShadow: [
                    `0 0 30px ${themeColors[0]}60`,
                    `0 0 40px ${themeColors[0]}80`,
                    `0 0 30px ${themeColors[0]}60`,
                  ],
                }
              : {}
          }
          transition={{
            duration: 2,
            repeat: !level.locked ? Infinity : 0,
            ease: "easeInOut",
          }}
        >
          {/* Frosted blur for locked */}
          {level.locked && (
            <div className="absolute inset-0 backdrop-blur-sm bg-white/10 rounded-full" />
          )}

          {/* Level Icon */}
          <div className="relative z-10 text-5xl">
            {level.locked ? (
              <Lock className="w-12 h-12 text-gray-500 mx-auto" />
            ) : (
              <span>{level.icon}</span>
            )}
          </div>

          {/* Progress Ring */}
          {!level.locked && (
            <svg className="absolute inset-0 w-full h-full transform -rotate-90">
              {/* Background circle */}
              <circle
                cx="50%"
                cy="50%"
                r="40"
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="4"
              />
              {/* Progress circle */}
              <motion.circle
                cx="50%"
                cy="50%"
                r="40"
                fill="none"
                stroke={themeColors[0]}
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1, ease: "easeOut" }}
                style={{
                  filter: `drop-shadow(0 0 4px ${themeColors[0]})`,
                }}
              />
            </svg>
          )}

          {/* Completion Stars */}
          {isCompleted && (
            <>
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-yellow-400"
                  style={{
                    left: `${50 + 45 * Math.cos((i * Math.PI) / 4)}%`,
                    top: `${50 + 45 * Math.sin((i * Math.PI) / 4)}%`,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.25,
                  }}
                />
              ))}
            </>
          )}

          {/* Sparkles for unlocked */}
          {!level.locked && !isCompleted && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full bg-white"
                  style={{
                    left: `${20 + i * 30}%`,
                    top: `${15 + (i % 2) * 30}%`,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                />
              ))}
            </>
          )}
        </motion.div>

        {/* Level Title */}
        <motion.div
          className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-28"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p
            className={`
            text-xs font-bold text-center whitespace-nowrap truncate
            ${level.locked ? "text-gray-500" : "text-white"}
          `}
            style={{
              textShadow: level.locked
                ? "none"
                : `0 0 8px ${themeColors[0]}, 0 2px 4px rgba(0,0,0,0.3)`,
            }}
          >
            {level.title}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
