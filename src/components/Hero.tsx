import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-900 to-black text-white">
      <div className="absolute inset-0 bg-black/50" />
      
      <div className="relative max-w-6xl mx-auto px-4 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <h1 className="text-6xl font-bold mb-6">
            Transform Your Body,
            <span className="text-purple-400"> Transform Your Life</span>
          </h1>
          <p className="text-xl mb-8">
            Join our state-of-the-art fitness facility and start your journey to a healthier, stronger you.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-purple-600 text-white px-8 py-4 rounded-full font-semibold flex items-center space-x-2 hover:bg-purple-700 transition-colors"
          >
            <span>Start Your Journey</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}