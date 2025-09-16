import React, { forwardRef } from 'react';
import { clsx as cn } from 'clsx';

const Container = forwardRef(({ 
  children, 
  maxWidth = 'default',
  padding = 'default',
  center = true,
  className,
  ...props 
}, ref) => {
  const maxWidths = {
    sm: 'max-w-[734px]',     // Mobile breakpoint
    md: 'max-w-[1068px]',    // Tablet breakpoint  
    lg: 'max-w-[1440px]',    // Desktop breakpoint
    xl: 'max-w-[1920px]',
    '2xl': 'max-w-[2560px]',
    default: 'max-w-[1440px]',
    full: 'max-w-full',
    none: 'max-w-none'
  };
  
  const paddings = {
    none: 'px-0',
    sm: 'px-[22px]',
    default: 'px-[40px]',
    lg: 'px-[88px]',
    responsive: 'px-[22px] md:px-[40px] lg:px-[88px]'
  };
  
  return (
    <div
      ref={ref}
      className={cn(
        maxWidths[maxWidth],
        paddings[padding],
        center && 'mx-auto',
        'w-full',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Container.displayName = 'Container';

export default Container;