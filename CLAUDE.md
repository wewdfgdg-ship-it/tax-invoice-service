# 프로젝트 개발 규칙 (CLAUDE.md)

## 필수 사항: 재사용 가능한 컴포넌트 시스템

이 프로젝트는 **Apple Design System**을 기반으로 한 **통합 디자인 시스템**을 사용합니다.

### 🚨 강제 규칙: UI 컴포넌트 사용

**절대 원칙**: 모든 UI 요소는 `/components/ui/` 폴더의 기존 컴포넌트를 **반드시** 사용해야 합니다.

#### 1. 버튼 (Button)
```jsx
// ✅ 올바른 사용
import Button from '../components/ui/Button';
<Button variant="primary" size="md">클릭하기</Button>
<Button variant="glass" size="md" icon="→" iconPosition="right">다음</Button>

// ❌ 금지된 사용
<button className="bg-blue-500 px-4 py-2">클릭하기</button>
```

**사용 가능한 Props:**
- `variant`: "primary" | "secondary" | "dark" | "text" | "glass"
- `size`: "xs" | "sm" | "md" | "lg" | "xl"
- `icon`: ReactNode (아이콘 컴포넌트)
- `iconPosition`: "left" | "right"
- `disabled`: boolean
- 모든 기본 button props 지원

#### 2. 카드 (Card)
```jsx
// ✅ 올바른 사용
import Card from '../components/ui/Card';
<Card variant="default" padding="default">내용</Card>
<Card variant="glass" padding="lg">유리 효과 카드</Card>

// ❌ 금지된 사용
<div className="bg-white rounded-lg shadow-lg p-6">내용</div>
```

**사용 가능한 Props:**
- `variant`: "default" | "bordered" | "glass" | "dark" | "flat" | "hover"
- `padding`: "none" | "sm" | "default" | "lg" | "xl"

#### 3. 타이포그래피 (Typography)
```jsx
// ✅ 올바른 사용
import Typography from '../components/ui/Typography';
<Typography variant="display" color="dark">디스플레이 제목</Typography>
<Typography variant="h1">제목</Typography>
<Typography variant="body" color="gray">본문</Typography>

// ❌ 금지된 사용
<h1 className="text-2xl font-bold">제목</h1>
<p className="text-gray-500">본문</p>
```

**사용 가능한 Props:**
- `variant`: "display" | "displayLarge" | "h1-h6" | "body" | "bodyLarge" | "bodySmall" | "caption" | "footnote" | "label" | "link"
- `color`: "default" | "white" | "whiteAlpha" | "whiteSecondary" | "black" | "gray" | "lightGray" | "primary" | "primaryHover" | "dark" | "darkAlpha"
- `weight`: "light" | "normal" | "medium" | "semibold" | "bold"
- `align`: "left" | "center" | "right" | "justify"
- `as`: 원하는 HTML 엘리먼트로 오버라이드

#### 4. 컨테이너 (Container)
```jsx
// ✅ 올바른 사용
import Container from '../components/ui/Container';
<Container maxWidth="lg" padding="responsive">내용</Container>

// ❌ 금지된 사용
<div className="max-w-6xl mx-auto px-4">내용</div>
```

**사용 가능한 Props:**
- `maxWidth`: "sm"(734px) | "md"(1068px) | "lg"(1440px) | "xl" | "2xl" | "default" | "full" | "none"
- `padding`: "none" | "sm" | "default" | "lg" | "responsive"
- `center`: boolean (중앙 정렬)

#### 5. 링크 (Link)
```jsx
// ✅ 올바른 사용
import Link from '../components/ui/Link';
<Link href="/page" variant="default" color="primary">링크</Link>
<Link href="https://apple.com" external>외부 링크</Link>

// ❌ 금지된 사용
<a href="/page" className="text-blue-500 hover:underline">링크</a>
```

**사용 가능한 Props:**
- `variant`: "default" | "nav" | "footer" | "inline" | "button"
- `color`: "default" | "primary" | "white" | "whiteAlpha" | "gray" | "dark"
- `underline`: boolean
- `external`: boolean (외부 링크용)

#### 6. 그리드 (Grid)
```jsx
// ✅ 올바른 사용
import { Grid, GridItem } from '../components/ui/Grid';
<Grid cols={12} gap="default">
  <GridItem span={6}>왼쪽</GridItem>
  <GridItem span={6}>오른쪽</GridItem>
</Grid>

// ❌ 금지된 사용
<div className="grid grid-cols-12 gap-5">...</div>
```

