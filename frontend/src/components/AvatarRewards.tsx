import { motion } from 'framer-motion';
import { Sparkles, Trophy, Star, Gift } from 'lucide-react';

interface Reward {
  id: string;
  name: string;
  type: 'sticker' | 'theme' | 'badge';
  icon: string;
  unlocked: boolean;
}

interface AvatarRewardsProps {
  rewards: Reward[];
}

export default function AvatarRewards({ rewards }: AvatarRewardsProps) {
  const unlockedRewards = rewards.filter(r => r.unlocked);
  const lockedRewards = rewards.filter(r => !r.unlocked);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Trophy className="w-6 h-6 text-yellow-500" />
        <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          Your Rewards Collection
        </h2>
      </div>

      {unlockedRewards.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-green-600 mb-3 flex items-center space-x-2">
            <Star className="w-5 h-5" />
            <span>Unlocked ({unlockedRewards.length})</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {unlockedRewards.map((reward, index) => (
              <motion.div
                key={reward.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="pastel-card card-glow p-4 text-center relative overflow-hidden"
              >
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                  className="text-4xl mb-2"
                >
                  {reward.icon}
                </motion.div>
                <p className="text-sm font-medium text-gray-700">{reward.name}</p>
                <div className="absolute top-2 right-2">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {lockedRewards.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-500 mb-3 flex items-center space-x-2">
            <Gift className="w-5 h-5" />
            <span>Locked ({lockedRewards.length})</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {lockedRewards.map((reward, index) => (
              <motion.div
                key={reward.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="pastel-card p-4 text-center opacity-50 relative"
              >
                <div className="text-4xl mb-2 filter grayscale blur-sm">
                  {reward.icon}
                </div>
                <p className="text-sm font-medium text-gray-500">{reward.name}</p>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-600 text-xs">🔒</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {rewards.length === 0 && (
        <div className="text-center py-12">
          <Gift className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Complete quizzes to unlock rewards! 🎁</p>
        </div>
      )}
    </div>
  );
}

