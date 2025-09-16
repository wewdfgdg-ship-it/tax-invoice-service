import React, { forwardRef } from 'react';
import { clsx as cn } from 'clsx';

const Typography = forwardRef(({ 
  children, 
  variant = 'body',
  color = 'default',
  weight = 'normal',
  align = 'left',
  as,
  className,
  ...props 
}, ref) => {
  const variants = {
    // Display variants
    display: 'text-[56px] leading-[1.1] tracking-[-0.02em] font-semibold',
    displayLarge: 'text-[53px] leading-[1.1] tracking-[-0.02em] font-semibold',
    
    // Heading variants
    h1: 'text-[40px] leading-[44px] tracking-[-0.01em] font-semibold',
    h2: 'text-[34px] leading-[54px] tracking-[-0.01em] font-semibold',
    h3: 'text-[28px] leading-[1.2] tracking-[-0.01em] font-semibold',
    h4: 'text-[24px] leading-[1.2] tracking-[-0.01em] font-semibold',
    h5: 'text-[21px] leading-[27px] font-semibold',
    h6: 'text-[19px] leading-[27px] font-semibold',
    
    // Body variants
    body: 'text-[17px] leading-[27px] font-normal',
    bodyLarge: 'text-[20px] leading-[27px] font-normal',
    bodySmall: 'text-[14px] leading-[21px] font-normal',
    
    // Utility variants
    caption: 'text-[12px] leading-[16px] font-normal',
    footnote: 'text-[11px] leading-[16px] font-normal',
    label: 'text-[12px] leading-[16px] font-medium uppercase tracking-[0.06em]',
    link: 'text-[17px] leading-[27px] font-normal hover:underline cursor-pointer transition-all duration-[320ms]'
  };
  
  const colors = {
    default: 'text-[rgb(29,29,31)]',
    white: 'text-white',
    whiteAlpha: 'text-[rgba(255,255,255,0.92)]',
    whiteSecondary: 'text-[rgba(255,255,255,0.8)]',
    black: 'text-[rgb(0,0,0)]',
    gray: 'text-[rgb(134,134,139)]',
    lightGray: 'text-[rgb(232,232,237)]',
    primary: 'text-[rgb(0,113,227)]',
    primaryHover: 'text-[rgb(0,102,204)]',
    dark: 'text-[rgb(22,22,23)]',
    darkAlpha: 'text-[rgba(22,22,23,0.8)]'
  };
  
  const weights = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  };
  
  const alignments = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify'
  };
  
  // Default HTML element based on variant
  const defaultElements = {
    display: 'h1',
    displayLarge: 'h1',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    body: 'p',
    bodyLarge: 'p',
    bodySmall: 'p',
    caption: 'span',
    footnote: 'span',
    label: 'label',
    link: 'a'
  };
  
  const Component = as || defaultElements[variant] || 'p';
  
  return (
    <Component
      ref={ref}
      className={cn(
        "font-['SF_Pro_Text',_-apple-system,_BlinkMacSystemFont,_'Apple_Gothic',_'HY_Gulim',_MalgunGothic,_'Helvetica_Neue',_Arial,_sans-serif]",
        variants[variant],
        colors[color],
        weights[weight],
        alignments[align],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
});

Typography.displayName = 'Typography';

export default Typography;