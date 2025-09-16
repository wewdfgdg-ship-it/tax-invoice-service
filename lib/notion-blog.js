import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// 페이지 ID 매핑 (슬러그 -> 노션 페이지 ID)
// 예시: 노션 URL이 https://notion.so/페이지제목-1234567890abcdef 라면
// ID는 1234567890abcdef 부분입니다
const PAGE_MAPPING = {
  'post-1': '26b8b646fb9380dcbfa7dacaaa54d6ea',  // 첫 번째 페이지
  'post-2': '26b8b646fb93801a8923edaa6ff5f234',  // 두 번째 페이지
  // 추가 페이지들...
};

// 블로그 메인 페이지 ID (하위 페이지들을 포함하는 부모 페이지)
const BLOG_ROOT_PAGE_ID = process.env.NOTION_BLOG_ROOT_ID || 'your-blog-root-id';

// 슬러그로 페이지 가져오기
export async function getPageBySlug(slug) {
  try {
    const pageId = PAGE_MAPPING[slug];
    if (!pageId) {
      throw new Error(`Page not found for slug: ${slug}`);
    }

    // 페이지 메타데이터 가져오기
    const page = await notion.pages.retrieve({ page_id: pageId });
    
    // 페이지 블록(콘텐츠) 가져오기
    const blocks = await getPageBlocks(pageId);
    
    // TOC 생성을 위한 헤딩 추출
    const headings = extractHeadings(blocks);
    
    return {
      id: pageId,
      slug,
      title: extractTitle(blocks) || getPageTitle(page),
      createdTime: page.created_time,
      lastEditedTime: page.last_edited_time,
      blocks,
      headings,
      content: await renderBlocks(blocks),
    };
  } catch (error) {
    console.error('Error fetching page by slug:', error);
    return null;
  }
}

// 모든 블로그 포스트 목록 가져오기
export async function getAllBlogPosts() {
  try {
    // 블로그 루트 페이지의 하위 페이지들 가져오기
    const response = await notion.blocks.children.list({
      block_id: BLOG_ROOT_PAGE_ID,
      page_size: 100,
    });

    const posts = [];
    
    for (const block of response.results) {
      if (block.type === 'child_page') {
        const pageId = block.id;
        const blocks = await getPageBlocks(pageId);
        
        posts.push({
          id: pageId,
          title: block.child_page.title,
          excerpt: extractExcerpt(blocks),
          thumbnail: extractFirstImage(blocks),
          createdTime: block.created_time,
          lastEditedTime: block.last_edited_time,
          slug: titleToSlug(block.child_page.title),
        });
      }
    }
    
    // 최신순 정렬
    posts.sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime));
    
    return posts;
  } catch (error) {
    console.error('Error fetching all blog posts:', error);
    return [];
  }
}

// 페이지의 모든 블록 가져오기
export async function getPageBlocks(pageId) {
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

    // 중첩된 블록(리스트 아이템 등) 처리
    for (const block of blocks) {
      if (block.has_children) {
        block.children = await getPageBlocks(block.id);
      }
    }

    return blocks;
  } catch (error) {
    console.error('Error fetching page blocks:', error);
    return blocks;
  }
}

