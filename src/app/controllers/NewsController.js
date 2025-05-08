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
export const getNewById = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await New.findById(id);
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const addNew = async (req, res) => {
  try {
    const newNews = new New(req.body);
    await newNews.save();
    res.status(201).json(newNews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const updateNew = async (req, res) => {
  try {
    const data = await New.findByIdAndUpdate({ _id: req.params.id }, req.body, {
      new: true
    });
    if (data.length < 0) {
      return res.status(404).json({ message: 'News not found' });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteNew = async (req, res) => {
  try {
    const data = await New.deleteOne({ _id: req.params.id });
    if (data.length < 0) {
      return res.status(404).json({ message: 'No New found' });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
