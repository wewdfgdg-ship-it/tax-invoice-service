import { getBlogPostsFromDatabase, getPostBySlug } from '../../../lib/notion-database';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { slug } = req.query;
      
      if (slug) {
        // 특정 포스트 가져오기
        const post = await getPostBySlug(slug);
        
        if (!post) {
          return res.status(404).json({ 
            error: 'Post not found',
            message: `No post found with slug: ${slug}`
          });
        }
        
        return res.status(200).json({
          success: true,
          post
        });
      } else {
        // 모든 포스트 목록 가져오기
        const posts = await getBlogPostsFromDatabase();
        
        return res.status(200).json({
          success: true,
          posts,
          count: posts.length
        });
      }
    } catch (error) {
      console.error('API Error:', error);
      return res.status(500).json({ 
        error: 'Failed to fetch from database',
        message: error.message,
        details: error.response?.data || error
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}