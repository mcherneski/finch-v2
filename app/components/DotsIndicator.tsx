interface DotsIndicatorProps {
  activeIndex: number;
  total: number;
  onDotClick: (index: number) => void;
}

export default function DotsIndicator({ activeIndex, total, onDotClick }: DotsIndicatorProps) {
  return (
    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4">
      {Array.from({ length: total }).map((_, index) => (
        <div key={index} className="relative flex items-center justify-center w-6 h-6">
          {index === activeIndex && (
            <div className="absolute w-5 h-5 rounded-full border-2 border-yellow-500 animate-pulse" />
          )}
          <button
            onClick={() => onDotClick(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-200 hover:bg-yellow-400
              ${index === activeIndex ? 'bg-yellow-500' : 'bg-white/50 hover:bg-white/70'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        </div>
      ))}
    </div>
  );
} 