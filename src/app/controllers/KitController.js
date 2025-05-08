import Kit from '../../models/Kit.js';
import Category from '../../models/Category.js';
export const getKits = async (req, res) => {
  try {
    const kits = await Kit.find().populate('categoryID');
    if (kits.length < 0) {
      return res.status(404).json({ message: 'No Kits found' });
    }
    res.status(200).json(kits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getKitByID = async (req, res) => {
  try {
    const data = await Kit.findOne({ _id: req.params.id });
    if (data.length < 0) {
      return res.status(404).json({ message: 'No Kits found' });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const addKit = async (req, res) => {
  try {
    const data = await Kit(req.body).save();
    if (req.body.categoryID) {
      const category = Category.findById(req.body.categoryID);
      await category.updateOne({ $push: { kitID: data._id } });
    }
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const updateKit = async (req, res) => {
  try {
    const kitId = req.params.id;
    const newCategoryId = req.body.categoryID;
    // get category old of Kit
    const kit = await Kit.findById(kitId);
    const oldCategoryId = kit.categoryID;
    // if new category unduplicated with category old, handle update
    if (oldCategoryId.toString() !== newCategoryId) {
      // 1. Cập nhật sản phẩm với danh mục mới
      const updatedKit = await Kit.findByIdAndUpdate(KitId, req.body, {
        new: true
      });

      // 2. Xóa sản phẩm khỏi danh sách sản phẩm cũ của danh mục cũ
      await Category.findByIdAndUpdate(oldCategoryId, {
        $pull: { kitID: kitId }
      });

      // 3. Thêm sản phẩm vào danh sách sản phẩm mới của danh mục mới
      await Category.findByIdAndUpdate(newCategoryId, {
        $addToSet: { kitID: kitId }
      });

      return res.status(200).json(updatedKit);
    } else {
      // Nếu danh mục mới trùng với danh mục cũ, chỉ cần cập nhật thông tin sản phẩm
      const updatedKit = await Kit.findByIdAndUpdate(kitId, req.body, {
        new: true
      });

      return res.status(200).json(updatedKit);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const deleteKit = async (req, res) => {
  try {
    await Category.updateMany(
      { kitID: req.params.id },
      { $pull: { kitID: req.params.id } }
    );
    const data = await Kit.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(404).json({ message: 'No Kit found' });
    }
    res.status(200).json('Delete successfully');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
