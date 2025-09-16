import { Client } from '@notionhq/client';

// 환경변수 확인
console.log('NOTION_API_KEY exists:', !!process.env.NOTION_API_KEY);
console.log('NOTION_DATABASE_ID:', process.env.NOTION_DATABASE_ID);
console.log('NOTION_BLOG_ROOT_ID:', process.env.NOTION_BLOG_ROOT_ID);
console.log('Using Database ID:', process.env.NOTION_BLOG_ROOT_ID || process.env.NOTION_DATABASE_ID);

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// notion 객체 확인
console.log('Notion client initialized:', !!notion);
console.log('Notion databases available:', !!notion.databases);

// 블로그 데이터베이스 ID 사용 (NOTION_BLOG_ROOT_ID)
const databaseId = process.env.NOTION_BLOG_ROOT_ID || process.env.NOTION_DATABASE_ID;

// 데이터베이스에서 모든 블로그 포스트 가져오기
export async function getBlogPostsFromDatabase() {
  try {
    // Search API를 사용하여 데이터베이스의 모든 페이지 가져오기
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
    
    // 현재 데이터베이스에 속한 페이지만 필터링
    const pages = searchResponse.results.filter(
      page => page.parent?.database_id === databaseId
    );
    
    // Published가 true인 페이지만 필터링하고 포맷팅
    const posts = pages
      .filter(page => page.properties?.Published?.checkbox === true)
      .map((page) => {
        const properties = page.properties;
        
        return {
          id: page.id,
          title: properties['제목']?.title?.[0]?.text?.content || 
                 properties['Title']?.title?.[0]?.text?.content || 'Untitled',
          slug: properties['Slug']?.rich_text?.[0]?.text?.content || page.id,
          excerpt: properties['Excerpt']?.rich_text?.[0]?.text?.content || '',
          category: properties['카테고리']?.select?.name || 
                   properties['Category']?.select?.name || 'General',
          tags: properties['tag']?.multi_select?.map(tag => tag.name) || 
                properties['Tags']?.multi_select?.map(tag => tag.name) || [],
          published: properties['Published']?.checkbox || false,
          publishedDate: properties['PublishedDate ']?.date?.start || 
                        properties['Published Date']?.date?.start || null,
          thumbnail: properties['Thumbnail']?.files?.[0]?.file?.url || 
                    properties['Thumbnail']?.files?.[0]?.external?.url || null,
          author: properties['Author']?.rich_text?.[0]?.text?.content || 'Admin',
        };
      });
    
    return posts;
  } catch (error) {
    console.error('Error fetching blog posts from database:', error);
    throw error;
  }
}

// 슬러그(또는 ID)로 특정 포스트 가져오기
export async function getPostBySlug(slug) {
  try {
    // slug가 실제로는 페이지 ID이므로 직접 페이지를 가져옵니다
    let page;
    
    try {
      // 먼저 ID로 직접 페이지 가져오기 시도
      page = await notion.pages.retrieve({ page_id: slug });
    } catch (error) {
      // ID로 못 찾으면 null 반환
      console.log(`Page not found with ID: ${slug}`);
      return null;
    }

    if (!page) {
      return null;
    }
    const properties = page.properties;
    
    // 페이지 콘텐츠 가져오기
    const blocks = await getPageContent(page.id);
    
    return {
      id: page.id,
      title: properties['제목']?.title?.[0]?.text?.content || 
             properties['Title']?.title?.[0]?.text?.content || 'Untitled',
      slug: page.id,  // ID를 slug로 사용
      excerpt: properties['Excerpt']?.rich_text?.[0]?.text?.content || '',
      category: properties['카테고리']?.select?.name || 
               properties['Category']?.select?.name || 'General',
      tags: properties['tag']?.multi_select?.map(tag => tag.name) || 
            properties['Tags']?.multi_select?.map(tag => tag.name) || [],
      published: properties['Published']?.checkbox || false,
      publishedDate: properties['PublishedDate ']?.date?.start || 
                    properties['Published Date']?.date?.start || null,
      thumbnail: properties['Thumbnail']?.files?.[0]?.file?.url || 
                 properties['Thumbnail']?.files?.[0]?.external?.url || null,
      author: properties['Author']?.rich_text?.[0]?.text?.content || 'Admin',
      content: blocks,
      htmlContent: await renderBlocksToHtml(blocks)
    };
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    throw error;
  }
}

