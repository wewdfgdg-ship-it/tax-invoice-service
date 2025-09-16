// Vercel Function - 주문 관리 API
// /api/orders

export default async function handler(req, res) {
  // CORS 헤더 설정
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { method } = req;

  try {
    switch (method) {
      case 'POST':
        // 새 주문 생성
        return await createOrder(req, res);

      case 'GET':
        // 주문 조회
        return await getOrders(req, res);

      case 'PUT':
        // 주문 상태 업데이트
        return await updateOrder(req, res);

      default:
        res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// 주문 생성
async function createOrder(req, res) {
  const orderData = req.body;

  // 유효성 검사
  if (!orderData.orderNumber || !orderData.customer || !orderData.amount) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Supabase에 저장 (나중에 구현)
  // 임시로 로컬 스토리지 시뮬레이션
  const newOrder = {
    id: Date.now().toString(),
    ...orderData,
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  // 여기서 실제로는 Supabase에 저장
  // const { data, error } = await supabase
  //   .from('orders')
  //   .insert([newOrder]);

  res.status(201).json({
    success: true,
    order: newOrder,
    message: '주문이 성공적으로 생성되었습니다.'
  });
}

// 주문 조회
async function getOrders(req, res) {
  const { orderNumber, status, limit = 50 } = req.query;

  // 여기서 실제로는 Supabase에서 조회
  // const { data, error } = await supabase
  //   .from('orders')
  //   .select('*')
  //   .order('createdAt', { ascending: false })
  //   .limit(limit);

  // 임시 더미 데이터
  const dummyOrders = [
    {
      id: '1',
      orderNumber: 'ORD-20241216-001',
      customer: {
        name: '홍길동',
        email: 'hong@example.com',
        phone: '010-1234-5678'
      },
      packageType: 'premium',
      amount: 50000,
      status: 'completed',
      createdAt: '2024-12-16T10:00:00Z'
    }
  ];

  res.status(200).json({
    success: true,
    orders: dummyOrders,
    total: dummyOrders.length
  });
}

// 주문 업데이트
async function updateOrder(req, res) {
  const { orderId } = req.query;
  const updates = req.body;

  if (!orderId) {
    return res.status(400).json({ error: 'Order ID is required' });
  }

  // 여기서 실제로는 Supabase 업데이트
  // const { data, error } = await supabase
  //   .from('orders')
  //   .update(updates)
  //   .eq('id', orderId);

  res.status(200).json({
    success: true,
    message: '주문이 업데이트되었습니다.',
    orderId,
    updates
  });
}