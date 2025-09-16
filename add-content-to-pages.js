require('dotenv').config();
const { Client } = require('@notionhq/client');

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

async function addContentToPages() {
  try {
    console.log('페이지에 콘텐츠 추가 중...\n');
    
    // 페이지별 콘텐츠 추가
    const pageContents = [
      {
        pageId: '26c8b646-fb93-801f-8a10-f551cbf6e530', // 세 번째 테스트 글
        content: [
          {
            object: 'block',
            type: 'heading_1',
            heading_1: {
              rich_text: [{
                type: 'text',
                text: { content: '세 번째 테스트 글입니다' }
              }]
            }
          },
          {
            object: 'block',
            type: 'paragraph',
            paragraph: {
              rich_text: [{
                type: 'text',
                text: { content: '이것은 세 번째 테스트 글의 내용입니다. 노션 API를 통해 실시간으로 동기화되는 콘텐츠를 확인할 수 있습니다.' }
              }]
            }
          },
          {
            object: 'block',
            type: 'heading_2',
            heading_2: {
              rich_text: [{
                type: 'text',
                text: { content: '주요 기능' }
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
          },
          {
            object: 'block',
            type: 'bulleted_list_item',
            bulleted_list_item: {
              rich_text: [{
                type: 'text',
                text: { content: 'HTML 변환' }
              }]
            }
          },
          {
            object: 'block',
            type: 'bulleted_list_item',
            bulleted_list_item: {
              rich_text: [{
                type: 'text',
                text: { content: '자동 TOC 생성' }
              }]
            }
          }
        ]
      },
      {
        pageId: '26c8b646-fb93-80fd-b94f-ceaad41564f1', // 온라인전단지란?
        content: [
          {
            object: 'block',
            type: 'heading_1',
            heading_1: {
              rich_text: [{
                type: 'text',
                text: { content: '온라인전단지란 무엇인가?' }
              }]
            }
          },
          {
            object: 'block',
            type: 'paragraph',
            paragraph: {
              rich_text: [{
                type: 'text',
                text: { content: '온라인전단지는 디지털 환경에서 제품이나 서비스를 홍보하는 전자 마케팅 도구입니다.' }
              }]
            }
          },
          {
            object: 'block',
            type: 'heading_2',
            heading_2: {
              rich_text: [{
                type: 'text',
                text: { content: '온라인전단지의 장점' }
              }]
            }
          },
          {
            object: 'block',
            type: 'numbered_list_item',
            numbered_list_item: {
              rich_text: [{
                type: 'text',
                text: { content: '비용 절감: 인쇄 비용이 필요 없음' }
              }]
            }
          },
          {
            object: 'block',
            type: 'numbered_list_item',
            numbered_list_item: {
              rich_text: [{
                type: 'text',
                text: { content: '빠른 배포: 즉시 전달 가능' }
              }]
            }
          },
          {
            object: 'block',
            type: 'numbered_list_item',
            numbered_list_item: {
              rich_text: [{
                type: 'text',
                text: { content: '추적 가능: 클릭률, 조회수 등 분석 가능' }
              }]
            }
          },
          {
            object: 'block',
            type: 'quote',
            quote: {
              rich_text: [{
                type: 'text',
                text: { content: '디지털 시대의 마케팅은 온라인전단지로부터 시작됩니다.' }
              }]
            }
          }
        ]
      },
      {
        pageId: '26c8b646-fb93-80e4-93b6-d9dc9aa70be6', // 체험단이란?
        content: [
          {
            object: 'block',
            type: 'heading_1',
            heading_1: {
              rich_text: [{
                type: 'text',
                text: { content: '체험단이란?' }
              }]
            }
          },
          {
            object: 'block',
            type: 'paragraph',
            paragraph: {
              rich_text: [{
                type: 'text',
                text: { content: '체험단은 제품이나 서비스를 직접 체험하고 솔직한 후기를 공유하는 소비자 그룹입니다.' }
              }]
            }
          },
          {
            object: 'block',
            type: 'heading_2',
            heading_2: {
              rich_text: [{
                type: 'text',
                text: { content: '체험단 마케팅의 효과' }
              }]
            }
          },
          {
            object: 'block',
            type: 'paragraph',
            paragraph: {
              rich_text: [{
                type: 'text',
                text: { content: '진정성 있는 리뷰를 통해 브랜드 신뢰도를 높이고 구매 전환율을 개선할 수 있습니다.' }
              }]
            }
          },
          {
            object: 'block',
            type: 'heading_3',
            heading_3: {
              rich_text: [{
                type: 'text',
                text: { content: '체험단 선정 기준' }
              }]
            }
          },
          {
            object: 'block',
            type: 'bulleted_list_item',
            bulleted_list_item: {
              rich_text: [{
                type: 'text',
                text: { content: '활발한 SNS 활동' }
              }]
            }
          },
          {
            object: 'block',
            type: 'bulleted_list_item',
            bulleted_list_item: {
              rich_text: [{
                type: 'text',
                text: { content: '콘텐츠 제작 능력' }
              }]
            }
          },
          {
            object: 'block',
            type: 'bulleted_list_item',
            bulleted_list_item: {
              rich_text: [{
                type: 'text',
                text: { content: '타겟 고객층과의 일치' }
              }]
            }
          },
          {
            object: 'block',
            type: 'divider',
            divider: {}
          },
          {
            object: 'block',
            type: 'callout',
            callout: {
              rich_text: [{
                type: 'text',
                text: { content: '체험단 마케팅은 소비자와 브랜드가 함께 성장하는 Win-Win 전략입니다.' }
              }],
              icon: { emoji: '💡' }
            }
          }
        ]
      }
    ];
    
    for (const { pageId, content } of pageContents) {
      try {
        // 먼저 기존 블록들 삭제 (선택사항)
        const existingBlocks = await notion.blocks.children.list({
          block_id: pageId,
          page_size: 100
        });
        
        // 새로운 콘텐츠 추가
        await notion.blocks.children.append({
          block_id: pageId,
          children: content
        });
        
        console.log(`✅ 페이지 ${pageId.slice(0, 8)}... 에 콘텐츠 추가 완료`);
      } catch (error) {
        console.error(`❌ 페이지 ${pageId} 콘텐츠 추가 실패:`, error.message);
      }
    }
    
    console.log('\n완료! 이제 상세 보기를 클릭하면 콘텐츠가 표시됩니다.');
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

addContentToPages();