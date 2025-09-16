require('dotenv').config();
const { Client } = require('@notionhq/client');

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

async function searchAll() {
  try {
    console.log('=== 모든 콘텐츠 검색 중... ===\n');
    
    // 1. 모든 페이지와 데이터베이스 검색
    const searchResponse = await notion.search({
      sort: {
        direction: 'descending',
        timestamp: 'last_edited_time'
      }
    });
    
    console.log(`총 ${searchResponse.results.length}개 항목 발견\n`);
    
    // 데이터베이스와 페이지 분류
    const databases = searchResponse.results.filter(item => item.object === 'database');
    const pages = searchResponse.results.filter(item => item.object === 'page');
    
    console.log(`📚 데이터베이스: ${databases.length}개`);
    databases.forEach((db, i) => {
      console.log(`  ${i+1}. ${db.title?.[0]?.text?.content || 'Untitled'}`);
      console.log(`     ID: ${db.id}`);
      console.log(`     URL: ${db.url}`);
      console.log(`     최종 수정: ${new Date(db.last_edited_time).toLocaleString('ko-KR')}\n`);
    });
    
    console.log(`\n📄 페이지: ${pages.length}개`);
    pages.forEach((page, i) => {
      const title = page.properties?.제목?.title?.[0]?.text?.content || 
                    page.properties?.Title?.title?.[0]?.text?.content || 
                    page.properties?.Name?.title?.[0]?.text?.content || 
                    'Untitled';
      console.log(`  ${i+1}. ${title}`);
      console.log(`     ID: ${page.id}`);
      console.log(`     URL: ${page.url}`);
      console.log(`     최종 수정: ${new Date(page.last_edited_time).toLocaleString('ko-KR')}`);
      
      // 부모 정보 확인
      if (page.parent?.database_id) {
        console.log(`     부모 DB: ${page.parent.database_id}`);
      }
      console.log('');
    });
    
    // 2. 현재 연결된 데이터베이스의 모든 항목 다시 확인
    console.log('\n=== 현재 데이터베이스 내용 ===');
    const dbId = process.env.NOTION_DATABASE_ID;
    const dbResponse = await notion.databases.query({
      database_id: dbId,
      sorts: [
        {
          timestamp: 'last_edited_time',
          direction: 'descending'
        }
      ]
    });
    
    console.log(`데이터베이스 ID: ${dbId}`);
    console.log(`항목 수: ${dbResponse.results.length}개\n`);
    
    dbResponse.results.forEach((page, i) => {
      const title = page.properties?.제목?.title?.[0]?.text?.content || 'Untitled';
      const published = page.properties?.Published?.checkbox || false;
      console.log(`  ${i+1}. ${title}`);
      console.log(`     Published: ${published}`);
      console.log(`     최종 수정: ${new Date(page.last_edited_time).toLocaleString('ko-KR')}\n`);
    });
    
  } catch (error) {
    console.error('Error:', error.message);
    if (error.body) {
      console.error('Error details:', JSON.stringify(error.body, null, 2));
    }
  }
}

searchAll();