import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface MapNodeProps {
  id: string;
  title: string;
  icon: string;
  x: number;
  y: number;
  candyType: "donut" | "cupcake" | "icecream" | "lollipop" | "marshmallow";
  unlocked: boolean;
  completed: boolean;
}

const candyIcons = {
  donut: "🍩",
  cupcake: "🧁",
  icecream: "🍦",
  lollipop: "🍭",
  marshmallow: "🍡",
};

const candyColors = {
  donut: "from-pink-300 to-rose-300",
  cupcake: "from-purple-300 to-indigo-300",
  icecream: "from-blue-300 to-cyan-300",
  lollipop: "from-yellow-300 to-orange-300",
  marshmallow: "from-pink-200 to-purple-200",
};

export default function MapNode({
  title,
  icon,
  x,
  y,
  candyType,
  unlocked,
  completed,
}: MapNodeProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (unlocked) {
      navigate(`/story-mode?world=${encodeURIComponent(title)}`);
    }
  };

  return (
    <motion.div
      className="absolute flex flex-col items-center"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: unlocked ? 1 : 0.5,
        scale: 1,
        y: [0, -10, 0],
      }}
      transition={{
        y: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      <motion.button
        onClick={handleClick}
        disabled={!unlocked}
        whileHover={unlocked ? { scale: 1.15, rotate: 5, y: -3 } : {}}
        whileTap={unlocked ? { scale: 0.9 } : {}}
        className={`
          relative w-28 h-28 rounded-full
          bg-gradient-to-br ${candyColors[candyType]}
          border-4 ${unlocked ? "border-white" : "border-gray-300"}
          shadow-2xl
          ${unlocked ? "cursor-pointer" : "cursor-not-allowed"}
          flex items-center justify-center
          transition-all duration-300
          mb-2
        `}
        style={{
          filter: unlocked
            ? "drop-shadow(0 0 25px rgba(255, 182, 193, 0.8)) drop-shadow(0 0 15px rgba(255, 255, 255, 0.6))"
            : "grayscale(0.7)",
        }}
        animate={
          unlocked
            ? {
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 10px 40px rgba(255, 182, 193, 0.4)",
                  "0 15px 50px rgba(255, 182, 193, 0.6)",
                  "0 10px 40px rgba(255, 182, 193, 0.4)",
                ],
              }
            : {}
        }
        transition={{
          duration: 2,
          repeat: unlocked ? Infinity : 0,
          ease: "easeInOut",
        }}
      >
        {/* Candy Icon */}
        <motion.div
          className="text-4xl"
          animate={
            unlocked
              ? {
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }
              : {}
          }
          transition={{
            duration: 2,
            repeat: unlocked ? Infinity : 0,
            repeatDelay: 1,
          }}
        >
          {candyIcons[candyType]}
        </motion.div>

        {/* Topic Icon */}
        <div className="absolute -top-2 -right-2 text-2xl bg-white/90 rounded-full p-1 shadow-lg">
          {icon}
        </div>

        {/* Completion Checkmark */}
        {completed && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -bottom-2 -right-2 bg-green-400 rounded-full p-1 shadow-lg"
          >
            <span className="text-white text-lg">✓</span>
          </motion.div>
        )}

        {/* Sparkles for unlocked nodes */}
        {unlocked && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-white"
                style={{
                  left: `${20 + i * 30}%`,
                  top: `${10 + i * 20}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </>
        )}
      </motion.button>

      {/* Topic Title Below Icon */}
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className={`
          text-center mt-1 px-2 py-1 rounded-lg
          ${
            unlocked
              ? "bg-white/95 backdrop-blur-sm border-2 border-pink-200 shadow-lg"
              : "bg-gray-200/80 border-2 border-gray-300"
          }
        `}
      >
        <p
          className={`
          text-xs font-bold whitespace-nowrap
          ${unlocked ? "text-pink-600" : "text-gray-500"}
        `}
        >
          {title}
        </p>
      </motion.div>
    </motion.div>
  );
}
