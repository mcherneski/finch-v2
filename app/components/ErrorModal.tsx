import { motion, AnimatePresence } from 'framer-motion';

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export default function ErrorModal({ isOpen, onClose, message }: ErrorModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-red-600 rounded-xl p-6 max-w-sm w-full mx-4 shadow-xl"
          >
            <h2 className="text-xl font-bold text-white mb-4">Error</h2>
            <p className="text-white mb-4">{message}</p>
            <button
              onClick={onClose}
              className="w-full px-4 py-2 bg-white text-red-600 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
} 