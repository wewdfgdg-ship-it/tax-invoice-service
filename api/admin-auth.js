// Vercel Function - 관리자 인증 API
// /api/admin-auth

import crypto from 'crypto';

export default async function handler(req, res) {
  // CORS 설정
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password, action } = req.body;

  // 환경변수에서 관리자 비밀번호 가져오기
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin1234';

  if (action === 'login') {
    // 로그인 처리
    if (password === ADMIN_PASSWORD) {
      // 세션 토큰 생성 (간단한 구현)
      const token = crypto.randomBytes(32).toString('hex');
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24시간

      res.status(200).json({
        success: true,
        token,
        expiresAt: expiresAt.toISOString(),
        message: '로그인 성공'
      });
    } else {
      res.status(401).json({
        success: false,
        message: '비밀번호가 올바르지 않습니다.'
      });
    }
  } else if (action === 'verify') {
    // 토큰 검증 (실제로는 DB나 Redis에서 확인해야 함)
    const { token } = req.body;

    // 임시로 모든 토큰을 유효한 것으로 처리
    if (token && token.length === 64) {
      res.status(200).json({
        success: true,
        valid: true,
        message: '유효한 토큰입니다.'
      });
    } else {
      res.status(401).json({
        success: false,
        valid: false,
        message: '유효하지 않은 토큰입니다.'
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: 'Invalid action'
    });
  }
}