**Grid Props:**
- `cols`: 1-12 | "auto"
- `gap`: "none" | "xs" | "sm" | "default" | "md" | "lg" | "xl"

**GridItem Props:**
- `span`: 1-12 | "full"
- `spanSm`, `spanMd`, `spanLg`: 반응형 span 값
- `start`, `end`: 그리드 위치 지정

#### 7. 로더 (Loader)
```jsx
// ✅ 올바른 사용
import Loader, { LoadingOverlay, InlineLoader } from '../components/ui/Loader';
<Loader variant="spinner" size="md" color="primary" text="로딩 중..." />
<LoadingOverlay isVisible={loading} text="데이터 불러오는 중..." blur={true} />
<InlineLoader variant="dots" text="저장 중" />

// ❌ 금지된 사용
<div className="animate-spin w-6 h-6 border-2 border-blue-500"></div>
```

**Loader Props:**
- `variant`: "spinner" | "dots" | "pulse" | "bars"
- `size`: "xs" | "sm" | "md" | "lg" | "xl"
- `color`: "primary" | "gray" | "white" | "dark"
- `text`: string (선택사항)

**LoadingOverlay Props:**
- `isVisible`: boolean
- `text`: string
- `blur`: boolean (백드롭 블러)
- `opacity`: number (0-1)

#### 8. 배지 (Badge)
```jsx
// ✅ 올바른 사용
import Badge from '../components/ui/Badge';
<Badge variant="default" color="primary" size="default">New</Badge>
<Badge variant="dot" color="success" /> // 상태 표시용 점

// ❌ 금지된 사용
<span className="bg-blue-500 text-white px-2 py-1 rounded">New</span>
```

**사용 가능한 Props:**
- `variant`: "default" | "pill" | "square" | "dot"
- `size`: "xs" | "sm" | "default" | "lg"
- `color`: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | "dark" | "light"

#### 9. 구분선 (Divider)
```jsx
// ✅ 올바른 사용
import Divider from '../components/ui/Divider';
<Divider variant="default" spacing="default" />

// ❌ 금지된 사용
<hr className="border-gray-200 my-8" />
```

**사용 가능한 Props:**
- `variant`: "default" | "light" | "dark" | "primary"
- `orientation`: "horizontal" | "vertical"
- `spacing`: "none" | "sm" | "default" | "lg"

### 🎨 강제 규칙: Apple 테마 시스템

#### 색상 시스템 사용 강제
```css
/* ✅ 올바른 사용 */
.custom-element {
  color: rgb(0, 113, 227); /* Apple Blue */
  background: rgb(245, 245, 247); /* Apple Gray Background */
  backdrop-filter: blur(20px); /* Glass Effect */
}

/* ❌ 금지된 사용 */
.custom-element {
  color: #0071E3; /* HEX 색상 사용 금지 */
  background: white;
  font-family: 'Arial'; /* 시스템 폰트 외 사용 금지 */
}
```

#### Apple 색상 팔레트 준수
- **Primary**: `rgb(0, 113, 227)` (Apple Blue), `rgb(0, 102, 204)` (Hover Blue)
- **Dark**: `rgb(22, 22, 23)`, `rgba(22, 22, 23, 0.8)` (Glass)
- **Light**: `rgb(245, 245, 247)` (Background), `rgb(232, 232, 237)` (Border)
- **Text**: `rgb(29, 29, 31)` (Primary), `rgb(134, 134, 139)` (Secondary)
- **White**: `rgba(255, 255, 255, 0.92)`, `rgba(255, 255, 255, 0.8)`

#### 폰트 시스템
- **Primary Font**: SF Pro Text, SF Pro Display
- **Fallback**: -apple-system, BlinkMacSystemFont, 'Apple Gothic', 'HY Gulim', MalgunGothic, 'Helvetica Neue', Arial, sans-serif
- **Font Sizes**: 10px, 11px, 12px, 14px, 17px, 19px, 21px, 24px, 28px, 34px, 40px, 53px, 56px
- **Font Weights**: 300(light), 400(normal), 500(medium), 600(semibold), 700(bold)

#### 애니메이션 시스템
- **Transition**: `all 240ms cubic-bezier(0.4, 0, 0.6, 1)`
- **Fast**: 180ms, **Normal**: 240ms, **Slow**: 320ms
- **Easing**: `cubic-bezier(0.4, 0, 0.6, 1)` (default)
- **Glass Effect**: `backdrop-filter: blur(20px)`

### 📦 컴포넌트 확장 규칙

