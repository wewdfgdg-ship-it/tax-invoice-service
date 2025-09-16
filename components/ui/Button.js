import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

const Button = forwardRef(({
  children,
  className,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  type = 'button',
  ...props
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-[#222222] hover:bg-[#000000] text-white border border-transparent focus:ring-[#222222]',
    secondary: 'bg-transparent hover:bg-[#f8f9fa] text-[#222222] border border-[#7C7C7C] hover:border-[#222222] focus:ring-[#7C7C7C]',
    dark: 'bg-[#2B2B2B] hover:bg-[#222222] text-white border-0 focus:ring-[#2B2B2B]'
  };

  const sizes = {
    sm: 'px-5 py-2.5 text-[15px] rounded-full',
    md: 'px-6 py-3 text-[18px] rounded-full',
    lg: 'px-7 py-3.5 text-[20px] rounded-[40px]'
  };

  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        baseStyles,
        variants[variant] || variants.primary,
        sizes[size] || sizes.md,
        className
      )}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;