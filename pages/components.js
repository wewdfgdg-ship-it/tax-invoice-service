import { useState } from 'react';
// 중앙 집중식 import 사용
import { 
  Button, 
  Card, 
  Typography, 
  Container, 
  Link, 
  Carousel, 
  Loader, 
  LoadingOverlay, 
  InlineLoader 
} from '../components/ui';

export default function ComponentsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [showOverlay, setShowOverlay] = useState(false);

  const categories = [
    { id: 'all', name: '전체' },
    { id: 'buttons', name: '버튼' },
    { id: 'cards', name: '카드' },
    { id: 'carousel', name: '캐러셀' },
    { id: 'loaders', name: '로더' },
    { id: 'typography', name: '타이포그래피' },
    { id: 'links', name: '링크' },
    { id: 'layout', name: '레이아웃' }
  ];

  return (
    <Container className="py-20">
      <div className="mb-12">
        <Typography variant="h1" className="mb-4">
          컴포넌트 데모
        </Typography>
        <Typography variant="body" color="gray">
          MIBLE 비즈니스 센터 테마를 기반으로 한 재사용 가능한 컴포넌트들입니다.
        </Typography>
      </div>

      {/* 카테고리 필터 */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* 버튼 섹션 */}
      {(selectedCategory === 'all' || selectedCategory === 'buttons') && (
        <section className="mb-16">
          <Typography variant="h2" className="mb-6">
            버튼 (Buttons)
          </Typography>
          <Card>
            <div className="space-y-6">
              <div>
                <Typography variant="h3" className="mb-4">Primary 버튼</Typography>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary" size="sm">Small</Button>
                  <Button variant="primary" size="md">Medium</Button>
                  <Button variant="primary" size="lg">Large</Button>
                  <Button variant="primary" disabled>Disabled</Button>
                </div>
              </div>
              
              <div>
                <Typography variant="h3" className="mb-4">Secondary 버튼</Typography>
                <div className="flex flex-wrap gap-4">
                  <Button variant="secondary" size="sm">Small</Button>
                  <Button variant="secondary" size="md">Medium</Button>
                  <Button variant="secondary" size="lg">Large</Button>
                  <Button variant="secondary" disabled>Disabled</Button>
                </div>
              </div>

              <div>
                <Typography variant="h3" className="mb-4">Dark 버튼</Typography>
                <div className="flex flex-wrap gap-4">
                  <Button variant="dark" size="sm">Small</Button>
                  <Button variant="dark" size="md">Medium</Button>
                  <Button variant="dark" size="lg">Large</Button>
                  <Button variant="dark" disabled>Disabled</Button>
                </div>
              </div>
            </div>
          </Card>
        </section>
      )}

      {/* 카드 섹션 */}
      {(selectedCategory === 'all' || selectedCategory === 'cards') && (
        <section className="mb-16">
          <Typography variant="h2" className="mb-6">
            카드 (Cards)
          </Typography>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card variant="shadow">
              <Typography variant="h3" className="mb-4">그림자 카드</Typography>
              <Typography variant="body" color="gray" className="mb-4">
                기본 그림자 효과가 적용된 카드입니다. 일반적인 콘텐츠 표시에 사용됩니다.
              </Typography>
              <Button variant="primary" size="sm">자세히 보기</Button>
            </Card>

            <Card variant="bordered">
              <Typography variant="h3" className="mb-4">테두리 카드</Typography>
              <Typography variant="body" color="gray" className="mb-4">
                테두리만 있는 깔끔한 카드입니다. 미니멀한 디자인에 적합합니다.
              </Typography>
              <Button variant="secondary" size="sm">자세히 보기</Button>
            </Card>
          </div>
        </section>
      )}

      {/* 타이포그래피 섹션 */}
      {(selectedCategory === 'all' || selectedCategory === 'typography') && (
        <section className="mb-16">
          <Typography variant="h2" className="mb-6">
            타이포그래피 (Typography)
          </Typography>
          <Card>
            <div className="space-y-6">
              <div>
                <Typography variant="h1">Heading 1 - 제목 텍스트</Typography>
                <code className="text-sm text-gray-500">variant="h1"</code>
              </div>
              
              <div>
                <Typography variant="h2">Heading 2 - 대형 제목</Typography>
                <code className="text-sm text-gray-500">variant="h2"</code>
              </div>
              
              <div>
                <Typography variant="h3">Heading 3 - 중형 제목</Typography>
                <code className="text-sm text-gray-500">variant="h3"</code>
              </div>
              
              <div>
                <Typography variant="h4">Heading 4 - 소형 제목</Typography>
                <code className="text-sm text-gray-500">variant="h4"</code>
              </div>
              
              <div>
                <Typography variant="body">
                  Body 텍스트 - 일반적인 본문 내용에 사용되는 텍스트입니다. 
                  가독성이 좋고 다양한 상황에서 활용할 수 있습니다.
                </Typography>
                <code className="text-sm text-gray-500">variant="body"</code>
              </div>
              
              <div>
                <Typography variant="small" color="gray">
                  Small 텍스트 - 부가 정보나 설명에 사용되는 작은 텍스트입니다.
                </Typography>
                <code className="text-sm text-gray-500">variant="small"</code>
              </div>
            </div>
          </Card>
        </section>
      )}

      {/* 캐러셀 섹션 */}
      {(selectedCategory === 'all' || selectedCategory === 'carousel') && (
        <section className="mb-16">
          <Typography variant="h2" className="mb-6">
            캐러셀 (Carousel)
          </Typography>
          <Card>
            <div className="space-y-8">
              <div>
                <Typography variant="h3" className="mb-4">기본 캐러셀</Typography>
                <Typography variant="body" color="gray" className="mb-4">
                  자동 재생, 화살표 네비게이션, 도트 인디케이터를 포함한 기본 캐러셀입니다.
                </Typography>
                <Carousel 
                  variant="default" 
                  autoPlay={true} 
                  autoPlayInterval={4000}
                  className="max-w-md mx-auto"
                >
                  <div className="bg-gradient-to-br from-[#5E21D1] to-[#3BD997] h-48 flex items-center justify-center">
                    <Typography variant="h3" color="white">슬라이드 1</Typography>
                  </div>
                  <div className="bg-gradient-to-br from-[#3BD997] to-[#337AB7] h-48 flex items-center justify-center">
                    <Typography variant="h3" color="white">슬라이드 2</Typography>
                  </div>
                  <div className="bg-gradient-to-br from-[#337AB7] to-[#5E21D1] h-48 flex items-center justify-center">
                    <Typography variant="h3" color="white">슬라이드 3</Typography>
                  </div>
                </Carousel>
              </div>
              
              <div>
                <Typography variant="h3" className="mb-4">미니멀 캐러셀</Typography>
                <Typography variant="body" color="gray" className="mb-4">
                  깔끔하고 단순한 디자인의 미니멀 캐러셀입니다.
                </Typography>
                <Carousel 
                  variant="minimal" 
                  autoPlay={false}
                  className="max-w-md mx-auto"
                >
                  <div className="bg-[#F4F5F8] border-2 border-[#979797] rounded-lg h-32 flex items-center justify-center">
                    <Typography variant="body" color="gray">콘텐츠 1</Typography>
                  </div>
                  <div className="bg-[#F4F5F8] border-2 border-[#979797] rounded-lg h-32 flex items-center justify-center">
                    <Typography variant="body" color="gray">콘텐츠 2</Typography>
                  </div>
                  <div className="bg-[#F4F5F8] border-2 border-[#979797] rounded-lg h-32 flex items-center justify-center">
                    <Typography variant="body" color="gray">콘텐츠 3</Typography>
                  </div>
                </Carousel>
              </div>
            </div>
          </Card>
        </section>
      )}

      {/* 로더 섹션 */}
      {(selectedCategory === 'all' || selectedCategory === 'loaders') && (
        <section className="mb-16">
          <Typography variant="h2" className="mb-6">
            로더 (Loaders)
          </Typography>
          <Card>
            <div className="space-y-8">
              <div>
                <Typography variant="h3" className="mb-4">스피너 로더</Typography>
                <div className="flex flex-wrap gap-8 items-center">
                  <Loader variant="spinner" size="xs" color="primary" />
                  <Loader variant="spinner" size="sm" color="green" />
                  <Loader variant="spinner" size="md" color="gray" />
                  <Loader variant="spinner" size="lg" color="primary" text="로딩 중..." />
                </div>
              </div>
              
              <div>
                <Typography variant="h3" className="mb-4">도트 로더</Typography>
                <div className="flex flex-wrap gap-8 items-center">
                  <Loader variant="dots" size="xs" color="primary" />
                  <Loader variant="dots" size="sm" color="green" />
                  <Loader variant="dots" size="md" color="gray" />
                  <Loader variant="dots" size="lg" color="primary" text="처리 중..." />
                </div>
              </div>

              <div>
                <Typography variant="h3" className="mb-4">펄스 로더</Typography>
                <div className="flex flex-wrap gap-8 items-center">
                  <Loader variant="pulse" size="sm" color="primary" />
                  <Loader variant="pulse" size="md" color="green" />
                  <Loader variant="pulse" size="lg" color="gray" text="대기 중..." />
                </div>
              </div>

              <div>
                <Typography variant="h3" className="mb-4">바 로더</Typography>
                <div className="flex flex-wrap gap-8 items-center">
                  <Loader variant="bars" size="sm" color="primary" />
                  <Loader variant="bars" size="md" color="green" />
                  <Loader variant="bars" size="lg" color="gray" text="분석 중..." />
                </div>
              </div>

              <div>
                <Typography variant="h3" className="mb-4">인라인 로더</Typography>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <InlineLoader variant="dots" size="sm" color="primary" text="저장 중" />
                    <InlineLoader variant="spinner" size="sm" color="green" text="업로드 중" />
                  </div>
                </div>
              </div>

              <div>
                <Typography variant="h3" className="mb-4">오버레이 로더</Typography>
                <div className="space-y-4">
                  <Button 
                    variant="primary" 
                    onClick={() => setShowOverlay(true)}
                  >
                    오버레이 로더 표시
                  </Button>
                  <LoadingOverlay 
                    isVisible={showOverlay}
                    variant="spinner"
                    size="lg"
                    color="primary"
                    text="데이터를 불러오는 중..."
                    backdrop={true}
                  />
                  {showOverlay && (
                    <Button 
                      variant="secondary" 
                      onClick={() => setShowOverlay(false)}
                      className="ml-2"
                    >
                      닫기
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </section>
      )}

      {/* 링크 섹션 */}
      {(selectedCategory === 'all' || selectedCategory === 'links') && (
        <section className="mb-16">
          <Typography variant="h2" className="mb-6">
            링크 (Links)
          </Typography>
          <Card>
            <div className="space-y-6">
              <div>
                <Typography variant="h3" className="mb-4">기본 링크</Typography>
                <div className="space-y-2">
                  <div><Link href="#" variant="default">기본 링크 스타일</Link></div>
                  <div><Link href="#" variant="default" underline>밑줄 있는 링크</Link></div>
                </div>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-lg">
                <Typography variant="h3" className="mb-4 text-white">라이트 링크</Typography>
                <div className="space-y-2">
                  <div><Link href="#" variant="light">어두운 배경용 링크</Link></div>
                  <div><Link href="#" variant="light" underline>밑줄 있는 라이트 링크</Link></div>
                </div>
              </div>
            </div>
          </Card>
        </section>
      )}

      {/* 레이아웃 섹션 */}
      {(selectedCategory === 'all' || selectedCategory === 'layout') && (
        <section className="mb-16">
          <Typography variant="h2" className="mb-6">
            레이아웃 (Layout)
          </Typography>
          <Card>
            <div className="space-y-6">
              <div>
                <Typography variant="h3" className="mb-4">컨테이너</Typography>
                <Typography variant="body" color="gray" className="mb-4">
                  최대 너비 1200px, 좌우 20px 패딩을 가진 중앙 정렬 컨테이너입니다.
                </Typography>
                <code className="text-sm text-gray-500 bg-gray-100 p-2 rounded">
                  &lt;Container&gt;content&lt;/Container&gt;
                </code>
              </div>
              
              <div>
                <Typography variant="h3" className="mb-4">그리드 시스템</Typography>
                <Typography variant="body" color="gray" className="mb-4">
                  12컬럼 기반의 반응형 그리드 시스템입니다.
                </Typography>
                <div className="grid grid-cols-12 gap-4">
                  {Array.from({ length: 12 }, (_, i) => (
                    <div key={i} className="bg-gray-200 p-2 text-center text-sm rounded">
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </section>
      )}

      {/* 컬러 팔레트 */}
      {selectedCategory === 'all' && (
        <section className="mb-16">
          <Typography variant="h2" className="mb-6">
            컬러 팔레트 (Color Palette)
          </Typography>
          <Card>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#5E21D1] rounded-lg mb-2 mx-auto"></div>
                <Typography variant="small">Primary Purple</Typography>
                <code className="text-xs text-gray-500">#5E21D1</code>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#3BD997] rounded-lg mb-2 mx-auto"></div>
                <Typography variant="small">Primary Green</Typography>
                <code className="text-xs text-gray-500">#3BD997</code>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#222222] rounded-lg mb-2 mx-auto"></div>
                <Typography variant="small">Dark Gray</Typography>
                <code className="text-xs text-gray-500">#222222</code>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#888888] rounded-lg mb-2 mx-auto"></div>
                <Typography variant="small">Gray</Typography>
                <code className="text-xs text-gray-500">#888888</code>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#F4F5F8] border border-gray-200 rounded-lg mb-2 mx-auto"></div>
                <Typography variant="small">Off White</Typography>
                <code className="text-xs text-gray-500">#F4F5F8</code>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#337AB7] rounded-lg mb-2 mx-auto"></div>
                <Typography variant="small">Accent Blue</Typography>
                <code className="text-xs text-gray-500">#337AB7</code>
              </div>
            </div>
          </Card>
        </section>
      )}
    </Container>
  );
}