import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, BookOpen, Trophy, User, Sparkles } from 'lucide-react';
import { cn } from '@/utils/cn';

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/worlds', label: 'Worlds', icon: BookOpen },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-pink-200/50 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Sparkles className="w-8 h-8 text-pink-500" />
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              LearnVerse
            </span>
          </Link>

          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200",
                    isActive
                      ? "bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-lg shadow-pink-200/60"
                      : "text-gray-600 hover:bg-pink-100/50 hover:text-pink-600"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

