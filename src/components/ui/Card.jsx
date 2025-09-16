import React, { forwardRef } from 'react';
import { clsx as cn } from 'clsx';

const Card = forwardRef(({ 
  children, 
  variant = 'default',
  padding = 'default',
  className,
  ...props 
}, ref) => {
  const baseStyles = `
    block
    transition-all duration-[240ms] ease-[cubic-bezier(0.4,0,0.6,1)]
  `;
  
  const variants = {
    default: `
      bg-white
      rounded-[18px]
      shadow-[0_4px_20px_rgba(0,0,0,0.08)]
    `,
    bordered: `
      bg-white
      rounded-[18px]
      border border-[rgb(232,232,237)]
    `,
    glass: `
      bg-[rgba(255,255,255,0.72)]
      backdrop-blur-xl
      rounded-[18px]
      shadow-[0_4px_20px_rgba(0,0,0,0.08)]
    `,
    dark: `
      bg-[rgb(22,22,23)]
      rounded-[18px]
      shadow-[0_4px_20px_rgba(0,0,0,0.3)]
    `,
    flat: `
      bg-[rgb(245,245,247)]
      rounded-[18px]
    `,
    hover: `
      bg-white
      rounded-[18px]
      shadow-[0_4px_20px_rgba(0,0,0,0.08)]
      hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]
      hover:transform hover:translateY-[-2px]
      cursor-pointer
    `
  };
  
  const paddings = {
    none: 'p-0',
    sm: 'p-[22px]',
    default: 'p-[40px]',
    lg: 'p-[44px]',
    xl: 'p-[88px]'
  };
  
  return (
    <div
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        paddings[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export default Card;