import { motion } from 'framer-motion';

interface PathProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
  unlocked: boolean;
  color?: string;
}

export default function Path({ from, to, unlocked, color = '#FFC7D1' }: PathProps) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${from.x}%`,
        top: `${from.y}%`,
        width: `${length}%`,
        transform: `rotate(${angle}deg)`,
        transformOrigin: '0 50%',
      }}
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ 
        opacity: unlocked ? 1 : 0.3,
        scaleX: 1
      }}
      transition={{ duration: 0.5 }}
    >
      {/* Road Base - Wider and more visible */}
      <svg
        width="100%"
        height="12"
        style={{ 
          filter: unlocked 
            ? 'drop-shadow(0 2px 8px rgba(255,182,193,0.4)) drop-shadow(0 0 4px rgba(255,255,255,0.3))' 
            : 'none' 
        }}
      >
        {/* Road shadow/outline */}
        <motion.path
          d={`M 0 6 Q ${length / 2}% 20, ${length}% 6`}
          stroke={unlocked ? 'rgba(255,255,255,0.3)' : 'rgba(200,200,200,0.2)'}
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Main road path */}
        <motion.path
          d={`M 0 6 Q ${length / 2}% 20, ${length}% 6`}
          stroke={unlocked ? color : '#D1D5DB'}
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={unlocked ? "12,6" : "6,6"}
          animate={unlocked ? {
            strokeDashoffset: [0, -18],
            opacity: [0.8, 1, 0.8]
          } : {}}
          transition={{
            duration: 2,
            repeat: unlocked ? Infinity : 0,
            ease: "linear"
          }}
        />
        
        {/* Road center line */}
        <motion.path
          d={`M 0 6 Q ${length / 2}% 20, ${length}% 6`}
          stroke={unlocked ? 'rgba(255,255,255,0.6)' : 'rgba(200,200,200,0.3)'}
          strokeWidth="2"
          fill="none"
          strokeDasharray="4,4"
          strokeLinecap="round"
          animate={unlocked ? {
            strokeDashoffset: [0, -8]
          } : {}}
          transition={{
            duration: 1,
            repeat: unlocked ? Infinity : 0,
            ease: "linear"
          }}
        />
      </svg>
      
      {/* Sparkles along the road */}
      {unlocked && (
        <>
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${(i + 1) * (100 / 11)}%`,
                top: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,182,193,0.6) 50%, transparent 100%)',
                boxShadow: '0 0 8px rgba(255,255,255,0.8), 0 0 12px rgba(255,182,193,0.6)',
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 2, 0],
                y: [0, -8, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.25,
                ease: "easeInOut"
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  );
}

