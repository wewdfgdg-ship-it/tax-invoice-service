import React, { forwardRef } from 'react';
import { clsx as cn } from 'clsx';

const Link = forwardRef(({ 
  children, 
  href = '#',
  variant = 'default',
  color = 'primary',
  underline = false,
  external = false,
  className,
  ...props 
}, ref) => {
  const baseStyles = `
    inline-flex items-center
    font-['SF_Pro_Text',_-apple-system,_BlinkMacSystemFont,_'Apple_Gothic',_'HY_Gulim',_MalgunGothic,_'Helvetica_Neue',_Arial,_sans-serif]
    transition-all duration-[320ms] ease-[cubic-bezier(0.4,0,0.6,1)]
    cursor-pointer
  `;
  
  const variants = {
    default: `
      text-[17px] leading-[27px] font-normal
      hover:opacity-80
    `,
    nav: `
      text-[12px] leading-[16px] font-normal
      hover:opacity-100
    `,
    footer: `
      text-[12px] leading-[16px] font-normal
      hover:underline
    `,
    inline: `
      text-inherit font-inherit
      hover:opacity-80
    `,
    button: `
      text-[17px] leading-[27px] font-normal
      px-6 py-2.5 rounded-[10px]
      hover:bg-[rgba(0,113,227,0.05)]
    `
  };
  
  const colors = {
    default: 'text-[rgb(29,29,31)]',
    primary: 'text-[rgb(0,113,227)] hover:text-[rgb(0,102,204)]',
    white: 'text-white hover:text-[rgba(255,255,255,0.92)]',
    whiteAlpha: 'text-[rgba(255,255,255,0.8)] hover:text-white',
    gray: 'text-[rgb(134,134,139)] hover:text-[rgb(29,29,31)]',
    dark: 'text-[rgb(22,22,23)] hover:text-black'
  };
  
  const linkProps = external ? {
    target: '_blank',
    rel: 'noopener noreferrer'
  } : {};
  
  return (
    <a
      ref={ref}
      href={href}
      className={cn(
        baseStyles,
        variants[variant],
        colors[color],
        underline && 'underline',
        className
      )}
      {...linkProps}
      {...props}
    >
      {children}
      {external && (
        <svg 
          className="ml-1 w-3 h-3" 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
        </svg>
      )}
    </a>
  );
});

Link.displayName = 'Link';

export default Link;