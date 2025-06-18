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
    const { name, content } = req.body;
    const images = req.files.map(file => ({
      url: `${req.protocol}://${req.get('host')}/images/${file.filename}`
    }));
    const newNews = new New({ name, images, content });
    await newNews.save();
    res.status(201).json(newNews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const updateNew = async (req, res) => {
  try {
    const newsId = req.params.id;
    const { name, content } = req.body;
    const news = await New.findById(newsId);
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }
    let images = New.images;
    if (req.files && req.files.length > 0) {
      images = req.files.map(file => ({
        url: `${req.protocol}://${req.get('host')}/images/${file.filename}`
      }));
    }
    const updateNews = await New.findByIdAndUpdate(
      { _id: req.params.id },
      {
        name: name || news.name,
        content: content || news.content,
        images
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: 'Cập nhật thành công', new: updateNews });
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