// 블록을 HTML로 렌더링
export async function renderBlocks(blocks) {
  const html = [];
  let listItems = [];
  let listType = null;

  for (const block of blocks) {
    // 리스트 처리
    if (block.type === 'bulleted_list_item' || block.type === 'numbered_list_item') {
      const currentType = block.type === 'bulleted_list_item' ? 'ul' : 'ol';
      
      if (listType && listType !== currentType) {
        // 다른 타입의 리스트 시작
        html.push(wrapList(listItems, listType));
        listItems = [];
      }
      
      listType = currentType;
      listItems.push(await renderBlock(block));
    } else {
      // 리스트 종료
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

  // 마지막 리스트 처리
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
      const h1Text = getRichText(block.heading_1.rich_text);
      const h1Id = textToId(h1Text);
      return `<h1 id="${h1Id}">${h1Text}</h1>`;

    case 'heading_2':
      const h2Text = getRichText(block.heading_2.rich_text);
      const h2Id = textToId(h2Text);
      return `<h2 id="${h2Id}">${h2Text}</h2>`;

    case 'heading_3':
      const h3Text = getRichText(block.heading_3.rich_text);
      const h3Id = textToId(h3Text);
      return `<h3 id="${h3Id}">${h3Text}</h3>`;

    case 'bulleted_list_item':
      const bulletText = getRichText(block.bulleted_list_item.rich_text);
      let bulletHtml = `<li>${bulletText}`;
      if (block.children) {
        bulletHtml += await renderBlocks(block.children);
      }
      bulletHtml += '</li>';
      return bulletHtml;

    case 'numbered_list_item':
      const numberText = getRichText(block.numbered_list_item.rich_text);
      let numberHtml = `<li>${numberText}`;
      if (block.children) {
        numberHtml += await renderBlocks(block.children);
      }
      numberHtml += '</li>';
      return numberHtml;

    case 'image':
      const imageUrl = block.image.type === 'file' 
        ? block.image.file.url 
        : block.image.external.url;
      const caption = block.image.caption ? getRichText(block.image.caption) : '';
      return `
        <figure>
          <img src="${imageUrl}" alt="${caption}" />
          ${caption ? `<figcaption>${caption}</figcaption>` : ''}
        </figure>
      `;

    case 'code':
      const code = getRichText(block.code.rich_text);
      const language = block.code.language;
      return `<pre><code class="language-${language}">${escapeHtml(code)}</code></pre>`;

    case 'quote':
      return `<blockquote>${getRichText(block.quote.rich_text)}</blockquote>`;

    case 'callout':
      const emoji = block.callout.icon?.emoji || '💡';
      const calloutText = getRichText(block.callout.rich_text);
      return `
        <div class="callout">
          <span class="callout-emoji">${emoji}</span>
          <div class="callout-text">${calloutText}</div>
        </div>
      `;

    case 'divider':
      return '<hr />';

    case 'toggle':
      const toggleText = getRichText(block.toggle.rich_text);
      let toggleContent = '';
      if (block.children) {
        toggleContent = await renderBlocks(block.children);
      }
      return `
        <details>
          <summary>${toggleText}</summary>
          <div class="toggle-content">${toggleContent}</div>
        </details>
      `;

    case 'video':
      const videoUrl = block.video.type === 'file'
        ? block.video.file.url
        : block.video.external.url;
      return `<video controls src="${videoUrl}"></video>`;

    case 'embed':
      return `<iframe src="${block.embed.url}" frameborder="0" allowfullscreen></iframe>`;

    case 'bookmark':
      return `
        <a href="${block.bookmark.url}" class="bookmark" target="_blank" rel="noopener">
          <div class="bookmark-title">${block.bookmark.caption ? getRichText(block.bookmark.caption) : block.bookmark.url}</div>
          <div class="bookmark-url">${block.bookmark.url}</div>
        </a>
      `;

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
    
    if (annotations.color && annotations.color !== 'default') {
      text = `<span style="color: var(--color-${annotations.color})">${text}</span>`;
    }
    
    return text;
  }).join('');
}

// 헤딩 추출 (TOC용)
function extractHeadings(blocks) {
  const headings = [];
  
  blocks.forEach(block => {
    if (block.type === 'heading_1' || block.type === 'heading_2' || block.type === 'heading_3') {
      const level = parseInt(block.type.split('_')[1]);
      const text = getRichText(block[block.type].rich_text);
      
      headings.push({
        level,
        text,
        id: textToId(text),
      });
    }
  });
  
  return headings;
}

// 제목 추출
function extractTitle(blocks) {
  const firstHeading = blocks.find(block => block.type === 'heading_1');
  if (firstHeading) {
    return getRichText(firstHeading.heading_1.rich_text);
  }
  return null;
}

// 요약 추출
function extractExcerpt(blocks, maxLength = 150) {
  const firstParagraph = blocks.find(block => block.type === 'paragraph');
  if (firstParagraph) {
    const text = getRichText(firstParagraph.paragraph.rich_text);
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }
  return '';
}

// 첫 번째 이미지 추출
function extractFirstImage(blocks) {
  const imageBlock = blocks.find(block => block.type === 'image');
  if (imageBlock) {
    return imageBlock.image.type === 'file' 
      ? imageBlock.image.file.url 
      : imageBlock.image.external.url;
  }
  return null;
}

// 페이지 제목 가져오기
function getPageTitle(page) {
  // 페이지 속성에서 제목 찾기
  for (const [key, value] of Object.entries(page.properties)) {
    if (value.type === 'title' && value.title.length > 0) {
      return value.title[0].text.content;
    }
  }
  return 'Untitled';
}

// 유틸리티 함수들
function titleToSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function textToId(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

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

// 관련 글 추천 (간단한 키워드 매칭)
export async function getRelatedPosts(currentSlug, limit = 2) {
  try {
    const allPosts = await getAllBlogPosts();
    
    // 현재 글 제외
    const otherPosts = allPosts.filter(post => post.slug !== currentSlug);
    
    // 간단한 추천 로직 (최신 글 2개)
    // 실제로는 태그, 카테고리, 키워드 매칭 등을 사용할 수 있음
    return otherPosts.slice(0, limit);
  } catch (error) {
    console.error('Error getting related posts:', error);
    return [];
  }
}