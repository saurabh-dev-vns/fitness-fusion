import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

export function ContactForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          id="name"
          className="w-full px-4 py-2 border outline-none border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          required
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="w-full px-4 py-2 border outline-none border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          required
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          className="w-full px-4 py-2 border outline-none border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          required
        ></textarea>
      </div>
      
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-purple-700 transition-colors"
      >
        <span>Send Message</span>
        <Send className="w-4 h-4" />
      </motion.button>
    </form>
  );
}