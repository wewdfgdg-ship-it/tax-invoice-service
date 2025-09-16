import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names using clsx and merges Tailwind classes with tailwind-merge
 * @param {...string} inputs - Class names to combine
 * @returns {string} Combined and merged class string
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * 컴포넌트 Props 처리 및 기본값 적용
 * @param {Object} props - 전달받은 props
 * @param {Object} defaultProps - 기본값 객체
 * @returns {Object} 처리된 props
 */
export function withDefaults(props, defaultProps) {
  return { ...defaultProps, ...props };
}

/**
 * variant에 따른 스타일 클래스 생성
 * @param {Object} variants - variant별 스타일 매핑
 * @param {string} variant - 현재 variant
 * @param {string} fallback - 기본 variant
 * @returns {string} 스타일 클래스
 */
export function getVariantStyles(variants, variant, fallback = 'default') {
  return variants[variant] || variants[fallback] || '';
}

/**
 * 조건부 클래스 적용
 * @param {string} baseClass - 기본 클래스
 * @param {Object} conditions - 조건별 클래스 매핑
 * @returns {string} 최종 클래스
 */
export function conditionalClass(baseClass, conditions) {
  const conditionalClasses = Object.entries(conditions)
    .filter(([, condition]) => condition)
    .map(([className]) => className)
    .join(' ');
  
  return cn(baseClass, conditionalClasses);
}

/**
 * Theme constants from REVU Business Center
 */
export const theme = {
  colors: {
    primary: {
      purple: '#5E21D1',
      purpleDark: '#5C2AA4',
      green: '#3BD997',
      greenDark: '#2BCD74'
    },
    neutral: {
      black: '#000000',
      darkGray: '#222222',
      mediumGray: '#2B2B2B',
      gray: '#888888',
      lightGray: '#979797',
      veryLightGray: '#F0F0F0',
      offWhite: '#F4F5F8',
      white: '#FFFFFF'
    },
    accent: {
      blue: '#337AB7',
      cyan: '#1AD2DC',
      orange: '#FFB343',
      red: '#BF2600',
      redBright: '#EF4C47',
      pink: '#EE60FC'
    }
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px'
  },
  borderRadius: {
    none: '0px',
    sm: '4px',
    md: '10px',
    lg: '20px',
    xl: '40px',
    full: '100px'
  },
  shadows: {
    sm: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    md: '0px 4px 10px rgba(0, 0, 0, 0.15)',
    lg: '0px 10px 30px rgba(0, 0, 0, 0.15)',
    xl: '0px 30px 70px rgba(0, 0, 0, 0.15)'
  },
  breakpoints: {
    xs: '480px',
    sm: '640px',
    md: '768px',
    lg: '990px',
    xl: '1200px',
    '2xl': '1400px'
  }
};

/**
 * Utility function to format file sizes
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Debounce function for performance optimization
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function for performance optimization
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
export function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Generate unique ID
 * @param {string} prefix - Optional prefix for the ID
 * @returns {string} Unique ID
 */
export function generateId(prefix = 'id') {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}