require('dotenv').config();
const { Client } = require('@notionhq/client');

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

async function testSpecificPage() {
  try {
    // 제공된 링크의 페이지 ID
    const pageId = '26cbdffa-378b-800b-9bcf-dee67473847b';
    
    console.log('=== 특정 페이지 내용 확인 ===\n');
    console.log('페이지 ID:', pageId);
    console.log('URL: https://www.notion.so/' + pageId.replace(/-/g, ''));
    console.log('\n');
    
    // 페이지 정보 가져오기
    try {
      const page = await notion.pages.retrieve({ page_id: pageId });
      console.log('✅ 페이지 접근 성공!\n');
      
      // 페이지 속성 확인
      console.log('페이지 속성:');
      const properties = page.properties;
      Object.keys(properties).forEach(key => {
        const prop = properties[key];
        if (prop.title && prop.title[0]) {
          console.log(`- ${key}: ${prop.title[0].text.content}`);
        } else if (prop.rich_text && prop.rich_text[0]) {
          console.log(`- ${key}: ${prop.rich_text[0].text.content}`);
        } else if (prop.select) {
          console.log(`- ${key}: ${prop.select.name}`);
        } else if (prop.checkbox !== undefined) {
          console.log(`- ${key}: ${prop.checkbox}`);
        }
      });
      
      // 페이지 내용(블록) 가져오기
      console.log('\n페이지 블록 내용:');
      const blocks = await notion.blocks.children.list({
        block_id: pageId,
        page_size: 100
      });
      
      console.log(`총 ${blocks.results.length}개의 블록:\n`);
      
      blocks.results.forEach((block, index) => {
        console.log(`${index + 1}. [${block.type}]`);
        
        // 텍스트 내용 추출
        if (block[block.type]?.rich_text) {
          const text = block[block.type].rich_text
            .map(rt => rt.text.content)
            .join('');
          if (text) {
            console.log(`   내용: "${text.substring(0, 100)}${text.length > 100 ? '...' : ''}"`);
          }
        }
      });
      
      // 부모 확인
      if (page.parent) {
        console.log('\n부모 정보:');
        if (page.parent.type === 'database_id') {
          console.log('- 타입: 데이터베이스');
          console.log('- ID:', page.parent.database_id);
        } else if (page.parent.type === 'page_id') {
          console.log('- 타입: 페이지');
          console.log('- ID:', page.parent.page_id);
        }
      }
      
    } catch (error) {
      console.log('❌ 페이지 접근 실패:', error.message);
      console.log('\n권한 문제일 수 있습니다. Notion Integration이 이 페이지에 접근 권한이 있는지 확인하세요.');
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testSpecificPage();