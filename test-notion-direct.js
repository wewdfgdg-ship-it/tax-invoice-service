const { Client } = require('@notionhq/client');
require('dotenv').config();

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const databaseId = process.env.NOTION_BLOG_ROOT_ID;

async function testNotionConnection() {
  console.log('=== Notion API Direct Test ===');
  console.log('API Key exists:', !!process.env.NOTION_API_KEY);
  console.log('Database ID:', databaseId);
  console.log('');

  try {
    // 1. Search API로 페이지 검색
    console.log('1. Testing Search API...');
    const searchResponse = await notion.search({
      filter: {
        property: 'object',
        value: 'page'
      },
      page_size: 10
    });
    
    console.log(`   Found ${searchResponse.results.length} pages total`);
    
    // 현재 데이터베이스에 속한 페이지 찾기
    const dbPages = searchResponse.results.filter(
      page => page.parent?.database_id === databaseId
    );
    console.log(`   Found ${dbPages.length} pages in target database`);
    
    // 2. 데이터베이스 직접 쿼리 시도
    console.log('\n2. Testing Database Query...');
    try {
      const dbResponse = await notion.databases.query({
        database_id: databaseId,
        page_size: 10
      });
      console.log(`   Database query successful! Found ${dbResponse.results.length} pages`);
      
      // 페이지 속성 확인
      if (dbResponse.results.length > 0) {
        console.log('\n3. First page properties:');
        const firstPage = dbResponse.results[0];
        const props = Object.keys(firstPage.properties);
        props.forEach(prop => {
          const propData = firstPage.properties[prop];
          console.log(`   - ${prop}: [${propData.type}]`);
        });
      }
    } catch (dbError) {
      console.log('   Database query failed:', dbError.message);
      console.log('   Error code:', dbError.code);
    }
    
    // 3. 데이터베이스 정보 가져오기
    console.log('\n4. Testing Database Retrieve...');
    try {
      const dbInfo = await notion.databases.retrieve({
        database_id: databaseId
      });
      console.log('   Database title:', dbInfo.title[0]?.plain_text || 'No title');
      console.log('   Database properties:');
      Object.keys(dbInfo.properties).forEach(prop => {
        console.log(`   - ${prop}: [${dbInfo.properties[prop].type}]`);
      });
    } catch (dbError) {
      console.log('   Database retrieve failed:', dbError.message);
      console.log('   Error code:', dbError.code);
    }
    
  } catch (error) {
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
  }
}

testNotionConnection();
