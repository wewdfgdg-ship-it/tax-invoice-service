import { updatePage, findPageByBusinessNumber } from '../../../lib/notion';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    try {
      const { pageId, businessNumber, status, note } = req.body;
      
      let targetPageId = pageId;
      
      // pageId가 없으면 businessNumber로 검색
      if (!targetPageId && businessNumber) {
        const page = await findPageByBusinessNumber(businessNumber);
        if (page) {
          targetPageId = page.id;
        } else {
          return res.status(404).json({ 
            error: 'Page not found with the given business number' 
          });
        }
      }
      
      if (!targetPageId) {
        return res.status(400).json({ 
          error: 'Page ID or business number is required' 
        });
      }
      
      const updatedPage = await updatePage(targetPageId, {
        status,
        note,
      });
      
      return res.status(200).json({ 
        success: true,
        page: updatedPage 
      });
    } catch (error) {
      console.error('API Error:', error);
      return res.status(500).json({ 
        error: 'Failed to update page',
        message: error.message 
      });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}