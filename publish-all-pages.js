require('dotenv').config();
const { Client } = require('@notionhq/client');

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

async function publishAllPages() {
  try {
    console.log('모든 페이지를 Published로 업데이트 중...\n');
    
    // 페이지 ID 목록
    const pageIds = [
      '26c8b646-fb93-801f-8a10-f551cbf6e530', // 세 번째 테스트 글
      '26c8b646-fb93-80fd-b94f-ceaad41564f1', // 온라인전단지란?
      '26c8b646-fb93-80e4-93b6-d9dc9aa70be6'  // 체험단이란?
    ];
    
    for (const pageId of pageIds) {
      try {
        const response = await notion.pages.update({
          page_id: pageId,
          properties: {
            'Published': {
              checkbox: true
            },
            'PublishedDate ': {
              date: {
                start: new Date().toISOString().split('T')[0]
              }
            }
          }
        });
        
        const title = response.properties?.제목?.title?.[0]?.text?.content || 
                     response.properties?.Title?.title?.[0]?.text?.content || 
                     'Untitled';
        console.log(`✅ "${title}" - Published 설정 완료`);
      } catch (error) {
        console.error(`❌ 페이지 ${pageId} 업데이트 실패:`, error.message);
      }
    }
    
    console.log('\n완료! 이제 API를 다시 테스트해보세요.');
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

publishAllPages();