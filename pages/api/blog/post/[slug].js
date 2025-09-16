import { getPageBySlug } from '../../../../lib/notion-blog';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { slug } = req.query;
      
      if (!slug) {
        return res.status(400).json({ error: 'Slug is required' });
      }
      
      const post = await getPageBySlug(slug);
      
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      
      return res.status(200).json(post);
    } catch (error) {
      console.error('API Error:', error);
      return res.status(500).json({ 
        error: 'Failed to fetch blog post',
        message: error.message 
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}