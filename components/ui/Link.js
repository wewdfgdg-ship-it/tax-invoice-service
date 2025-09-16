import { forwardRef } from 'react';
import NextLink from 'next/link';
import { cn } from '../../lib/utils';

const Link = forwardRef(({
  children,
  className,
  href,
  variant = 'default',
  underline = false,
  external = false,
  ...props
}, ref) => {
  const baseStyles = 'transition-colors duration-300';
  
  const variants = {
    default: 'text-[#337AB7] hover:text-[#23527c] font-medium',
    light: 'text-white hover:text-gray-200 font-light'
  };

  const underlineStyles = underline ? 'underline hover:no-underline' : 'no-underline hover:underline';

  const linkContent = (
    <a
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        underlineStyles,
        className
      )}
      {...(external && { 
        target: '_blank', 
        rel: 'noopener noreferrer' 
      })}
      {...props}
    >
      {children}
    </a>
  );

  if (external || href?.startsWith('http') || href?.startsWith('mailto') || href?.startsWith('tel')) {
    return (
      <a
        ref={ref}
        href={href}
        className={cn(
          baseStyles,
          variants[variant],
          underlineStyles,
          className
        )}
        {...(external && { 
          target: '_blank', 
          rel: 'noopener noreferrer' 
        })}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} passHref legacyBehavior>
      {linkContent}
    </NextLink>
  );
});

Link.displayName = 'Link';

export default Link;