// src/middleware/uploadValidation.js
export const validateFileUpload = (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'Vui lòng chọn ít nhất một file' });
  }

  // Kiểm tra từng file
  for (const file of req.files) {
    if (file.size > 5 * 1024 * 1024) {
      return res.status(400).json({
        error: `File ${file.originalname} vượt quá 5MB`
      });
    }
  }

  next();
};
