import { cn } from '../../lib/utils';

const Loader = ({
  className,
  variant = 'spinner',
  size = 'md',
  color = 'primary',
  text,
  ...props
}) => {
  const sizes = {
    xs: 'w-4 h-4',
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colors = {
    primary: 'text-[#5E21D1]',
    green: 'text-[#3BD997]',
    gray: 'text-[#888888]',
    white: 'text-white',
    black: 'text-[#222222]'
  };

  const textSizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  if (variant === 'spinner') {
    return (
      <div className={cn('flex flex-col items-center gap-3', className)} {...props}>
        <div
          className={cn(
            'animate-spin rounded-full border-2 border-transparent',
            sizes[size],
            colors[color]
          )}
          style={{
            borderTopColor: 'currentColor',
            borderRightColor: 'currentColor',
            borderBottomColor: 'transparent',
            borderLeftColor: 'transparent',
          }}
        />
        {text && (
          <p className={cn('font-medium', colors[color], textSizes[size])}>
            {text}
          </p>
        )}
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className={cn('flex flex-col items-center gap-3', className)} {...props}>
        <div className="flex space-x-1">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className={cn(
                'rounded-full animate-bounce',
                colors[color]
              )}
              style={{
                width: size === 'xs' ? '6px' : size === 'sm' ? '8px' : size === 'md' ? '10px' : size === 'lg' ? '12px' : '16px',
                height: size === 'xs' ? '6px' : size === 'sm' ? '8px' : size === 'md' ? '10px' : size === 'lg' ? '12px' : '16px',
                backgroundColor: 'currentColor',
                animationDelay: `${index * 0.1}s`,
                animationDuration: '0.6s'
              }}
            />
          ))}
        </div>
        {text && (
          <p className={cn('font-medium', colors[color], textSizes[size])}>
            {text}
          </p>
        )}
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className={cn('flex flex-col items-center gap-3', className)} {...props}>
        <div
          className={cn(
            'rounded-full animate-pulse',
            sizes[size],
            colors[color]
          )}
          style={{
            backgroundColor: 'currentColor',
            opacity: 0.6
          }}
        />
        {text && (
          <p className={cn('font-medium', colors[color], textSizes[size])}>
            {text}
          </p>
        )}
      </div>
    );
  }

  if (variant === 'bars') {
    return (
      <div className={cn('flex flex-col items-center gap-3', className)} {...props}>
        <div className="flex space-x-1 items-end">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className={cn('animate-pulse', colors[color])}
              style={{
                width: size === 'xs' ? '3px' : size === 'sm' ? '4px' : size === 'md' ? '5px' : size === 'lg' ? '6px' : '8px',
                height: size === 'xs' ? '16px' : size === 'sm' ? '20px' : size === 'md' ? '24px' : size === 'lg' ? '32px' : '40px',
                backgroundColor: 'currentColor',
                animationDelay: `${index * 0.1}s`,
                animationDuration: '1s',
                transform: `scaleY(${0.3 + (index * 0.2)})`
              }}
            />
          ))}
        </div>
        {text && (
          <p className={cn('font-medium', colors[color], textSizes[size])}>
            {text}
          </p>
        )}
      </div>
    );
  }

  // Default fallback to spinner
  return (
    <div className={cn('flex flex-col items-center gap-3', className)} {...props}>
      <div
        className={cn(
          'animate-spin rounded-full border-2 border-transparent',
          sizes[size],
          colors[color]
        )}
        style={{
          borderTopColor: 'currentColor',
          borderRightColor: 'currentColor',
        }}
      />
      {text && (
        <p className={cn('font-medium', colors[color], textSizes[size])}>
          {text}
        </p>
      )}
    </div>
  );
};

// Loading Overlay Component
export const LoadingOverlay = ({
  isVisible = true,
  variant = 'spinner',
  size = 'lg',
  color = 'primary',
  text = '로딩 중...',
  backdrop = true,
  className,
  ...props
}) => {
  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center',
        backdrop && 'bg-black/50',
        className
      )}
      {...props}
    >
      <div className={cn(
        'p-6 rounded-lg',
        backdrop && 'bg-white shadow-xl'
      )}>
        <Loader
          variant={variant}
          size={size}
          color={color}
          text={text}
        />
      </div>
    </div>
  );
};

// Inline Loading Component
export const InlineLoader = ({
  variant = 'dots',
  size = 'sm',
  color = 'gray',
  text,
  className,
  ...props
}) => {
  return (
    <div className={cn('inline-flex items-center gap-2', className)} {...props}>
      <Loader
        variant={variant}
        size={size}
        color={color}
        className="flex-shrink-0"
      />
      {text && (
        <span className={cn('text-sm font-medium', {
          'text-[#5E21D1]': color === 'primary',
          'text-[#3BD997]': color === 'green',
          'text-[#888888]': color === 'gray',
          'text-white': color === 'white',
          'text-[#222222]': color === 'black'
        })}>
          {text}
        </span>
      )}
    </div>
  );
};

export default Loader;