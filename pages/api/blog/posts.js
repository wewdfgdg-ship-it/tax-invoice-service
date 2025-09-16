import { getAllBlogPosts } from '../../../lib/notion-blog';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const posts = await getAllBlogPosts();
      return res.status(200).json(posts);
    } catch (error) {
      console.error('API Error:', error);
      return res.status(500).json({ 
        error: 'Failed to fetch blog posts',
        message: error.message 
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}