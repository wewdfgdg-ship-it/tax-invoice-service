import Link from 'next/link'
import { useState, useEffect } from 'react'
import Container from '../components/ui/Container'
import Typography from '../components/ui/Typography'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

// 동적 네비게이션 헤더
function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg' 
        : 'bg-transparent'
    }`}>
      <Container>
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#5E21D1] to-[#3BD997] rounded-xl flex items-center justify-center">
                <Typography variant="body" className="font-black text-white text-lg">M</Typography>
              </div>
              <Typography variant="h3" className="font-black text-[#222222] text-2xl">
                MIBLE
              </Typography>
            </div>
            
            <nav className="hidden lg:flex items-center gap-8">
              <a href="#services" className="text-[#222222] hover:text-[#5E21D1] font-medium transition-colors">
                체험단 서비스
              </a>
              <a href="#features" className="text-[#222222] hover:text-[#5E21D1] font-medium transition-colors">
                핵심 기능
              </a>
              <a href="#process" className="text-[#222222] hover:text-[#5E21D1] font-medium transition-colors">
                체험 프로세스
              </a>
              <a href="#partners" className="text-[#222222] hover:text-[#5E21D1] font-medium transition-colors">
                파트너사
              </a>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-gradient-to-r from-[#5E21D1] to-[#337AB7] text-white px-4 py-2 rounded-full">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
              <Typography variant="body" className="font-semibold">
                1688-7890
              </Typography>
            </div>
            
            <button 
              className="lg:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
        </div>
      </Container>
    </header>
  )
}

// 진짜 임팩트 있는 히어로 섹션
function HeroSection() {
  const [currentStat, setCurrentStat] = useState(0)
  
  const stats = [
    { number: '50,000+', label: '체험단 회원수', color: '#3BD997' },
    { number: '1,200+', label: '파트너 브랜드', color: '#5E21D1' },
    { number: '98.5%', label: '만족도', color: '#337AB7' },
    { number: '24시간', label: '빠른 매칭', color: '#FFB343' }
  ]
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat(prev => (prev + 1) % stats.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="min-h-screen relative overflow-hidden">
      {/* 동적 배경 */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#5E21D1]/5 via-white to-[#3BD997]/5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-[#5E21D1]/20 to-[#3BD997]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-[#3BD997]/15 to-[#337AB7]/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      <Container className="relative z-10">
        <div className="flex items-center justify-between min-h-screen py-20">
          <div className="flex-1 max-w-2xl pt-20">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#5E21D1]/10 to-[#3BD997]/10 px-4 py-2 rounded-full border border-[#5E21D1]/20 mb-6">
                <div className="w-2 h-2 bg-[#3BD997] rounded-full animate-pulse"></div>
                <Typography variant="small" className="font-semibold text-[#5E21D1]">
                  대한민국 1위 체험단 플랫폼
                </Typography>
              </div>
              
              <Typography variant="h1" className="text-5xl lg:text-7xl font-black mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[#222222] via-[#5E21D1] to-[#3BD997] bg-clip-text text-transparent">
                  진짜 체험,
                </span>
                <br />
                <span className="text-[#222222]">진짜 리뷰</span>
              </Typography>
              
              <Typography variant="large" className="text-[#666666] mb-8 leading-relaxed">
                MIBLE 체험단과 함께하는 <strong className="text-[#5E21D1]">완벽한 마케팅</strong>
                <br />
                브랜드와 소비자를 연결하는 가장 효과적인 체험 마케팅 플랫폼
              </Typography>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button 
                  variant="primary" 
                  size="lg"
                  className="bg-gradient-to-r from-[#5E21D1] to-[#3BD997] hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <span className="mr-2">🚀</span>
                  무료 체험단 신청
                </Button>
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="border-2 border-[#5E21D1] text-[#5E21D1] hover:bg-[#5E21D1] hover:text-white"
                >
                  <span className="mr-2">📞</span>
                  상담 받기
                </Button>
              </div>
            </div>
            
            {/* 실시간 통계 */}
            <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-xl">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className={`text-center transition-all duration-500 ${
                    currentStat === index ? 'transform scale-110' : 'opacity-70'
                  }`}>
                    <Typography 
                      variant="h3" 
                      className="font-black text-2xl mb-1"
                      style={{ color: stat.color }}
                    >
                      {stat.number}
                    </Typography>
                    <Typography variant="small" color="gray" className="font-medium">
                      {stat.label}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* 히어로 이미지/일러스트레이션 영역 */}
          <div className="hidden lg:flex flex-1 justify-center items-center">
            <div className="relative">
              {/* 메인 캐릭터 대신 현대적인 그래픽 */}
              <div className="w-96 h-96 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#5E21D1] to-[#3BD997] rounded-3xl transform rotate-6 opacity-20"></div>
                <div className="absolute inset-4 bg-white rounded-3xl shadow-2xl flex items-center justify-center transform -rotate-3">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🎯</div>
                    <Typography variant="h3" className="font-bold text-[#222222] mb-2">
                      체험 마케팅
                    </Typography>
                    <Typography variant="body" color="gray">
                      브랜드 성장의 새로운 기준
                    </Typography>
                  </div>
                </div>
              </div>
              
              {/* 플로팅 요소들 */}
              <div className="absolute -top-10 -left-10 bg-[#3BD997] text-white p-4 rounded-xl shadow-lg animate-bounce">
                <div className="text-2xl">💝</div>
                <Typography variant="small" className="font-bold">체험 상품</Typography>
              </div>
              
              <div className="absolute -bottom-10 -right-10 bg-[#337AB7] text-white p-4 rounded-xl shadow-lg animate-bounce" style={{animationDelay: '1s'}}>
                <div className="text-2xl">⭐</div>
                <Typography variant="small" className="font-bold">리뷰 작성</Typography>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

// 체험단 카테고리 섹션
function ServicesSection() {
  const services = [
    {
      title: "BEAUTY",
      subtitle: "뷰티 체험단",
      description: "화장품, 스킨케어 제품 전문 체험단으로 뷰티 인플루언서들과 함께하는 브랜드 마케팅",
      color: "from-[#FF6B9D] to-[#C44569]",
      icon: "💄",
      stats: "월 1,200+ 체험"
    },
    {
      title: "FOOD", 
      subtitle: "맛집 체험단",
      description: "레스토랑, 카페, 배달음식 체험단으로 진짜 맛과 분위기를 전달하는 솔직한 리뷰",
      color: "from-[#3BD997] to-[#2BCD74]",
      icon: "🍽️",
      stats: "월 800+ 방문"
    },
    {
      title: "LIFESTYLE",
      subtitle: "라이프 체험단", 
      description: "패션, 가전, 생활용품 체험단으로 일상 속 진짜 사용기와 만족도를 공유",
      color: "from-[#5E21D1] to-[#4A90E2]",
      icon: "🏠",
      stats: "월 600+ 체험"
    },
    {
      title: "PREMIUM",
      subtitle: "프리미엄 체험단",
      description: "VIP 인플루언서 매칭 서비스로 고급 브랜드에 맞는 프리미엄 마케팅 솔루션",
      color: "from-[#FFD700] to-[#FFA500]",
      icon: "👑",
      stats: "월 200+ 매칭"
    }
  ]

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-[#F8F9FA] to-white">
      <Container>
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#5E21D1]/10 px-4 py-2 rounded-full border border-[#5E21D1]/20 mb-6">
            <Typography variant="small" className="font-semibold text-[#5E21D1]">
              MIBLE 4대 체험단 서비스
            </Typography>
          </div>
          <Typography variant="h2" className="text-4xl font-black mb-4 text-[#222222]">
            카테고리별 전문 체험단
          </Typography>
          <Typography variant="large" color="gray" className="max-w-2xl mx-auto">
            각 분야의 전문성을 가진 체험단과 함께 브랜드만의 독특한 이야기를 만들어보세요
          </Typography>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              variant="shadow" 
              className="p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden group"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} opacity-10 rounded-full transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-500`}></div>
              
              <div className="relative z-10">
                <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 text-2xl shadow-lg`}>
                  {service.icon}
                </div>
                
                <div className="mb-4">
                  <Typography variant="h3" className="font-black text-[#222222] text-xl mb-2">
                    {service.title}
                  </Typography>
                  <Typography variant="body" className="text-[#5E21D1] font-bold mb-1">
                    {service.subtitle}
                  </Typography>
                  <div className="inline-block bg-gradient-to-r from-[#5E21D1]/10 to-[#3BD997]/10 px-3 py-1 rounded-full">
                    <Typography variant="small" className="font-semibold text-[#5E21D1]">
                      {service.stats}
                    </Typography>
                  </div>
                </div>
                
                <Typography variant="body" color="gray" className="mb-6 leading-relaxed">
                  {service.description}
                </Typography>
                
                <Button variant="secondary" size="sm" className="border-[#5E21D1] text-[#5E21D1] hover:bg-[#5E21D1] hover:text-white">
                  체험단 신청하기 →
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}

// 신뢰성 파트너 섹션
function PartnersSection() {
  const partners = [
    { name: "아모레퍼시픽", category: "뷰티" },
    { name: "올리브영", category: "뷰티" },
    { name: "CJ제일제당", category: "식품" },
    { name: "신세계백화점", category: "리테일" },
    { name: "롯데마트", category: "리테일" },
    { name: "이마트", category: "리테일" },
    { name: "GS25", category: "편의점" },
    { name: "CU편의점", category: "편의점" },
    { name: "스타벅스", category: "F&B" },
    { name: "투썸플레이스", category: "F&B" },
    { name: "삼성전자", category: "전자" },
    { name: "LG전자", category: "전자" }
  ]

  return (
    <section id="partners" className="py-20 bg-[#222222] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#5E21D1]/5 to-[#3BD997]/5"></div>
      <Container className="relative z-10">
        <div className="text-center mb-16">
          <Typography variant="h2" className="text-4xl font-black mb-4 text-white">
            MIBLE과 함께한 브랜드
          </Typography>
          <Typography variant="large" className="text-gray-300 max-w-2xl mx-auto">
            1,200개 이상의 브랜드가 MIBLE 체험단으로 성공적인 마케팅을 경험했습니다
          </Typography>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {partners.map((partner, index) => (
            <Card 
              key={index} 
              variant="bordered" 
              className="p-6 text-center bg-white/5 border-white/10 hover:bg-white/10 hover:border-[#3BD997]/50 transition-all duration-300 group"
            >
              <Typography variant="body" className="font-bold text-white group-hover:text-[#3BD997] transition-colors">
                {partner.name}
              </Typography>
              <Typography variant="small" className="text-gray-400 mt-1">
                {partner.category}
              </Typography>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            variant="primary" 
            size="lg"
            className="bg-gradient-to-r from-[#3BD997] to-[#5E21D1] hover:shadow-xl"
          >
            파트너 브랜드 되기 →
          </Button>
        </div>
      </Container>
    </section>
  )
}

// CTA 섹션
function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-[#5E21D1] to-[#3BD997] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <Container className="relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <Typography variant="h2" className="text-4xl font-black mb-6 text-white">
            지금 시작하세요!
          </Typography>
          <Typography variant="large" className="text-white/90 mb-8">
            MIBLE 체험단과 함께 브랜드의 새로운 가능성을 발견하세요
          </Typography>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary" 
              size="lg"
              className="bg-white text-[#5E21D1] border-white hover:bg-gray-50"
            >
              무료 상담 신청
            </Button>
            <Button 
              variant="secondary" 
              size="lg"
              className="border-white text-white hover:bg-white/10"
            >
              체험단 제안서 받기
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

// 푸터
function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white py-16">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#5E21D1] to-[#3BD997] rounded-xl flex items-center justify-center">
                <Typography variant="body" className="font-black text-white text-xl">M</Typography>
              </div>
              <Typography variant="h3" className="font-black text-white text-2xl">
                MIBLE
              </Typography>
            </div>
            
            <Typography variant="body" className="text-gray-300 mb-4 max-w-md">
              대한민국 최고의 체험단 플랫폼 MIBLE과 함께 브랜드의 진짜 가치를 전달하세요.
            </Typography>
            
            <div className="space-y-2">
              <Typography variant="small" className="text-gray-400">
                주식회사 미블 | 사업자등록번호: 123-45-67890
              </Typography>
              <Typography variant="small" className="text-gray-400">
                통신판매업신고: 제2024-서울강남-12345호
              </Typography>
              <Typography variant="small" className="text-gray-400">
                서울특별시 강남구 테헤란로 123 미블타워 10층
              </Typography>
            </div>
          </div>
          
          <div>
            <Typography variant="h4" className="font-bold text-white mb-6">
              서비스
            </Typography>
            <div className="space-y-3">
              <Typography variant="body" className="text-gray-300 hover:text-[#3BD997] cursor-pointer transition-colors">
                뷰티 체험단
              </Typography>
              <Typography variant="body" className="text-gray-300 hover:text-[#3BD997] cursor-pointer transition-colors">
                맛집 체험단
              </Typography>
              <Typography variant="body" className="text-gray-300 hover:text-[#3BD997] cursor-pointer transition-colors">
                라이프 체험단
              </Typography>
              <Typography variant="body" className="text-gray-300 hover:text-[#3BD997] cursor-pointer transition-colors">
                프리미엄 체험단
              </Typography>
            </div>
          </div>
          
          <div>
            <Typography variant="h4" className="font-bold text-white mb-6">
              연락처
            </Typography>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#3BD997]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                <Typography variant="body" className="text-gray-300">
                  contact@mible.net
                </Typography>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#3BD997]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
                <Typography variant="body" className="text-gray-300">
                  1688-7890
                </Typography>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <Typography variant="small" className="text-gray-400">
            © 2024 MIBLE Corporation. All rights reserved.
          </Typography>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <Typography variant="small" className="text-gray-400 hover:text-[#3BD997] cursor-pointer">
              이용약관
            </Typography>
            <Typography variant="small" className="text-gray-400 hover:text-[#3BD997] cursor-pointer">
              개인정보처리방침
            </Typography>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <ServicesSection />
      <PartnersSection />
      <CTASection />
      <Footer />
    </>
  )
}