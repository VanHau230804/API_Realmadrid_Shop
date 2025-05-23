import Category from '../../models/Category.js';
import Kit from '../../models/Kit.js';
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

export const addCategory = async (req, res) => {
  try {
    const data = await Category(req.body).save();
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const data = await Category.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!data) {
      return res.status(404).json({ message: 'No category found' });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    await Kit.updateMany({ categoryID: req.params.id }, { categoryID: null });
    const data = await Category.deleteOne({ _id: req.params.id });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
