require('dotenv').config();
const { Client } = require('@notionhq/client');

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

async function listDatabases() {
  try {
    console.log('Fetching all accessible databases...\n');
    
    // Search for all databases
    const response = await notion.search({
      filter: {
        property: 'object',
        value: 'database'
      }
    });
    
    console.log(`Found ${response.results.length} databases:\n`);
    
    response.results.forEach((db, index) => {
      console.log(`${index + 1}. Database: ${db.title?.[0]?.text?.content || 'Untitled'}`);
      console.log(`   ID: ${db.id}`);
      console.log(`   URL: ${db.url}`);
      console.log('');
    });
    
    if (response.results.length === 0) {
      console.log('No databases found. Please make sure:');
      console.log('1. The Integration is connected to at least one database');
      console.log('2. In Notion, go to the database page');
      console.log('3. Click "..." menu → Share → Add connections');
      console.log('4. Select your "Claude" integration');
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

listDatabases();