require('dotenv').config();
const { Client } = require('@notionhq/client');

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

async function fixPage() {
  try {
    const pageId = '26c8b646-fb93-801f-8a10-f551cbf6e530';
    
    console.log('3번째 페이지 업데이트 시도...\n');
    
    // 페이지에 제목 추가 및 속성 업데이트
    const response = await notion.pages.update({
      page_id: pageId,
      properties: {
        '제목': {
          title: [
            {
              text: {
                content: '세 번째 테스트 글'
              }
            }
          ]
        },
        'Published': {
          checkbox: true  // Published 체크
        },
        'PublishedDate ': {
          date: {
            start: new Date().toISOString().split('T')[0]  // 오늘 날짜
          }
        }
      }
    });
    
    console.log('✅ 페이지 업데이트 성공!');
    console.log('업데이트된 속성:', JSON.stringify(response.properties, null, 2));
    
    // 다시 데이터베이스 쿼리
    console.log('\n데이터베이스 다시 쿼리...');
    const dbQuery = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID
    });
    
    console.log(`총 ${dbQuery.results.length}개 항목:`);
    dbQuery.results.forEach((page, i) => {
      const title = page.properties?.제목?.title?.[0]?.text?.content || 'Untitled';
      const published = page.properties?.Published?.checkbox || false;
      console.log(`${i+1}. ${title} - Published: ${published}`);
    });
    
  } catch (error) {
    console.error('Error:', error.message);
    if (error.body) {
      console.error('Error details:', JSON.stringify(error.body, null, 2));
    }
  }
}

fixPage();