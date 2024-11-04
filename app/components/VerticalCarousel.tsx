'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import Slide from './Slide';
import DotsIndicator from '@/app/components/DotsIndicator';

const slides = [
  { title: 'Simplify Your Finances', content: 'All your assets, right at your fingertips. Finch makes finance fun and incredibly easy. Buy, send and invest in a couple taps.', image: '/Home_iPhone.png' },
  { title: 'Invest in the Future', content: "Embrace the future of finance with access to the latest investment strategies. Be among the first to leverage innovative technology. Redefine your financial journey and unlock new possibilities today.", image: '/FinchStrat.png' },
  { title: 'Effortless Payments', content: 'Send money in seconds — smooth, simple, and secure. Transfer funds instantly, whether crypto or cash. Worry free.', image: '/Finch social.png' },
];

export default function VerticalCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const SWIPE_THRESHOLD = 50;
    const { offset } = info;

    if (Math.abs(offset.x) > Math.abs(offset.y)) {
      // Horizontal swipe
      if (offset.x > SWIPE_THRESHOLD && activeIndex > 0) {
        setActiveIndex(prev => prev - 1);
      } else if (offset.x < -SWIPE_THRESHOLD && activeIndex < slides.length - 1) {
        setActiveIndex(prev => prev + 1);
      }
    } else {
      // Vertical swipe
      if (offset.y > SWIPE_THRESHOLD && activeIndex > 0) {
        setActiveIndex(prev => prev - 1);
      } else if (offset.y < -SWIPE_THRESHOLD && activeIndex < slides.length - 1) {
        setActiveIndex(prev => prev + 1);
      }
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden pt-12">
      <AnimatePresence mode="wait">
        {slides.map((slide, index) => (
          index === activeIndex && (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                duration: 0.5
              }}
              className="absolute w-full h-full"
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
            >
              <Slide title={slide.title} content={slide.content} image={slide.image} />
            </motion.div>
          )
        ))}
      </AnimatePresence>
      <DotsIndicator 
        activeIndex={activeIndex} 
        total={slides.length} 
        onDotClick={handleDotClick}
      />
    </div>
  );
} 