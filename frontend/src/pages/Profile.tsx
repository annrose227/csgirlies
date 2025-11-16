import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Coins, TrendingUp, Sparkles } from 'lucide-react';
import AvatarDressUp from '@/components/AvatarDressUp';

interface Sticker {
  id: string;
  name: string;
  icon: string;
  category: 'hat' | 'accessory' | 'background' | 'effect';
  unlocked: boolean;
}

export default function Profile() {
  const [stats, setStats] = useState({
    totalXP: 0,
    totalCoins: 0,
    quizzesCompleted: 0,
    worldsExplored: 0
  });
  const [stickers, setStickers] = useState<Sticker[]>([]);

  useEffect(() => {
    // Load user stats and stickers
    // In a real app, this would fetch from Firebase
    const loadProfile = async () => {
      // Mock data for demo
      setStats({
        totalXP: 120,
        totalCoins: 50,
        quizzesCompleted: 2,
        worldsExplored: 1
      });

      setStickers([
        // Hats
        { id: '1', name: 'Crown', category: 'hat', icon: '👑', unlocked: true },
        { id: '2', name: 'Party Hat', category: 'hat', icon: '🎉', unlocked: true },
        { id: '3', name: 'Wizard Hat', category: 'hat', icon: '🧙', unlocked: false },
        { id: '4', name: 'Cap', category: 'hat', icon: '🧢', unlocked: false },
        // Accessories
        { id: '5', name: 'Glasses', category: 'accessory', icon: '👓', unlocked: true },
        { id: '6', name: 'Necklace', category: 'accessory', icon: '💎', unlocked: false },
        { id: '7', name: 'Bow Tie', category: 'accessory', icon: '🎀', unlocked: false },
        // Backgrounds
        { id: '8', name: 'Rainbow', category: 'background', icon: '🌈', unlocked: true },
        { id: '9', name: 'Stars', category: 'background', icon: '⭐', unlocked: false },
        { id: '10', name: 'Hearts', category: 'background', icon: '💖', unlocked: false },
        // Effects
        { id: '11', name: 'Sparkles', category: 'effect', icon: '✨', unlocked: true },
        { id: '12', name: 'Fire', category: 'effect', icon: '🔥', unlocked: false },
        { id: '13', name: 'Lightning', category: 'effect', icon: '⚡', unlocked: false },
      ]);
    };

    loadProfile();
  }, []);

  const statCards = [
    { icon: TrendingUp, label: 'Total XP', value: stats.totalXP, color: 'from-green-400 to-emerald-400' },
    { icon: Coins, label: 'Coins', value: stats.totalCoins, color: 'from-yellow-400 to-orange-400' },
    { icon: Trophy, label: 'Quizzes', value: stats.quizzesCompleted, color: 'from-pink-400 to-rose-400' },
    { icon: Sparkles, label: 'Worlds', value: stats.worldsExplored, color: 'from-purple-400 to-indigo-400' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pastel-card card-glow p-8 mb-8"
        >
          <div className="flex items-center space-x-6">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center text-4xl shadow-lg"
            >
              👤
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Learner Profile
              </h1>
              <p className="text-gray-600">Keep learning and unlock amazing rewards! ✨</p>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`pastel-card card-glow p-6 text-center bg-gradient-to-br ${stat.color} text-white`}
              >
                <Icon className="w-8 h-8 mx-auto mb-2" />
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm opacity-90">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Avatar Dress-Up Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pastel-card card-glow p-8"
        >
          <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            🎨 Avatar Dress-Up
          </h2>
          <AvatarDressUp stickers={stickers} />
        </motion.div>
      </div>
    </div>
  );
}