// 페이지 콘텐츠(블록) 가져오기
export async function getPageContent(pageId) {
  const blocks = [];
  let cursor = undefined;

  try {
    while (true) {
      const response = await notion.blocks.children.list({
        block_id: pageId,
        start_cursor: cursor,
        page_size: 100,
      });

      blocks.push(...response.results);

      if (!response.has_more) {
        break;
      }
      cursor = response.next_cursor;
    }

    // 중첩된 블록 처리
    for (const block of blocks) {
      if (block.has_children) {
        block.children = await getPageContent(block.id);
      }
    }

    return blocks;
  } catch (error) {
    console.error('Error fetching page content:', error);
    return blocks;
  }
}

// 노션 블록을 HTML로 변환
export async function renderBlocksToHtml(blocks) {
  const html = [];
  let listItems = [];
  let listType = null;

  for (const block of blocks) {
    // 리스트 처리
    if (block.type === 'bulleted_list_item' || block.type === 'numbered_list_item') {
      const currentType = block.type === 'bulleted_list_item' ? 'ul' : 'ol';
      
      if (listType && listType !== currentType) {
        html.push(wrapList(listItems, listType));
        listItems = [];
      }
      
      listType = currentType;
      listItems.push(await renderBlock(block));
    } else {
      if (listItems.length > 0) {
        html.push(wrapList(listItems, listType));
        listItems = [];
        listType = null;
      }
      
      const rendered = await renderBlock(block);
      if (rendered) {
        html.push(rendered);
      }
    }
  }

  if (listItems.length > 0) {
    html.push(wrapList(listItems, listType));
  }

  return html.join('\n');
}

