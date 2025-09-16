const { Client } = require('@notionhq/client');
require('dotenv').config();

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

async function checkAvailablePages() {
  console.log('=== Available Pages and Databases ===\n');
  
  try {
    const searchResponse = await notion.search({
      filter: {
        property: 'object',
        value: 'page'
      }
    });
    
    console.log(`Found ${searchResponse.results.length} accessible pages:\n`);
    
    const databases = new Set();
    
    for (const page of searchResponse.results) {
      console.log(`Page: ${page.id}`);
      
      // 제목 가져오기
      const title = page.properties?.['제목']?.title?.[0]?.text?.content || 
                   page.properties?.['Title']?.title?.[0]?.text?.content ||
                   page.properties?.['Name']?.title?.[0]?.text?.content ||
                   Object.values(page.properties).find(p => p.type === 'title')?.title?.[0]?.text?.content ||
                   'Untitled';
      
      console.log(`  Title: ${title}`);
      console.log(`  Parent Type: ${page.parent.type}`);
      
      if (page.parent.type === 'database_id') {
        console.log(`  Database ID: ${page.parent.database_id}`);
        databases.add(page.parent.database_id);
      }
      
      console.log(`  Properties: ${Object.keys(page.properties).join(', ')}`);
      console.log('');
    }
    
    if (databases.size > 0) {
      console.log('\n=== Accessible Databases ===\n');
      for (const dbId of databases) {
        console.log(`Database ID: ${dbId}`);
        try {
          const dbInfo = await notion.databases.retrieve({
            database_id: dbId
          });
          console.log(`  Title: ${dbInfo.title[0]?.plain_text || 'Untitled'}`);
          console.log(`  Properties: ${Object.keys(dbInfo.properties).join(', ')}`);
        } catch (e) {
          console.log(`  Error: ${e.message}`);
        }
        console.log('');
      }
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkAvailablePages();
