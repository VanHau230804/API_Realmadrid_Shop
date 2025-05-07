import New from '../../models/New.js';
export const getNews = async (req, res) => {
  try {
    const news = await New.find();
    if (news.length < 0) {
      return res.status(404).json({ message: 'No news found' });
    }
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