#### 새 컴포넌트 생성 시
1. **기존 컴포넌트 조합 우선**: 새 컴포넌트 만들기 전에 기존 컴포넌트 조합으로 해결 가능한지 확인
2. **일관성 유지**: 새 컴포넌트도 동일한 패턴(variant, size, color props) 적용
3. **forwardRef 패턴**: 모든 새 컴포넌트는 `forwardRef`로 작성
4. **TypeScript 지원**: Props 타입 정의 필수

#### 컴포넌트 수정 시
```jsx
// ✅ 올바른 확장
const Button = forwardRef(({ 
  variant = 'primary',
  size = 'md', 
  icon, // 새 prop 추가
  ...props 
}, ref) => {
  // 기존 스타일 시스템 유지하며 확장
});

// ❌ 금지된 수정 
const Button = ({ className }) => (
  <button className={className} /> // 기존 variant 시스템 무시
);
```

### 🛠️ 개발 워크플로우

#### 1. UI 작업 시작 전 체크리스트
- [ ] `/components` 데모 페이지에서 기존 컴포넌트 확인
- [ ] 필요한 컴포넌트가 이미 있는지 검토
- [ ] 기존 컴포넌트 조합으로 구현 가능한지 판단

#### 2. 컴포넌트 import 규칙
```jsx
// ✅ 표준 import 패턴
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Typography from '../components/ui/Typography';
import Container from '../components/ui/Container';
import Link from '../components/ui/Link';
import { Grid, GridItem } from '../components/ui/Grid';
import Badge from '../components/ui/Badge';
import Divider from '../components/ui/Divider';
import Loader, { LoadingOverlay, InlineLoader } from '../components/ui/Loader';
```

#### 3. 페이지 구조 템플릿
```jsx
import Container from '../components/ui/Container';
import Typography from '../components/ui/Typography';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Grid, GridItem } from '../components/ui/Grid';

export default function ExamplePage() {
  return (
    <>
      {/* Apple Style Navigation */}
      <nav className="fixed top-0 left-0 right-0 h-[44px] bg-[rgba(22,22,23,0.8)] backdrop-blur-xl z-50">
        <Container maxWidth="lg" padding="responsive">
          <Typography variant="bodySmall" color="whiteAlpha">
            네비게이션
          </Typography>
        </Container>
      </nav>
      
      {/* Main Content */}
      <main className="pt-[44px]">
        <Container maxWidth="lg" padding="responsive" className="py-[88px]">
          <Typography variant="display" className="mb-6">
            페이지 제목
          </Typography>
          
          <Grid cols={12} gap="default">
            <GridItem span={12} spanMd={8}>
              <Card variant="default" padding="default">
                <Typography variant="body" className="mb-4">
                  내용...
                </Typography>
                
                <Button variant="primary" size="md">
                  액션 버튼
                </Button>
              </Card>
            </GridItem>
          </Grid>
        </Container>
      </main>
    </>
  );
}
```

### 🚫 금지 사항

#### 절대 하지 말 것
1. **인라인 스타일 사용 금지**
   ```jsx
   // ❌ 절대 금지
   <div style={{ color: '#5E21D1', padding: '20px' }}>
   ```

2. **Tailwind 직접 사용 제한**
   ```jsx
   // ❌ 기존 컴포넌트 대체 금지
   <div className="bg-white rounded-lg shadow-lg p-6"> // Card 대신
   <button className="bg-blue-500 px-4 py-2 rounded"> // Button 대신
   ```

3. **외부 UI 라이브러리 금지**
   - Material-UI, Ant Design, Bootstrap 등 금지
   - 기존 컴포넌트 시스템과 충돌 방지

4. **하드코딩된 색상값 금지**
   ```jsx
   // ❌ 금지
   backgroundColor: '#5E21D1'
   
   // ✅ 허용
   backgroundColor: 'var(--color-primary-purple)'
   ```

### 📋 컴포넌트 데모 및 문서

- **데모 페이지**: http://localhost:3001/components
- **사용법 확인**: 각 컴포넌트별 실시간 예제 제공
- **Props 문서**: 데모 페이지에서 사용 가능한 모든 props 확인
- **Apple 디자인 가이드라인**: 일관된 spacing, typography, color 시스템 적용

### 🔄 지속적 개선

#### 컴포넌트 피드백 및 개선
1. **사용성 문제 발견 시**: 컴포넌트 자체를 개선하여 모든 곳에서 혜택
2. **새로운 variant 필요 시**: 기존 컴포넌트에 추가
3. **성능 최적화**: 중앙화된 컴포넌트에서 한 번에 개선

---

## ⚖️ 강제성 보장

