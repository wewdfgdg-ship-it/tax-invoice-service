require('dotenv').config();
const { Client } = require('@notionhq/client');

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

async function debugSearch() {
  try {
    const databaseId = process.env.NOTION_DATABASE_ID;
    
    console.log('=== Search API 디버깅 ===\n');
    
    // Search API를 사용하여 모든 페이지 가져오기
    const searchResponse = await notion.search({
      filter: {
        property: 'object',
        value: 'page'
      },
      sort: {
        direction: 'descending',
        timestamp: 'last_edited_time'
      }
    });
    
    console.log(`총 ${searchResponse.results.length}개 항목 발견\n`);
    
    // 현재 데이터베이스에 속한 페이지만 필터링
    const pages = searchResponse.results.filter(
      page => page.parent?.database_id === databaseId.replace(/-/g, '')
    );
    
    console.log(`데이터베이스 ${databaseId}에 속한 페이지: ${pages.length}개\n`);
    
    // 모든 페이지의 parent database_id 확인
    console.log('모든 페이지의 parent.database_id:');
    searchResponse.results.forEach(page => {
      if (page.parent?.database_id) {
        console.log(`- ${page.parent.database_id}`);
      }
    });
    console.log(`\n찾고 있는 database_id: ${databaseId}`);
    console.log(`하이픈 제거 후: ${databaseId.replace(/-/g, '')}\n`);
    
    pages.forEach((page, i) => {
      const properties = page.properties;
      console.log(`\n=== 페이지 ${i+1} ===`);
      console.log('ID:', page.id);
      console.log('제목:', properties['제목']?.title?.[0]?.text?.content || 
                         properties['Title']?.title?.[0]?.text?.content || 'Untitled');
      console.log('Published 속성:', JSON.stringify(properties['Published'], null, 2));
      console.log('Published 값:', properties['Published']?.checkbox);
      console.log('PublishedDate 속성:', JSON.stringify(properties['PublishedDate '], null, 2));
      console.log('모든 속성 키:', Object.keys(properties));
    });
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

debugSearch();