import { getBlogPostsFromDatabase } from '../../lib/notion-database';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const posts = await getBlogPostsFromDatabase();
    
    // 디버깅 정보 포함
    console.log(`API: Found ${posts.length} posts`);
    posts.forEach(post => {
      console.log(`- ${post.title} (Published: ${post.published})`);
    });
    
    res.status(200).json({ 
      success: true,
      count: posts.length,
      posts 
    });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ 
      success: false,
      error: error.message,
      details: error.stack
    });
  }
}