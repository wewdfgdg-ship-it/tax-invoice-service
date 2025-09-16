import { getDatabase, getStatistics } from '../../../lib/notion';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { type } = req.query;
      
      if (type === 'stats') {
        const stats = await getStatistics();
        return res.status(200).json(stats);
      }
      
      const database = await getDatabase();
      return res.status(200).json(database);
    } catch (error) {
      console.error('API Error:', error);
      return res.status(500).json({ 
        error: 'Failed to fetch database',
        message: error.message 
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}