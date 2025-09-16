import React, { forwardRef } from 'react';
import { clsx as cn } from 'clsx';

// Base Loader Component
const Loader = forwardRef(({ 
  variant = 'spinner',
  size = 'md',
  color = 'primary',
  text,
  className,
  ...props 
}, ref) => {
  const sizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };
  
  const colors = {
    primary: 'text-[rgb(0,113,227)]',
    gray: 'text-[rgb(134,134,139)]',
    white: 'text-white',
    dark: 'text-[rgb(22,22,23)]'
  };
  
  const spinnerStyles = `
    animate-spin
    border-2 border-current border-t-transparent
    rounded-full
  `;
  
  const dotsStyles = `
    flex gap-1
  `;
  
  const pulseStyles = `
    animate-pulse
    bg-current
    rounded-full
  `;
  
  const barsStyles = `
    flex gap-1
  `;
  
  const renderLoader = () => {
    switch (variant) {
      case 'spinner':
        return (
          <div 
            className={cn(
              spinnerStyles,
              sizes[size],
              colors[color],
              className
            )}
          />
        );
        
      case 'dots':
        return (
          <div className={cn(dotsStyles, colors[color], className)}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={cn(
                  'bg-current rounded-full animate-bounce',
                  size === 'xs' && 'w-1 h-1',
                  size === 'sm' && 'w-1.5 h-1.5',
                  size === 'md' && 'w-2 h-2',
                  size === 'lg' && 'w-2.5 h-2.5',
                  size === 'xl' && 'w-3 h-3'
                )}
                style={{
                  animationDelay: `${i * 150}ms`
                }}
              />
            ))}
          </div>
        );
        
      case 'pulse':
        return (
          <div 
            className={cn(
              pulseStyles,
              sizes[size],
              colors[color],
              className
            )}
          />
        );
        
      case 'bars':
        return (
          <div className={cn(barsStyles, colors[color], className)}>
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={cn(
                  'bg-current animate-pulse',
                  size === 'xs' && 'w-0.5 h-3',
                  size === 'sm' && 'w-0.5 h-4',
                  size === 'md' && 'w-1 h-6',
                  size === 'lg' && 'w-1 h-8',
                  size === 'xl' && 'w-1.5 h-12'
                )}
                style={{
                  animationDelay: `${i * 100}ms`,
                  opacity: 0.3 + (i * 0.2)
                }}
              />
            ))}
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div 
      ref={ref}
      className="inline-flex flex-col items-center justify-center gap-3"
      {...props}
    >
      {renderLoader()}
      {text && (
        <span className={cn(
          'text-[14px] leading-[21px] font-normal',
          colors[color]
        )}>
          {text}
        </span>
      )}
    </div>
  );
});

Loader.displayName = 'Loader';

// Loading Overlay Component
export const LoadingOverlay = forwardRef(({ 
  isVisible,
  text = '로딩 중...',
  blur = true,
  opacity = 0.8,
  className,
  ...props 
}, ref) => {
  if (!isVisible) return null;
  
  return (
    <div
      ref={ref}
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center',
        'transition-all duration-[240ms] ease-[cubic-bezier(0.4,0,0.6,1)]',
        blur && 'backdrop-blur-sm',
        className
      )}
      style={{
        backgroundColor: `rgba(0, 0, 0, ${opacity})`
      }}
      {...props}
    >
      <div className="bg-white rounded-[18px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
        <Loader variant="spinner" size="lg" color="primary" text={text} />
      </div>
    </div>
  );
});

LoadingOverlay.displayName = 'LoadingOverlay';

// Inline Loader Component  
export const InlineLoader = forwardRef(({ 
  variant = 'dots',
  size = 'sm',
  color = 'gray',
  text,
  className,
  ...props 
}, ref) => {
  return (
    <span 
      ref={ref}
      className={cn(
        'inline-flex items-center gap-2',
        className
      )}
      {...props}
    >
      <Loader variant={variant} size={size} color={color} />
      {text && (
        <span className={cn(
          'text-[14px] leading-[21px] font-normal',
          color === 'primary' && 'text-[rgb(0,113,227)]',
          color === 'gray' && 'text-[rgb(134,134,139)]',
          color === 'white' && 'text-white',
          color === 'dark' && 'text-[rgb(22,22,23)]'
        )}>
          {text}
        </span>
      )}
    </span>
  );
});

InlineLoader.displayName = 'InlineLoader';

export default Loader;