**이 규칙은 선택사항이 아닙니다.** 

- 모든 PR에서 컴포넌트 사용 규칙 준수 필수
- 인라인 스타일이나 하드코딩된 UI 발견 시 즉시 리팩토링
- 새 기능 개발 시 반드시 기존 컴포넌트 우선 검토

**목표**: Apple의 미니멀하고 우아한 디자인 철학 구현, 일관된 사용자 경험, 유지보수성 향상, 개발 효율성 극대화

### 🍎 Apple Design System 핵심 원칙

1. **Clarity (명확성)**: 텍스트는 읽기 쉽고, 아이콘은 명확하며, 장식은 절제되어 기능에 집중
2. **Deference (존중)**: 콘텐츠가 화면을 채우며, 반투명과 블러를 통해 계층 구조 표현
3. **Depth (깊이)**: 레이어와 현실적인 모션으로 계층 구조를 이해하고 상호작용을 즐겁게 만듦

---

## 🍌 나노바나나 이미지 생성 MCP 서버 개발 가이드

### 📖 개요
Claude Code에서 사용할 Gemini 2.5 Flash Image 기반 이미지 생성 MCP(Model Context Protocol) 서버 개발 지침입니다.

### 🔧 기술 스택
- **AI 모델**: `gemini-2.5-flash-image-preview`
- **Python SDK**: `google-genai` (공식 Python SDK)  
- **MCP 프레임워크**: `fastmcp`
- **이미지 처리**: `PIL (Pillow)`
- **환경 변수**: `GOOGLE_API_KEY`

### 🛠️ 필수 구현 도구 (Tools)

#### 1. `generate_image` - 텍스트→이미지 생성
```python
@mcp.tool()
def generate_image(prompt: str, temperature: Optional[float] = None, safety: Optional[dict] = None) -> dict:
    """
    텍스트 프롬프트로 이미지 생성
    
    Args:
        prompt: 이미지 생성 프롬프트
        temperature: 창의성 조절 (0.0-1.0)
        safety: 안전 설정 {"category": "...", "threshold": "..."}
    
    Returns:
        {"images": ["file://path1", "file://path2"], "meta": {...}}
    """
```

#### 2. `edit_image` - 이미지 편집
```python
@mcp.tool()
def edit_image(prompt: str, image_path: str, temperature: Optional[float] = None, safety: Optional[dict] = None) -> dict:
    """
    기존 이미지를 프롬프트로 편집
    
    Args:
        prompt: 편집 지시사항
        image_path: 원본 이미지 경로
        temperature: 창의성 조절
        safety: 안전 설정
    
    Returns:
        {"images": ["file://edited_image"], "meta": {...}}
    """
```

#### 3. `compose_images` - 다중 이미지 합성
```python
@mcp.tool()  
def compose_images(prompt: str, image_paths: List[str]) -> dict:
    """
    여러 이미지를 합성하여 새 이미지 생성
    
    Args:
        prompt: 합성 지시사항 (옵션)
        image_paths: 합성할 이미지들의 경로 배열
    
    Returns:
        {"images": ["file://composed_image"], "meta": {...}}
    """
```

#### 4. `list_models` - 사용 가능 모델 목록
```python
@mcp.tool()
def list_models() -> List[str]:
    """사용 가능한 이미지 생성 모델 목록 반환"""
    return ["gemini-2.5-flash-image-preview"]
```

### 🏗️ 권장 프로젝트 구조
```
나노바나나-MCP/
├── server.py              # 메인 MCP 서버
├── requirements.txt       # 종속성 (fastmcp, google-genai, pillow)
├── .env.example          # 환경변수 템플릿
├── _out/                 # 생성된 이미지 출력 폴더
├── config/
│   ├── __init__.py
│   ├── safety.py         # 안전 설정 관리
│   └── models.py         # 모델 설정
├── tools/
│   ├── __init__.py
│   ├── generate.py       # 이미지 생성 도구
│   ├── edit.py          # 이미지 편집 도구
│   └── compose.py       # 이미지 합성 도구
├── utils/
│   ├── __init__.py
│   ├── image_handler.py  # 이미지 저장/처리
│   └── gemini_client.py  # Gemini API 클라이언트
└── README.md            # 설치 및 사용 가이드
```

### 📋 구현 필수 사항

#### 1. 이미지 저장 및 URI 반환
- 생성된 이미지는 `_out/` 폴더에 UUID 기반 파일명으로 저장
- 대용량 base64 데이터 대신 `file://` URI로 반환
- 파일 보존 정책 및 정리 스케줄 구현

