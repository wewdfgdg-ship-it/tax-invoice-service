import { useState, useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';

const Carousel = ({
  children,
  className,
  variant = 'default',
  autoPlay = false,
  autoPlayInterval = 3000,
  showDots = true,
  showArrows = true,
  loop = true,
  ...props
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const intervalRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const items = Array.isArray(children) ? children : [children];
  const totalItems = items.length;

  // Auto play functionality
  useEffect(() => {
    if (isPlaying && totalItems > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (loop ? (prev + 1) % totalItems : Math.min(prev + 1, totalItems - 1)));
      }, autoPlayInterval);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPlaying, totalItems, autoPlayInterval, loop]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsPlaying(false);
  };

  const goToPrevious = () => {
    if (loop) {
      setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
    } else {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
    setIsPlaying(false);
  };

  const goToNext = () => {
    if (loop) {
      setCurrentIndex((prev) => (prev + 1) % totalItems);
    } else {
      setCurrentIndex((prev) => Math.min(prev + 1, totalItems - 1));
    }
    setIsPlaying(false);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const deltaX = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }
  };

  const variants = {
    default: {
      container: 'relative overflow-hidden rounded-lg bg-white shadow-lg',
      slider: 'flex transition-transform duration-500 ease-in-out',
      slide: 'w-full flex-shrink-0',
      arrow: 'absolute top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-[#222222] rounded-full p-2 shadow-md transition-all duration-300 hover:shadow-lg',
      arrowLeft: 'left-4',
      arrowRight: 'right-4',
      dots: 'absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2',
      dot: 'w-3 h-3 rounded-full transition-all duration-300 cursor-pointer',
      dotActive: 'bg-[#5E21D1]',
      dotInactive: 'bg-white/60 hover:bg-white/80'
    },
    minimal: {
      container: 'relative overflow-hidden',
      slider: 'flex transition-transform duration-300 ease-out',
      slide: 'w-full flex-shrink-0',
      arrow: 'absolute top-1/2 -translate-y-1/2 z-10 text-[#222222] hover:text-[#5E21D1] transition-colors duration-300',
      arrowLeft: 'left-2',
      arrowRight: 'right-2',
      dots: 'flex justify-center space-x-1 mt-4',
      dot: 'w-2 h-2 rounded-full transition-all duration-300 cursor-pointer',
      dotActive: 'bg-[#5E21D1] w-6',
      dotInactive: 'bg-[#979797] hover:bg-[#222222]'
    }
  };

  const currentVariant = variants[variant];

  return (
    <div className={cn(currentVariant.container, className)} {...props}>
      {/* Main slider */}
      <div
        className={currentVariant.slider}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {items.map((child, index) => (
          <div key={index} className={currentVariant.slide}>
            {child}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {showArrows && totalItems > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className={cn(currentVariant.arrow, currentVariant.arrowLeft)}
            disabled={!loop && currentIndex === 0}
            aria-label="Previous slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={goToNext}
            className={cn(currentVariant.arrow, currentVariant.arrowRight)}
            disabled={!loop && currentIndex === totalItems - 1}
            aria-label="Next slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {showDots && totalItems > 1 && (
        <div className={currentVariant.dots}>
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                currentVariant.dot,
                index === currentIndex ? currentVariant.dotActive : currentVariant.dotInactive
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Play/Pause button for autoPlay */}
      {autoPlay && (
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute top-4 right-4 z-10 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 transition-all duration-300"
          aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
        >
          {isPlaying ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 4H10V20H6V4ZM14 4H18V20H14V4Z" fill="currentColor"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
            </svg>
          )}
        </button>
      )}
    </div>
  );
};

export default Carousel;