// 개별 블록 렌더링
async function renderBlock(block) {
  switch (block.type) {
    case 'paragraph':
      const text = getRichText(block.paragraph.rich_text);
      return text ? `<p>${text}</p>` : '';

    case 'heading_1':
      return `<h1>${getRichText(block.heading_1.rich_text)}</h1>`;

    case 'heading_2':
      return `<h2>${getRichText(block.heading_2.rich_text)}</h2>`;

    case 'heading_3':
      return `<h3>${getRichText(block.heading_3.rich_text)}</h3>`;

    case 'bulleted_list_item':
      const bulletText = getRichText(block.bulleted_list_item.rich_text);
      let bulletHtml = `<li>${bulletText}`;
      if (block.children) {
        bulletHtml += await renderBlocksToHtml(block.children);
      }
      bulletHtml += '</li>';
      return bulletHtml;

    case 'numbered_list_item':
      const numberText = getRichText(block.numbered_list_item.rich_text);
      let numberHtml = `<li>${numberText}`;
      if (block.children) {
        numberHtml += await renderBlocksToHtml(block.children);
      }
      numberHtml += '</li>';
      return numberHtml;

    case 'image':
      const imageUrl = block.image.type === 'file' 
        ? block.image.file.url 
        : block.image.external?.url;
      const caption = block.image.caption ? getRichText(block.image.caption) : '';
      return `
        <figure>
          <img src="${imageUrl}" alt="${caption}" style="max-width: 100%; height: auto;" />
          ${caption ? `<figcaption>${caption}</figcaption>` : ''}
        </figure>
      `;

    case 'code':
      const code = getRichText(block.code.rich_text);
      const language = block.code.language;
      return `<pre><code class="language-${language}">${escapeHtml(code)}</code></pre>`;

    case 'quote':
      return `<blockquote>${getRichText(block.quote.rich_text)}</blockquote>`;

    case 'divider':
      return '<hr />';

    case 'toggle':
      const toggleText = getRichText(block.toggle.rich_text);
      let toggleContent = '';
      if (block.children) {
        toggleContent = await renderBlocksToHtml(block.children);
      }
      return `
        <details>
          <summary>${toggleText}</summary>
          <div>${toggleContent}</div>
        </details>
      `;

    case 'callout':
      const emoji = block.callout.icon?.emoji || '💡';
      const calloutText = getRichText(block.callout.rich_text);
      return `
        <div style="padding: 16px; background: #f5f5f5; border-radius: 8px; margin: 16px 0;">
          <span style="font-size: 1.5em; margin-right: 8px;">${emoji}</span>
          <span>${calloutText}</span>
        </div>
      `;

    case 'to_do':
      const todoText = getRichText(block.to_do.rich_text);
      const checked = block.to_do.checked;
      return `
        <div style="display: flex; align-items: flex-start; margin: 8px 0;">
          <input type="checkbox" ${checked ? 'checked' : ''} disabled style="margin-right: 8px; margin-top: 3px;" />
          <span ${checked ? 'style="text-decoration: line-through; color: #999;"' : ''}>${todoText}</span>
        </div>
      `;

    case 'pdf':
      const pdfUrl = block.pdf.type === 'file' 
        ? block.pdf.file.url 
        : block.pdf.external?.url;
      return `
        <div style="margin: 16px 0; padding: 16px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <a href="${pdfUrl}" target="_blank" style="display: flex; align-items: center; text-decoration: none; color: #333;">
            <span style="font-size: 1.5em; margin-right: 8px;">📄</span>
            <span>PDF 문서 보기</span>
          </a>
        </div>
      `;

    case 'video':
      const videoUrl = block.video.type === 'file'
        ? block.video.file.url
        : block.video.external?.url;
      return `
        <div style="margin: 16px 0;">
          <video controls style="max-width: 100%; height: auto;">
            <source src="${videoUrl}" />
          </video>
        </div>
      `;

    case 'file':
      const fileUrl = block.file.type === 'file'
        ? block.file.file.url
        : block.file.external?.url;
      const fileName = block.file.name || '파일';
      return `
        <div style="margin: 16px 0; padding: 12px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <a href="${fileUrl}" target="_blank" style="display: flex; align-items: center; text-decoration: none; color: #333;">
            <span style="font-size: 1.2em; margin-right: 8px;">📎</span>
            <span>${fileName}</span>
          </a>
        </div>
      `;

    case 'bookmark':
      const bookmarkUrl = block.bookmark.url;
      return `
        <div style="margin: 16px 0; padding: 12px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <a href="${bookmarkUrl}" target="_blank" style="text-decoration: none; color: #0066cc;">
            🔗 ${bookmarkUrl}
          </a>
        </div>
      `;

    case 'table':
      // 테이블은 복잡하므로 간단히 처리
      return `<div style="margin: 16px 0; padding: 12px; background: #f5f5f5; border-radius: 8px;">📊 테이블 (상세 내용은 Notion에서 확인)</div>`;

    case 'column_list':
    case 'column':
      // 컬럼 레이아웃은 지원하지 않음
      return '';

    default:
      console.log('Unsupported block type:', block.type);
      return '';
  }
}

// Rich text 처리
function getRichText(richTextArray) {
  if (!richTextArray || richTextArray.length === 0) return '';
  
  return richTextArray.map(richText => {
    let text = richText.text.content;
    const annotations = richText.annotations;
    
    if (annotations.bold) text = `<strong>${text}</strong>`;
    if (annotations.italic) text = `<em>${text}</em>`;
    if (annotations.underline) text = `<u>${text}</u>`;
    if (annotations.strikethrough) text = `<s>${text}</s>`;
    if (annotations.code) text = `<code>${text}</code>`;
    
    if (richText.text.link) {
      text = `<a href="${richText.text.link.url}" target="_blank" rel="noopener">${text}</a>`;
    }
    
    return text;
  }).join('');
}

// 유틸리티 함수들
function wrapList(items, type) {
  return `<${type}>${items.join('')}</${type}>`;
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

