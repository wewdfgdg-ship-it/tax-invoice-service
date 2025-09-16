// UI 컴포넌트 중앙 집중식 Export
// 모든 UI 컴포넌트는 이 파일을 통해 import

// Core Components
export { default as Button } from './Button';
export { default as Card } from './Card';
export { default as Typography } from './Typography';
export { default as Container } from './Container';
export { default as Link } from './Link';

// Interactive Components
export { default as Carousel } from './Carousel';

// Feedback Components
export { default as Loader } from './Loader';
export { LoadingOverlay, InlineLoader } from './Loader';

// 사용법:
// import { Button, Card, Typography } from '../components/ui';
// import { Loader, LoadingOverlay } from '../components/ui';

/**
 * 컴포넌트 사용 가이드
 * 
 * 1. 모든 UI 컴포넌트는 이 인덱스를 통해 import
 * 2. 개별 import 대신 배치 import 권장
 * 3. 일관된 Props 패턴 (variant, size, color) 준수
 * 4. forwardRef 패턴으로 ref 전달 지원
 */