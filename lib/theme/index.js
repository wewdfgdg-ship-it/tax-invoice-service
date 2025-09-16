/**
 * REVU Business Center 테마 시스템
 * 중앙 집중식 테마 관리
 */

// 색상 팔레트
export const colors = {
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
  },
  overlays: {
    blackOpaque77: 'rgba(0, 0, 0, 0.77)',
    blackOpaque80: 'rgba(0, 0, 0, 0.8)'
  }
};

// 타이포그래피
export const typography = {
  fontFamily: {
    primary: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", sans-serif'
  },
  fontSize: {
    xs: '11px',
    sm: '12px',
    base: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '34px',
    '3xl': '55px'
  },
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700'
  },
  lineHeight: {
    tight: '1.1',
    normal: '1.43',
    relaxed: '1.5',
    loose: '1.75'
  }
};

// 간격 시스템
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px'
};

// 테두리 반경
export const borderRadius = {
  none: '0px',
  sm: '4px',
  md: '10px',
  lg: '20px',
  xl: '40px',
  full: '100px'
};

// 그림자
export const shadows = {
  sm: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  md: '0px 4px 10px rgba(0, 0, 0, 0.15)',
  lg: '0px 10px 30px rgba(0, 0, 0, 0.15)',
  xl: '0px 30px 70px rgba(0, 0, 0, 0.15)'
};

// 애니메이션
export const animations = {
  transition: {
    fast: '0.1s ease',
    normal: '0.3s ease',
    slow: '0.5s ease'
  }
};

// 브레이크포인트
export const breakpoints = {
  xs: '480px',
  sm: '640px',
  md: '768px',
  lg: '990px',
  xl: '1200px',
  '2xl': '1400px'
};

// 레이아웃
export const layout = {
  header: {
    height: '90px'
  },
  container: {
    maxWidth: '1200px',
    padding: '20px'
  }
};

// 전체 테마 객체
export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  animations,
  breakpoints,
  layout
};

// 컴포넌트별 표준화된 Props 타입
export const componentVariants = {
  // 버튼
  button: {
    variants: ['primary', 'secondary', 'dark'],
    sizes: ['sm', 'md', 'lg']
  },
  // 카드
  card: {
    variants: ['shadow', 'bordered']
  },
  // 타이포그래피
  typography: {
    variants: ['h1', 'h2', 'h3', 'h4', 'body', 'large', 'small'],
    colors: ['default', 'white', 'black', 'gray', 'lightGray', 'primary', 'green', 'blue']
  },
  // 컨테이너
  container: {
    maxWidths: ['default', 'sm', 'md', 'lg', 'xl', '2xl', 'full']
  },
  // 링크
  link: {
    variants: ['default', 'light']
  },
  // 캐러셀
  carousel: {
    variants: ['default', 'minimal']
  },
  // 로더
  loader: {
    variants: ['spinner', 'dots', 'pulse', 'bars'],
    sizes: ['xs', 'sm', 'md', 'lg', 'xl'],
    colors: ['primary', 'green', 'gray', 'white', 'black']
  }
};

// 유틸리티 함수들
export const themeUtils = {
  // 색상 가져오기
  getColor: (path) => {
    const keys = path.split('.');
    let result = colors;
    for (const key of keys) {
      result = result?.[key];
    }
    return result || '#000000';
  },
  
  // 반응형 breakpoint 체크
  getBreakpoint: (size) => {
    return `@media (min-width: ${breakpoints[size]})`;
  },
  
  // 간격 계산
  getSpacing: (multiplier = 1, base = 'md') => {
    const baseValue = parseInt(spacing[base]);
    return `${baseValue * multiplier}px`;
  }
};

export default theme;