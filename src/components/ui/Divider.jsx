import React, { forwardRef } from 'react';
import { clsx as cn } from 'clsx';

const Divider = forwardRef(({ 
  variant = 'default',
  orientation = 'horizontal',
  spacing = 'default',
  className,
  ...props 
}, ref) => {
  const baseStyles = `
    border-0
  `;
  
  const variants = {
    default: 'bg-[rgb(232,232,237)]',
    light: 'bg-[rgba(255,255,255,0.2)]',
    dark: 'bg-[rgba(0,0,0,0.1)]',
    primary: 'bg-[rgb(0,113,227)]'
  };
  
  const orientations = {
    horizontal: 'w-full h-[1px]',
    vertical: 'h-full w-[1px]'
  };
  
  const spacings = {
    none: '',
    sm: orientation === 'horizontal' ? 'my-4' : 'mx-4',
    default: orientation === 'horizontal' ? 'my-8' : 'mx-8',
    lg: orientation === 'horizontal' ? 'my-12' : 'mx-12'
  };
  
  return (
    <hr
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        orientations[orientation],
        spacings[spacing],
        className
      )}
      {...props}
    />
  );
});

Divider.displayName = 'Divider';

export default Divider;