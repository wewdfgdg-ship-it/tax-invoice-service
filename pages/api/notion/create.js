import { createPage } from '../../../lib/notion';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { businessNumber, companyName, status, note } = req.body;
      
      if (!businessNumber) {
        return res.status(400).json({ 
          error: 'Business number is required' 
        });
      }
      
      const page = await createPage({
        businessNumber,
        companyName,
        status: status || '대기중',
        note,
      });
      
      return res.status(201).json({ 
        success: true,
        page 
      });
    } catch (error) {
      console.error('API Error:', error);
      return res.status(500).json({ 
        error: 'Failed to create page',
        message: error.message 
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}