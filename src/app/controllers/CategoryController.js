import Category from '../../models/Category.js';
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories) {
      return res.status(404).json({ message: 'No categories found' });
    }
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
