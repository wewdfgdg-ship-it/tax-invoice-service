import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

const Typography = forwardRef(({
  children,
  className,
  variant = 'body',
  color = 'default',
  as: Component,
  ...props
}, ref) => {
  const variants = {
    display: {
      element: 'h1',
      styles: 'text-[48px] md:text-[64px] font-bold leading-[1.1] text-[#000000]'
    },
    displayLarge: {
      element: 'h1',
      styles: 'text-[56px] md:text-[76px] font-bold leading-[1.05] text-[#000000]'
    },
    h1: {
      element: 'h1',
      styles: 'text-[40px] md:text-[48px] font-bold leading-[1.1] text-[#000000]'
    },
    h2: {
      element: 'h2',
      styles: 'text-[32px] md:text-[40px] font-semibold leading-[1.2] text-[#000000]'
    },
    h3: {
      element: 'h3',
      styles: 'text-[24px] md:text-[32px] font-semibold leading-[1.3] text-[#000000]'
    },
    h4: {
      element: 'h4',
      styles: 'text-[20px] md:text-[24px] font-semibold leading-[1.4] text-[#000000]'
    },
    h5: {
      element: 'h5',
      styles: 'text-[18px] md:text-[20px] font-semibold leading-[1.4] text-[#000000]'
    },
    h6: {
      element: 'h6',
      styles: 'text-[16px] font-semibold leading-[1.4] text-[#000000]'
    },
    body: {
      element: 'p',
      styles: 'text-[16px] font-normal leading-[1.6] text-[#1d1d1f]'
    },
    bodyLarge: {
      element: 'p',
      styles: 'text-[19px] font-normal leading-[1.6] text-[#1d1d1f]'
    },
    bodySmall: {
      element: 'p',
      styles: 'text-[14px] font-normal leading-[1.5] text-[#1d1d1f]'
    },
    caption: {
      element: 'span',
      styles: 'text-[12px] font-normal leading-[1.4] text-[#86868b]'
    },
    footnote: {
      element: 'small',
      styles: 'text-[11px] font-normal leading-[1.4] text-[#86868b]'
    },
    label: {
      element: 'label',
      styles: 'text-[14px] font-medium leading-[1.4] text-[#1d1d1f]'
    },
    link: {
      element: 'a',
      styles: 'text-[16px] font-normal leading-[1.6] text-[#007aff] hover:text-[#0051d5] transition-colors'
    }
  };

  const colors = {
    default: '',
    white: 'text-white',
    whiteAlpha: 'text-white/80',
    whiteSecondary: 'text-white/60',
    black: 'text-black',
    gray: 'text-[#86868b]',
    lightGray: 'text-[#a1a1a6]',
    primary: 'text-[#007aff]',
    primaryHover: 'text-[#0051d5]',
    dark: 'text-[#1d1d1f]',
    darkAlpha: 'text-[#1d1d1f]/80'
  };

  const variantConfig = variants[variant] || variants.body;
  const ElementType = Component || variantConfig.element;

  return (
    <ElementType
      ref={ref}
      className={cn(
        'font-["Pretendard","-apple-system","BlinkMacSystemFont","system-ui","Roboto","Helvetica_Neue","Segoe_UI","sans-serif"]',
        variantConfig.styles,
        color !== 'default' && colors[color],
        className
      )}
      {...props}
    >
      {children}
    </ElementType>
  );
});

Typography.displayName = 'Typography';

export default Typography;