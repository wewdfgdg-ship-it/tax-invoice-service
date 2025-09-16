import React, { forwardRef } from 'react';
import { clsx as cn } from 'clsx';

const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  icon,
  iconPosition = 'left',
  className,
  ...props 
}, ref) => {
  const baseStyles = `
    inline-flex items-center justify-center
    font-['SF_Pro_Text',_-apple-system,_BlinkMacSystemFont,_'Apple_Gothic',_'HY_Gulim',_MalgunGothic,_'Helvetica_Neue',_Arial,_sans-serif]
    font-normal
    transition-all duration-[240ms] ease-[cubic-bezier(0.4,0,0.6,1)]
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    cursor-pointer
  `;
  
  const variants = {
    primary: `
      bg-[rgb(0,113,227)] text-white
      hover:bg-[rgb(0,102,204)]
      focus:ring-[rgb(0,113,227)]
    `,
    secondary: `
      bg-transparent text-[rgb(29,29,31)]
      border border-[rgb(0,113,227)]
      hover:bg-[rgba(0,113,227,0.05)]
      focus:ring-[rgb(0,113,227)]
    `,
    dark: `
      bg-[rgb(22,22,23)] text-[rgba(255,255,255,0.92)]
      hover:bg-[rgba(22,22,23,0.8)]
      focus:ring-[rgb(134,134,139)]
    `,
    text: `
      bg-transparent text-[rgb(0,113,227)]
      hover:text-[rgb(0,102,204)]
      hover:underline
      focus:ring-[rgb(0,113,227)]
      p-0
    `,
    glass: `
      bg-[rgba(22,22,23,0.8)] text-[rgba(255,255,255,0.92)]
      backdrop-blur-xl
      hover:bg-[rgb(22,22,23)]
      focus:ring-[rgba(255,255,255,0.8)]
    `
  };
  
  const sizes = {
    xs: 'px-3 py-1.5 text-[12px] leading-[16px] rounded-[6px]',
    sm: 'px-4 py-2 text-[14px] leading-[21px] rounded-[8px]',
    md: 'px-6 py-2.5 text-[17px] leading-[21px] rounded-[10px]',
    lg: 'px-8 py-3 text-[19px] leading-[27px] rounded-[12px]',
    xl: 'px-10 py-4 text-[21px] leading-[27px] rounded-[14px]'
  };
  
  return (
    <button
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;