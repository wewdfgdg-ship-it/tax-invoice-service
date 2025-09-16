require('dotenv').config();
const { Client } = require('@notionhq/client');

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

async function addNewPageToDatabase() {
  try {
    console.log('=== 데이터베이스에 새 페이지 자동 추가 테스트 ===\n');
    
    const databaseId = process.env.NOTION_DATABASE_ID;
    
    // 새 페이지를 데이터베이스에 추가
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        '제목': {
          title: [
            {
              text: {
                content: '자동 추가 테스트 페이지'
              }
            }
          ]
        },
        'Published': {
          checkbox: true
        },
        'PublishedDate ': {
          date: {
            start: new Date().toISOString().split('T')[0]
          }
        },
        '카테고리': {
          select: {
            name: '테스트'
          }
        }
      },
      children: [
        {
          object: 'block',
          type: 'heading_1',
          heading_1: {
            rich_text: [{
              type: 'text',
              text: { content: '자동으로 추가된 페이지입니다' }
            }]
          }
        },
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [{
              type: 'text',
              text: { content: '데이터베이스에 페이지를 추가하면 자동으로 웹사이트에 표시됩니다. 별도의 설정이나 공유 작업이 필요 없습니다!' }
            }]
          }
        },
        {
          object: 'block',
          type: 'heading_2',
          heading_2: {
            rich_text: [{
              type: 'text',
              text: { content: '자동 동기화 기능' }
            }]
          }
        },
        {
          object: 'block',
          type: 'bulleted_list_item',
          bulleted_list_item: {
            rich_text: [{
              type: 'text',
              text: { content: '데이터베이스에만 추가하면 OK' }
            }]
          }
        },
        {
          object: 'block',
          type: 'bulleted_list_item',
          bulleted_list_item: {
            rich_text: [{
              type: 'text',
              text: { content: '별도 권한 설정 불필요' }
            }]
          }
        },
        {
          object: 'block',
          type: 'bulleted_list_item',
          bulleted_list_item: {
            rich_text: [{
              type: 'text',
              text: { content: '실시간 동기화' }
            }]
          }
        }
      ]
    });
    
    console.log('✅ 새 페이지가 데이터베이스에 자동 추가되었습니다!');
    console.log('페이지 ID:', response.id);
    console.log('페이지 URL:', response.url);
    console.log('\n이제 웹사이트에서 "모든 포스트 가져오기"를 클릭하면');
    console.log('이 페이지가 자동으로 표시됩니다!');
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

addNewPageToDatabase();