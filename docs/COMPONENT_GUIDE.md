# 컴포넌트 사용 가이드

## 📋 개요

이 프로젝트는 **REVU 비즈니스 센터 테마**를 기반으로 한 완전 중앙화된 컴포넌트 시스템을 사용합니다. 모든 UI 요소는 일관된 패턴과 재사용 가능한 컴포넌트로 구성되어 있습니다.

## 🚀 빠른 시작

### 기본 Import 패턴
```jsx
// ✅ 권장: 중앙 집중식 import
import { Button, Card, Typography, Container } from '../components/ui';

// ✅ 개별 import (필요시)
import Button from '../components/ui/Button';
import { LoadingOverlay } from '../components/ui/Loader';
```

### 표준 페이지 구조
```jsx
import { Container, Typography, Card, Button } from '../components/ui';

export default function ExamplePage() {
  return (
    <Container className="py-20">
      <Typography variant="h1" className="mb-6">
        페이지 제목
      </Typography>
      
      <Card variant="shadow">
        <Typography variant="body" className="mb-4">
          페이지 내용...
        </Typography>
        
        <Button variant="primary" size="md">
          주요 액션
        </Button>
      </Card>
    </Container>
  );
}
```

## 📚 컴포넌트 상세 가이드

### 1. Button
완전 일반화된 버튼 컴포넌트

```jsx
import { Button } from '../components/ui';

// 기본 사용
<Button>클릭하기</Button>

// 모든 옵션 활용
<Button 
  variant="primary" // 'primary' | 'secondary' | 'dark'
  size="md"         // 'sm' | 'md' | 'lg'
  disabled={false}
  onClick={handleClick}
  type="button"     // 'button' | 'submit' | 'reset'
>
  버튼 텍스트
</Button>

// 상수를 통한 타입 안전성
<Button variant={Button.variants.PRIMARY} size={Button.sizes.LG}>
  타입 안전한 버튼
</Button>
```

### 2. Card
컨테이너 및 콘텐츠 래퍼

```jsx
import { Card } from '../components/ui';

// 그림자 카드 (기본)
<Card variant="shadow">
  <h3>카드 제목</h3>
  <p>카드 내용</p>
</Card>

// 테두리 카드
<Card variant="bordered">
  <p>미니멀한 카드</p>
</Card>
```

### 3. Typography
모든 텍스트 요소

```jsx
import { Typography } from '../components/ui';

// 제목들
<Typography variant="h1">메인 제목</Typography>
<Typography variant="h2">대형 제목</Typography>
<Typography variant="h3">중형 제목</Typography>
<Typography variant="h4">소형 제목</Typography>

// 본문 텍스트
<Typography variant="body" color="gray">
  기본 본문 텍스트
</Typography>

<Typography variant="large">큰 본문</Typography>
<Typography variant="small" color="lightGray">작은 텍스트</Typography>

// HTML 태그 오버라이드
<Typography variant="body" as="span">
  인라인 텍스트
</Typography>
```

### 4. Container
반응형 레이아웃 컨테이너

```jsx
import { Container } from '../components/ui';

// 기본 컨테이너 (1200px 최대폭)
<Container>
  <p>중앙 정렬된 콘텐츠</p>
</Container>

// 다양한 크기
<Container maxWidth="sm">작은 컨테이너</Container>
<Container maxWidth="xl">큰 컨테이너</Container>
<Container maxWidth="full">전체폭 컨테이너</Container>
```

### 5. Link
네비게이션 및 링크

```jsx
import { Link } from '../components/ui';

// 내부 링크
<Link href="/about" variant="default">
  회사 소개
</Link>

// 외부 링크
<Link href="https://example.com" external>
  외부 사이트
</Link>

// 어두운 배경용
<div className="bg-gray-800 p-4">
  <Link href="/contact" variant="light">
    연락처
  </Link>
</div>

// 밑줄 옵션
<Link href="/terms" underline>
  이용약관
</Link>
```

### 6. Carousel
이미지/콘텐츠 슬라이더

```jsx
import { Carousel } from '../components/ui';

// 기본 캐러셀 (자동재생, 화살표, 도트)
<Carousel 
  variant="default" 
  autoPlay={true} 
  autoPlayInterval={4000}
  showDots={true}
  showArrows={true}
  loop={true}
>
  <div>슬라이드 1</div>
  <div>슬라이드 2</div>
  <div>슬라이드 3</div>
</Carousel>

// 미니멀 캐러셀
<Carousel variant="minimal" autoPlay={false}>
  <img src="/slide1.jpg" alt="이미지 1" />
  <img src="/slide2.jpg" alt="이미지 2" />
</Carousel>
```

### 7. Loader
로딩 상태 표시

```jsx
import { Loader, LoadingOverlay, InlineLoader } from '../components/ui';

// 기본 로더들
<Loader variant="spinner" size="md" color="primary" />
<Loader variant="dots" size="lg" text="로딩 중..." />
<Loader variant="pulse" color="green" />
<Loader variant="bars" size="sm" />

// 전체 화면 오버레이
<LoadingOverlay 
  isVisible={loading}
  variant="spinner"
  size="lg"
  text="데이터를 불러오는 중..."
  backdrop={true}
/>

// 인라인 로더
<div className="flex items-center gap-2">
  <InlineLoader variant="dots" size="sm" color="primary" />
  <span>저장 중...</span>
</div>
```

