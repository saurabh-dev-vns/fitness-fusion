import { motion } from 'framer-motion';

interface ClassCardProps {
  title: string;
  instructor: string;
  image: string;
  time: string;
}

export function ClassCard({ title, instructor, image, time }: ClassCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative overflow-hidden rounded-xl shadow-lg group"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-64 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 text-white">
        <h3 className="text-xl font-bold mb-1">{title}</h3>
        <p className="text-sm text-gray-300">with {instructor}</p>
        <p className="text-sm text-gray-300">{time}</p>
      </div>
    </motion.div>
  );
}