```python
def _save_image_bytes(b: bytes) -> str:
    """이미지 바이트를 파일로 저장하고 URI 반환"""
    fn = OUT_DIR / f"{uuid.uuid4().hex}.png" 
    with open(fn, "wb") as f: 
        f.write(b)
    return fn.resolve().as_uri()
```

#### 2. 안전 설정 매핑
```python
def _cfg(temperature: Optional[float], safety: Optional[dict]):
    """Gemini API 설정 생성"""
    cfg = {}
    if temperature is not None:
        cfg["temperature"] = float(temperature)
    if safety and safety.get("category") and safety.get("threshold"):
        cfg["safety_settings"] = [types.SafetySetting(
            category=safety["category"], 
            threshold=safety["threshold"]
        )]
    return types.GenerateContentConfig(**cfg) if cfg else None
```

#### 3. Claude Code 연동 설정
```bash
# CLI를 통한 MCP 서버 추가
claude mcp add --scope project nano-banana-mcp python server.py

# 또는 JSON 설정
claude mcp add-json nano-banana-mcp '{
  "type": "stdio",
  "command": "python", 
  "args": ["server.py"],
  "env": { "GOOGLE_API_KEY": "${GOOGLE_API_KEY}" }
}'
```

### 🎯 프롬프트 최적화 가이드

#### 이미지 생성 프롬프트 패턴
```python
# 제품 사진 스타일
"Ultra-realistic product shot on glossy black acrylic, professional lighting"

# 미니멀 스타일  
"Minimal, violet studio lighting, miniature 'nano banana' dessert on glass plate, 3:2 aspect"

# 일러스트 스타일
"Flat design illustration, vibrant colors, modern UI style"
```

#### 이미지 편집 프롬프트 패턴
```python
# 배경 변경
"Replace background with soft studio lights; add gentle star sparkle above"

# 색상/텍스처 변경
"Change color scheme to warm autumn tones, add vintage texture overlay"

# 스타일 전송
"Preserve content composition; adopt watercolor painting style with soft edges"
```

### ⚙️ 운영 모범 사례

#### 1. 성능 최적화
- 제품 사진: `temperature ≤ 0.3` (일관성 중시)
- 창작 이미지: `temperature 0.6-0.9` (창의성 중시)
- 반복 개선: 같은 프롬프트에 작은 변화 추가

#### 2. 안전 및 정책
- SynthID 워터마크 자동 삽입 (제거 불가)
- 금지된 콘텐츠 필터링 설정
- 안전 임계값을 설정 가능하게 구성

#### 3. 저장소 관리
- 기본 출력 경로: `_out/`
- 환경변수 `NB_MCP_OUT`으로 변경 가능
- 오래된 파일 자동 정리 스케줄 구현

#### 4. 에러 처리
- API 할당량 초과 시 대기/재시도 로직
- 네트워크 오류 시 graceful 실패 처리
- 잘못된 이미지 형식 처리

### 📚 참조 문서 링크

**Gemini API 공식 문서**
- 이미지 생성: https://ai.google.dev/gemini-api/docs/image-generation
- 모델 목록: https://ai.google.dev/gemini-api/docs/models
- Python SDK: https://googleapis.github.io/python-genai/
- 안전 설정: https://ai.google.dev/gemini-api/docs/safety-settings

**MCP 관련 문서**
- MCP 소개: https://modelcontextprotocol.io/
- Claude Code MCP: https://docs.anthropic.com/en/docs/claude-code/mcp
- FastMCP: https://github.com/jlowin/fastmcp

### 🚨 개발 시 주의사항

1. **API 키 보안**: 환경변수로만 관리, 코드에 하드코딩 금지
2. **미리보기 모델**: `gemini-2.5-flash-image-preview`는 변경 가능성 있음
3. **타이포그래피**: 텍스트 렌더링 정확도 보장되지 않음
4. **워터마크**: 모든 생성 이미지에 SynthID 워터마크 포함
5. **할당량 관리**: Preview 모델은 더 엄격한 사용 제한 가능성

### 🎯 구현 우선순위

**Phase 1 (필수)**
- ✅ 기본 텍스트→이미지 생성
- ✅ 파일 저장 및 URI 반환 시스템
- ✅ Claude Code MCP 연동

**Phase 2 (고급 기능)** 
- 🔄 이미지 편집 기능
- 🎨 다중 이미지 합성
- 🔒 안전 설정 관리 시스템

**Phase 3 (최적화)**
- ⚡ 성능 최적화 및 캐싱
- 📊 사용량 모니터링
- 📝 상세 문서화 및 예제