## 🎨 테마 시스템 활용

### 테마 상수 사용
```jsx
import { theme, colors } from '../lib/theme';

// CSS-in-JS에서 테마 값 사용
const styles = {
  backgroundColor: colors.primary.purple,
  color: colors.neutral.white,
  padding: theme.spacing.lg,
  borderRadius: theme.borderRadius.md
};

// CSS 변수로 사용
<div style={{ 
  backgroundColor: 'var(--color-primary-purple)',
  padding: 'var(--spacing-lg)' 
}}>
  테마 기반 스타일링
</div>
```

### 유틸리티 함수 활용
```jsx
import { themeUtils } from '../lib/theme';

// 색상 가져오기
const primaryColor = themeUtils.getColor('primary.purple');

// 반응형 스타일
const mediaQuery = themeUtils.getBreakpoint('md');

// 간격 계산
const doubleSpacing = themeUtils.getSpacing(2, 'lg'); // 48px
```

## 🔧 고급 사용법

### Props 상수 활용
```jsx
import { BUTTON_VARIANTS, LOADER_COLORS } from '../lib/constants/componentProps';

// 타입 안전성과 자동완성
<Button variant={BUTTON_VARIANTS.PRIMARY}>
  타입 안전한 버튼
</Button>

<Loader color={LOADER_COLORS.GREEN} variant="spinner" />
```

### 커스텀 훅 사용
```jsx
import { useComponentDefaults } from '../components/hooks/useComponentDefaults';

function MyComponent(props) {
  // 자동으로 기본값 적용
  const buttonProps = useComponentDefaults('button', props.buttonProps);
  
  return <Button {...buttonProps}>커스텀 컴포넌트</Button>;
}
```

### 조건부 스타일링
```jsx
import { conditionalClass } from '../lib/utils';

const buttonClass = conditionalClass('base-button', {
  'button-loading': isLoading,
  'button-success': isSuccess,
  'button-error': hasError
});
```

## 📱 반응형 디자인

모든 컴포넌트는 반응형으로 설계되었습니다:

```jsx
// 반응형 Typography
<Typography 
  variant="h1" 
  className="text-2xl md:text-4xl lg:text-6xl"
>
  반응형 제목
</Typography>

// 반응형 Container
<Container className="px-4 md:px-8 lg:px-12">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {/* 반응형 그리드 */}
  </div>
</Container>
```

## ⚡ 성능 최적화

### 지연 로딩
```jsx
import { lazy, Suspense } from 'react';
import { Loader } from '../components/ui';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<Loader variant="spinner" text="컴포넌트 로딩 중..." />}>
      <HeavyComponent />
    </Suspense>
  );
}
```

### 메모이제이션
```jsx
import { memo } from 'react';
import { Button } from '../components/ui';

const OptimizedButton = memo(({ children, ...props }) => {
  return <Button {...props}>{children}</Button>;
});
```

## 🛠️ 확장 가이드

### 새 Variant 추가
```jsx
// lib/constants/componentProps.js에 추가
export const BUTTON_VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  DARK: 'dark',
  OUTLINE: 'outline' // 새 variant
};

// Button.js에서 스타일 추가
const variants = {
  // ... 기존 variants
  [BUTTON_VARIANTS.OUTLINE]: 'bg-transparent border-2 border-current text-current hover:bg-current hover:text-white'
};
```

### 새 컴포넌트 생성
```jsx
// components/ui/NewComponent.js
import { forwardRef } from 'react';
import { cn, withDefaults } from '../../lib/utils';

const NewComponent = forwardRef(({ className, variant = 'default', ...props }, ref) => {
  return (
    <div 
      ref={ref}
      className={cn('base-styles', variants[variant], className)}
      {...props}
    />
  );
});

NewComponent.displayName = 'NewComponent';
export default NewComponent;

// components/ui/index.js에 추가
export { default as NewComponent } from './NewComponent';
```

## 🚨 주의사항

### 금지된 패턴
```jsx
// ❌ 절대 하지 말 것
<div className="bg-blue-500 p-4 rounded-lg">직접 스타일링</div>
<button style={{ backgroundColor: '#5E21D1' }}>인라인 스타일</button>

// ✅ 올바른 방법
<Card variant="shadow">
  <Button variant="primary">컴포넌트 사용</Button>
</Card>
```

### 디버깅 팁
```jsx
// 개발 환경에서 props 검증 활성화
<Button variant="invalid-variant"> // 콘솔 경고 출력
```

## 📊 성능 모니터링

컴포넌트 성능은 다음과 같이 모니터링할 수 있습니다:

```jsx
import { Profiler } from 'react';

function onRenderCallback(id, phase, actualDuration) {
  console.log('Component:', id, 'Phase:', phase, 'Duration:', actualDuration);
}

<Profiler id="ButtonComponent" onRender={onRenderCallback}>
  <Button variant="primary">성능 모니터링</Button>
</Profiler>
```

---

**이 가이드를 통해 일관되고 효율적인 컴포넌트 개발이 가능합니다. 추가 질문이나 개선 사항이 있으면 언제든 문의해주세요!** 🎯