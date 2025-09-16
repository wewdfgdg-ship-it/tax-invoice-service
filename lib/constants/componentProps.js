/**
 * 컴포넌트 Props 상수 및 타입 정의
 * 일관된 Props 패턴과 기본값 관리
 */

// 공통 사이즈 옵션
export const SIZES = {
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl'
};

// 공통 색상 옵션
export const COLORS = {
  PRIMARY: 'primary',
  GREEN: 'green',
  GRAY: 'gray',
  WHITE: 'white',
  BLACK: 'black',
  DEFAULT: 'default'
};

// Button 컴포넌트 상수
export const BUTTON_VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  DARK: 'dark'
};

export const BUTTON_SIZES = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg'
};

// Card 컴포넌트 상수
export const CARD_VARIANTS = {
  SHADOW: 'shadow',
  BORDERED: 'bordered'
};

// Typography 컴포넌트 상수
export const TYPOGRAPHY_VARIANTS = {
  H1: 'h1',
  H2: 'h2',
  H3: 'h3',
  H4: 'h4',
  BODY: 'body',
  LARGE: 'large',
  SMALL: 'small'
};

export const TYPOGRAPHY_COLORS = {
  DEFAULT: 'default',
  WHITE: 'white',
  BLACK: 'black',
  GRAY: 'gray',
  LIGHT_GRAY: 'lightGray',
  PRIMARY: 'primary',
  GREEN: 'green',
  BLUE: 'blue'
};

// Container 컴포넌트 상수
export const CONTAINER_MAX_WIDTHS = {
  DEFAULT: 'default',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
  '2XL': '2xl',
  FULL: 'full'
};

// Link 컴포넌트 상수
export const LINK_VARIANTS = {
  DEFAULT: 'default',
  LIGHT: 'light'
};

// Carousel 컴포넌트 상수
export const CAROUSEL_VARIANTS = {
  DEFAULT: 'default',
  MINIMAL: 'minimal'
};

// Loader 컴포넌트 상수
export const LOADER_VARIANTS = {
  SPINNER: 'spinner',
  DOTS: 'dots',
  PULSE: 'pulse',
  BARS: 'bars'
};

export const LOADER_SIZES = {
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl'
};

export const LOADER_COLORS = {
  PRIMARY: 'primary',
  GREEN: 'green',
  GRAY: 'gray',
  WHITE: 'white',
  BLACK: 'black'
};

// 기본값 설정
export const DEFAULT_PROPS = {
  button: {
    variant: BUTTON_VARIANTS.PRIMARY,
    size: BUTTON_SIZES.MD,
    disabled: false,
    type: 'button'
  },
  card: {
    variant: CARD_VARIANTS.SHADOW
  },
  typography: {
    variant: TYPOGRAPHY_VARIANTS.BODY,
    color: TYPOGRAPHY_COLORS.DEFAULT
  },
  container: {
    maxWidth: CONTAINER_MAX_WIDTHS.DEFAULT
  },
  link: {
    variant: LINK_VARIANTS.DEFAULT,
    underline: false,
    external: false
  },
  carousel: {
    variant: CAROUSEL_VARIANTS.DEFAULT,
    autoPlay: false,
    autoPlayInterval: 3000,
    showDots: true,
    showArrows: true,
    loop: true
  },
  loader: {
    variant: LOADER_VARIANTS.SPINNER,
    size: LOADER_SIZES.MD,
    color: LOADER_COLORS.PRIMARY
  },
  loadingOverlay: {
    isVisible: true,
    variant: LOADER_VARIANTS.SPINNER,
    size: LOADER_SIZES.LG,
    color: LOADER_COLORS.PRIMARY,
    text: '로딩 중...',
    backdrop: true
  },
  inlineLoader: {
    variant: LOADER_VARIANTS.DOTS,
    size: LOADER_SIZES.SM,
    color: LOADER_COLORS.GRAY
  }
};

// Props 검증 헬퍼
export const propValidators = {
  // 유효한 variant 체크
  isValidVariant: (variant, validVariants) => {
    return Object.values(validVariants).includes(variant);
  },
  
  // 유효한 size 체크
  isValidSize: (size, validSizes) => {
    return Object.values(validSizes).includes(size);
  },
  
  // 유효한 color 체크
  isValidColor: (color, validColors) => {
    return Object.values(validColors).includes(color);
  }
};

// 런타임에서 props 검증 (개발 환경에서만)
export const validateProps = (componentName, props, schema) => {
  if (process.env.NODE_ENV !== 'development') return;
  
  Object.keys(schema).forEach(key => {
    const validator = schema[key];
    const value = props[key];
    
    if (value !== undefined && validator && !validator.includes(value)) {
      console.warn(
        `[${componentName}] Invalid prop '${key}': '${value}'. Expected one of: ${validator.join(', ')}`
      );
    }
  });
};

// 컴포넌트별 props 스키마
export const COMPONENT_SCHEMAS = {
  Button: {
    variant: Object.values(BUTTON_VARIANTS),
    size: Object.values(BUTTON_SIZES)
  },
  Card: {
    variant: Object.values(CARD_VARIANTS)
  },
  Typography: {
    variant: Object.values(TYPOGRAPHY_VARIANTS),
    color: Object.values(TYPOGRAPHY_COLORS)
  },
  Container: {
    maxWidth: Object.values(CONTAINER_MAX_WIDTHS)
  },
  Link: {
    variant: Object.values(LINK_VARIANTS)
  },
  Carousel: {
    variant: Object.values(CAROUSEL_VARIANTS)
  },
  Loader: {
    variant: Object.values(LOADER_VARIANTS),
    size: Object.values(LOADER_SIZES),
    color: Object.values(LOADER_COLORS)
  }
};