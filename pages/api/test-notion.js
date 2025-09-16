const { Client } = require('@notionhq/client');

export default async function handler(req, res) {
  try {
    // 환경변수 확인
    const apiKey = process.env.NOTION_API_KEY;
    const databaseId = process.env.NOTION_DATABASE_ID;
    
    if (!apiKey || !databaseId) {
      return res.status(500).json({ 
        error: 'Missing environment variables',
        hasApiKey: !!apiKey,
        hasDatabaseId: !!databaseId
      });
    }
    
    // Notion 클라이언트 생성
    const notion = new Client({
      auth: apiKey,
    });
    
    // 디버깅 정보
    console.log('Notion client:', notion);
    console.log('Notion databases:', notion.databases);
    console.log('typeof notion.databases.query:', typeof notion.databases?.query);
    
    // 데이터베이스 쿼리
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'Published',
        checkbox: {
          equals: true
        }
      },
      page_size: 10
    });
    
    // 결과 반환
    return res.status(200).json({
      success: true,
      count: response.results.length,
      posts: response.results.map(page => ({
        id: page.id,
        title: page.properties?.Title?.title?.[0]?.text?.content || 'Untitled',
        slug: page.properties?.Slug?.rich_text?.[0]?.text?.content || page.id,
        published: page.properties?.Published?.checkbox || false,
      }))
    });
    
  } catch (error) {
    console.error('Notion API Error:', error);
    return res.status(500).json({ 
      error: 'Failed to query database',
      message: error.message,
      code: error.code,
      status: error.status
    });
  }
}