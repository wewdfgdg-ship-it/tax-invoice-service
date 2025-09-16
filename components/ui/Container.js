import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

const Container = forwardRef(({
  children,
  className,
  maxWidth = 'default',
  ...props
}, ref) => {
  const maxWidths = {
    default: 'max-w-[1200px]',
    sm: 'max-w-[640px]',
    md: 'max-w-[768px]',
    lg: 'max-w-[990px]',
    xl: 'max-w-[1200px]',
    '2xl': 'max-w-[1400px]',
    full: 'max-w-full'
  };

  return (
    <div
      ref={ref}
      className={cn(
        'w-full px-5 mx-auto',
        maxWidths[maxWidth],
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