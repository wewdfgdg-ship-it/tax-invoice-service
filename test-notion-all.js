require('dotenv').config();
const { Client } = require('@notionhq/client');

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

async function getAllItems() {
  try {
    // 모든 항목 가져오기 (필터 없이)
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID
    });
    
    console.log(`Total items in database: ${response.results.length}\n`);
    
    response.results.forEach((page, index) => {
      console.log(`\n${index + 1}. Page ID: ${page.id}`);
      console.log('   Properties:');
      
      // 모든 속성 출력
      Object.entries(page.properties).forEach(([key, value]) => {
        console.log(`   - ${key}: ${JSON.stringify(value, null, 2).substring(0, 200)}`);
      });
    });
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

getAllItems();