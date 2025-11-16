import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import MapNode from "./MapNode";
import Path from "./Path";
import { mapData } from "@/data/mapData";

export default function CSMap() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth spring animations for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Transform values for different parallax layers
  const bgX = useTransform(springX, (v) => v * 0.1);
  const bgY = useTransform(springY, (v) => v * 0.1);
  const farCloudsX = useTransform(springX, (v) => v * 0.3);
  const farCloudsY = useTransform(springY, (v) => v * 0.2);
  const midCloudsX = useTransform(springX, (v) => v * 0.5);
  const midCloudsY = useTransform(springY, (v) => v * 0.4);
  const propsX = useTransform(springX, (v) => v * 0.7);
  const propsY = useTransform(springY, (v) => v * 0.6);
  const pathsX = useTransform(springX, (v) => v * 0.9);
  const pathsY = useTransform(springY, (v) => v * 0.8);
  const islandsX = useTransform(springX, (v) => v * 1);
  const islandsY = useTransform(springY, (v) => v * 1);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 100;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 100;

      mouseX.set(x);
      mouseY.set(y);
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Flatten all nodes from all worlds
  const allNodes = mapData.flatMap((world) => world.nodes);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[700px] overflow-hidden rounded-3xl border-4 border-pink-200/50"
      style={{
        background:
          "linear-gradient(135deg, #FFDCEB 0%, #DDEBFF 50%, #EBD8FF 100%)",
      }}
    >
      {/* Layer 1: Background Sky with Sparkles */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at top, #FFDCEB 0%, #DDEBFF 50%, #EBD8FF 100%)",
          x: bgX,
          y: bgY,
        }}
      >
        {/* Small sparkles in background */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={`bg-sparkle-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background:
                "radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)",
              boxShadow: "0 0 4px rgba(255,255,255,0.6)",
            }}
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </motion.div>

      {/* Layer 2: Far Clouds (slow parallax) */}
      <motion.div
        className="absolute inset-0"
        style={{
          x: farCloudsX,
          y: farCloudsY,
        }}
      >
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`far-cloud-${i}`}
            className="absolute text-7xl opacity-30"
            style={{
              left: `${i * 12.5}%`,
              top: `${10 + (i % 3) * 25}%`,
            }}
            animate={{
              x: [0, 20, 0],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ☁️
          </motion.div>
        ))}
      </motion.div>

      {/* Layer 3: Mid Clouds (medium parallax) */}
      <motion.div
        className="absolute inset-0"
        style={{
          x: midCloudsX,
          y: midCloudsY,
        }}
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`mid-cloud-${i}`}
            className="absolute text-8xl opacity-40"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 2) * 30}%`,
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 12 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          >
            ☁️
          </motion.div>
        ))}
      </motion.div>

      {/* Layer 4: Candy Props (medium-fast parallax) */}
      <motion.div
        className="absolute inset-0"
        style={{
          x: propsX,
          y: propsY,
        }}
      >
        {/* Lollipop Trees */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`lollipop-${i}`}
            className="absolute text-5xl"
            style={{
              left: `${10 + i * 20}%`,
              top: `${15 + (i % 2) * 40}%`,
            }}
            animate={{
              rotate: [0, 5, -5, 0],
              y: [0, -8, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          >
            🍭
          </motion.div>
        ))}

        {/* Donut Mountains */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`donut-${i}`}
            className="absolute text-6xl opacity-70"
            style={{
              left: `${20 + i * 25}%`,
              top: `${25 + (i % 2) * 35}%`,
            }}
            animate={{
              y: [0, -5, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            🍩
          </motion.div>
        ))}

        {/* Marshmallow Bushes */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`marshmallow-${i}`}
            className="absolute text-4xl opacity-60"
            style={{
              left: `${5 + i * 16}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -6, 0],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          >
            🍡
          </motion.div>
        ))}

        {/* Cupcake Hills */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`cupcake-${i}`}
            className="absolute text-5xl opacity-65"
            style={{
              left: `${30 + i * 30}%`,
              top: `${40 + i * 15}%`,
            }}
            animate={{
              rotate: [0, 3, -3, 0],
              y: [0, -4, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            🧁
          </motion.div>
        ))}

        {/* Ice Cream Bridge */}
        <motion.div
          className="absolute text-6xl opacity-70"
          style={{
            left: "50%",
            top: "60%",
            transform: "translateX(-50%)",
          }}
          animate={{
            y: [0, -3, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          🍦
        </motion.div>
      </motion.div>

      {/* Layer 5: Paths/Roads between nodes (fastest parallax) */}
      <motion.div
        className="absolute inset-0 z-5"
        style={{
          x: pathsX,
          y: pathsY,
        }}
      >
        {mapData.map((world) =>
          world.nodes.map((node) => {
            if (node.next) {
              const nextNode = world.nodes.find((n) => n.id === node.next);
              if (nextNode) {
                return (
                  <Path
                    key={`path-${world.id}-${node.id}-${nextNode.id}`}
                    from={{ x: node.x, y: node.y }}
                    to={{ x: nextNode.x, y: nextNode.y }}
                    unlocked={node.unlocked && nextNode.unlocked}
                    color={world.color}
                  />
                );
              }
            }
            return null;
          })
        )}
      </motion.div>

      {/* Layer 6: Floating Islands with Nodes (fastest parallax) */}
      <motion.div
        className="absolute inset-0"
        style={{
          x: islandsX,
          y: islandsY,
        }}
      >
        {mapData.map((world) =>
          world.nodes.map((node) => (
            <motion.div
              key={`island-${node.id}`}
              className="absolute rounded-full"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                width: "140px",
                height: "70px",
                transform: "translate(-50%, -50%)",
                background: `linear-gradient(135deg, ${world.color}80, ${world.color}40)`,
                border: `3px solid ${world.color}`,
                boxShadow: `0 8px 32px ${world.color}60`,
              }}
              animate={{
                y: [0, -15, 0],
                rotate: [0, 2, -2, 0],
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))
        )}
      </motion.div>

      {/* Map Nodes (on top of everything) */}
      <div className="absolute inset-0 z-10">
        {allNodes.map((node) => (
          <MapNode
            key={node.id}
            id={node.id}
            title={node.title}
            icon={node.icon}
            x={node.x}
            y={node.y}
            candyType={node.candyType}
            unlocked={node.unlocked}
            completed={node.completed}
          />
        ))}
      </div>

      {/* Floating Sparkles (top layer) */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background:
                "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,182,193,0.6) 50%, transparent 100%)",
              boxShadow:
                "0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,182,193,0.6)",
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              x: [0, mousePosition.x * 0.1],
              y: [0, mousePosition.y * 0.1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* World Labels */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-md rounded-2xl px-6 py-3 shadow-xl border-2 border-pink-200"
        >
          <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            🗺️ CS Learning Map
          </h2>
        </motion.div>
      </div>
    </div>
  );
}
