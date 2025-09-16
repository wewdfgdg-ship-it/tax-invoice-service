import React, { forwardRef } from 'react';
import { clsx as cn } from 'clsx';

const Badge = forwardRef(({ 
  children,
  variant = 'default',
  size = 'default',
  color = 'default',
  className,
  ...props 
}, ref) => {
  const baseStyles = `
    inline-flex items-center justify-center
    font-['SF_Pro_Text',_-apple-system,_BlinkMacSystemFont,_'Apple_Gothic',_'HY_Gulim',_MalgunGothic,_'Helvetica_Neue',_Arial,_sans-serif]
    font-medium
    transition-all duration-[240ms] ease-[cubic-bezier(0.4,0,0.6,1)]
  `;
  
  const variants = {
    default: 'rounded-full',
    pill: 'rounded-[999px]',
    square: 'rounded-[6px]',
    dot: 'rounded-full w-2 h-2 p-0'
  };
  
  const sizes = {
    xs: 'px-2 py-0.5 text-[10px] leading-[12px]',
    sm: 'px-2.5 py-1 text-[11px] leading-[16px]',
    default: 'px-3 py-1.5 text-[12px] leading-[16px]',
    lg: 'px-4 py-2 text-[14px] leading-[21px]'
  };
  
  const colors = {
    default: 'bg-[rgb(245,245,247)] text-[rgb(29,29,31)]',
    primary: 'bg-[rgb(0,113,227)] text-white',
    secondary: 'bg-[rgb(232,232,237)] text-[rgb(134,134,139)]',
    success: 'bg-[rgb(52,199,89)] text-white',
    warning: 'bg-[rgb(255,179,67)] text-[rgb(29,29,31)]',
    danger: 'bg-[rgb(239,76,71)] text-white',
    dark: 'bg-[rgb(22,22,23)] text-[rgba(255,255,255,0.92)]',
    light: 'bg-white text-[rgb(29,29,31)] border border-[rgb(232,232,237)]'
  };
  
  return (
    <span
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        variant !== 'dot' && sizes[size],
        colors[color],
        className
      )}
      {...props}
    >
      {variant !== 'dot' && children}
    </span>
  );
});

Badge.displayName = 'Badge';

export default Badge;