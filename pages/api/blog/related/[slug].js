import { getRelatedPosts } from '../../../../lib/notion-blog';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { slug } = req.query;
      
      if (!slug) {
        return res.status(400).json({ error: 'Slug is required' });
      }
      
      const relatedPosts = await getRelatedPosts(slug);
      
      return res.status(200).json(relatedPosts);
    } catch (error) {
      console.error('API Error:', error);
      return res.status(500).json({ 
        error: 'Failed to fetch related posts',
        message: error.message 
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}