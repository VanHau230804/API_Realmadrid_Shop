import Kit from '../../models/Kit.js';
export const getKits = async (req, res) => {
  try {
    const kits = await Kit.find().populate('categoryID');
    if (kits.length < 0) {
      return res.status(404).json({ message: 'No products found' });
    }
    res.status(200).json(kits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
