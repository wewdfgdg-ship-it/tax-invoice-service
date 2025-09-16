import { Client } from '@notionhq/client';

// Notion 클라이언트 초기화
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const databaseId = process.env.NOTION_DATABASE_ID;

// 데이터베이스에서 모든 항목 가져오기
export async function getDatabase() {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    });
    return response.results;
  } catch (error) {
    console.error('Error fetching database:', error);
    throw error;
  }
}

// 새 페이지(항목) 생성
export async function createPage(data) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        '사업자번호': {
          title: [
            {
              text: {
                content: data.businessNumber || '',
              },
            },
          ],
        },
        '회사명': {
          rich_text: [
            {
              text: {
                content: data.companyName || '',
              },
            },
          ],
        },
        '상태': {
          select: {
            name: data.status || '대기중',
          },
        },
        '등록일': {
          date: {
            start: new Date().toISOString(),
          },
        },
        '비고': {
          rich_text: [
            {
              text: {
                content: data.note || '',
              },
            },
          ],
        },
      },
    });
    return response;
  } catch (error) {
    console.error('Error creating page:', error);
    throw error;
  }
}

// 페이지 업데이트
export async function updatePage(pageId, data) {
  try {
    const response = await notion.pages.update({
      page_id: pageId,
      properties: {
        '상태': {
          select: {
            name: data.status || '완료',
          },
        },
        '처리일': {
          date: {
            start: new Date().toISOString(),
          },
        },
        '비고': {
          rich_text: [
            {
              text: {
                content: data.note || '',
              },
            },
          ],
        },
      },
    });
    return response;
  } catch (error) {
    console.error('Error updating page:', error);
    throw error;
  }
}

// 특정 사업자번호로 페이지 검색
export async function findPageByBusinessNumber(businessNumber) {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: '사업자번호',
        title: {
          equals: businessNumber,
        },
      },
    });
    return response.results[0] || null;
  } catch (error) {
    console.error('Error finding page:', error);
    throw error;
  }
}

// 페이지 삭제
export async function deletePage(pageId) {
  try {
    const response = await notion.pages.update({
      page_id: pageId,
      archived: true,
    });
    return response;
  } catch (error) {
    console.error('Error deleting page:', error);
    throw error;
  }
}

// 통계 정보 가져오기
export async function getStatistics() {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    });
    
    const stats = {
      total: response.results.length,
      completed: 0,
      pending: 0,
      error: 0,
    };
    
    response.results.forEach((page) => {
      const status = page.properties['상태']?.select?.name;
      if (status === '완료') stats.completed++;
      else if (status === '대기중') stats.pending++;
      else if (status === '오류') stats.error++;
    });
    
    return stats;
  } catch (error) {
    console.error('Error getting statistics:', error);
    throw error;
  }
}