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
export const getKitsByCategoryID = async (req, res) => {
  try {
    const data = await Kit.find({ categoryID: req.params.id });
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
    const { name, price, size, categoryID } = req.body;
    const sizeArray = size.split(',').map(s => ({ label: s.trim() }));
    const images = req.files.map(file => ({
      url: `${req.protocol}://${req.get('host')}/images/${file.filename}`
    }));

    const newKit = new Kit({
      name,
      price,
      size: sizeArray,
      images,
      categoryID
    });
    await newKit.save();
    res.status(201).json({ message: 'Thêm thành công', kit: newKit });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Lỗi server', detail: error.message });
  }
};
export const updateKit = async (req, res) => {
  try {
    const kitId = req.params.id;
    const { name, price, size, categoryID } = req.body;

    const kit = await Kit.findById(kitId);
    if (!kit) {
      return res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
    }

    // Chuyển size từ string sang mảng { label }
    const sizeArray = size
      ? size.split(',').map(s => ({ label: s.trim() }))
      : kit.size;

    // Nếu có ảnh mới
    let images = kit.images; // giữ ảnh cũ mặc định
    if (req.files && req.files.length > 0) {
      images = req.files.map(file => ({
        url: `${req.protocol}://${req.get('host')}/images/${file.filename}`
      }));
    }

    // So sánh danh mục cũ và mới
    const oldCategoryId = kit.categoryID;
    const isCategoryChanged = oldCategoryId.toString() !== categoryID;

    // Cập nhật sản phẩm
    const updatedKit = await Kit.findByIdAndUpdate(
      kitId,
      {
        name: name || kit.name,
        price: price || kit.price,
        size: sizeArray,
        images,
        categoryID: categoryID || kit.categoryID
      },
      { new: true }
    );

    // Nếu thay đổi danh mục thì cập nhật lại quan hệ
    if (isCategoryChanged) {
      // Xóa khỏi danh mục cũ
      await Category.findByIdAndUpdate(oldCategoryId, {
        $pull: { kitID: kitId }
      });

      // Thêm vào danh mục mới
      await Category.findByIdAndUpdate(categoryID, {
        $addToSet: { kitID: kitId }
      });
    }

    return res
      .status(200)
      .json({ message: 'Cập nhật thành công', kit: updatedKit });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Lỗi server', detail: error.message });
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
