import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

const Card = forwardRef(({
  children,
  className,
  variant = 'shadow',
  ...props
}, ref) => {
  const baseStyles = 'rounded-[20px]';
  
  const variants = {
    shadow: 'bg-white shadow-[0px_30px_70px_0px_rgba(0,0,0,0.15)] p-[27px_42px_40px]',
    bordered: 'bg-transparent border border-[#BCBCBC] rounded-[10px] p-[10px_0px_11px_18px]'
  };

  return (
    <div
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
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