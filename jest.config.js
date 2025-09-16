const nextJest = require('next/jest')

// Next.js 애플리케이션을 위한 Jest 설정 생성
const createJestConfig = nextJest({
  // Next.js 앱의 경로를 제공하여 .env 파일 로드 및 next.config.js 처리
  dir: './',
})

// Jest에 전달할 사용자 정의 설정
const customJestConfig = {
  // 각 테스트 실행 전 설정 파일 추가
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // 테스트 환경으로 jsdom 사용 (브라우저와 유사한 환경)
  testEnvironment: 'jest-environment-jsdom',
  // 모듈 별칭 설정
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
    '^@/app/(.*)$': '<rootDir>/app/$1',
  },
  // 테스트 파일 패턴
  testMatch: [
    '**/__tests__/**/*.{js,jsx,ts,tsx}',
    '**/*.{spec,test}.{js,jsx,ts,tsx}'
  ],
  // 커버리지 수집 설정
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/out/**',
    '!**/coverage/**',
    '!jest.config.js',
    '!jest.setup.js',
    '!next.config.js',
    '!postcss.config.js',
    '!tailwind.config.js',
  ],
}

// 비동기 처리를 위해 함수로 내보내기
module.exports = createJestConfig(customJestConfig)