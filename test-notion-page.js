require('dotenv').config();
const { Client } = require('@notionhq/client');

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

async function getPage() {
  try {
    // 3번째 페이지 직접 가져오기
    const pageId = '26c8b646-fb93-801f-8a10-f551cbf6e530';
    
    console.log('페이지 직접 접근 시도...\n');
    
    try {
      const page = await notion.pages.retrieve({ page_id: pageId });
      console.log('✅ 페이지 접근 성공!');
      console.log('페이지 속성:', JSON.stringify(page.properties, null, 2));
      
      // 페이지의 부모 데이터베이스 확인
      if (page.parent?.database_id) {
        console.log('\n부모 데이터베이스:', page.parent.database_id);
        console.log('현재 설정된 DB ID:', process.env.NOTION_DATABASE_ID);
        console.log('일치 여부:', page.parent.database_id === process.env.NOTION_DATABASE_ID.replace(/-/g, ''));
      }
      
      // 페이지 내용 가져오기
      console.log('\n페이지 블록 가져오기...');
      const blocks = await notion.blocks.children.list({
        block_id: pageId,
        page_size: 50
      });
      
      console.log(`블록 수: ${blocks.results.length}개`);
      
    } catch (error) {
      console.log('❌ 페이지 접근 실패:', error.message);
      
      // 대신 검색으로 찾아보기
      console.log('\n검색으로 다시 시도...');
      const search = await notion.search({
        query: 'Untitled',
        filter: {
          property: 'object',
          value: 'page'
        }
      });
      
      const targetPage = search.results.find(p => p.id === pageId || p.id === pageId.replace(/-/g, ''));
      if (targetPage) {
        console.log('검색으로 페이지 발견!');
        console.log('페이지 정보:', JSON.stringify(targetPage, null, 2));
      }
    }
    
    // 데이터베이스 쿼리에 필터 없이 시도
    console.log('\n\n=== 필터 없이 데이터베이스 쿼리 ===');
    const dbQuery = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      page_size: 100  // 최대한 많이 가져오기
    });
    
    console.log(`총 ${dbQuery.results.length}개 항목`);
    dbQuery.results.forEach((page, i) => {
      const title = page.properties?.제목?.title?.[0]?.text?.content || 
                   page.properties?.Name?.title?.[0]?.text?.content || 
                   'Untitled';
      console.log(`${i+1}. ${title} (${page.id})`);
    });
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

getPage();