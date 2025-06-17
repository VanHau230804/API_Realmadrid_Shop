// src/routes/Upload.js
import express from 'express';
import upload from '../middleware/middlewareMulter.js';
import { validateFileUpload } from '../middleware/uploadValidation.js';

const router = express.Router();

/**
 * @route POST /upload
 * @desc Upload tối đa 5 ảnh
 * @access Private (nếu cần)
 * @param {Array} images - Mảng file ảnh (max 5)
 */
router.post(
  '/upload',
  upload.array('images', 5),
  validateFileUpload, // Middleware kiểm tra file
  async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res
          .status(400)
          .json({ error: 'Không có file nào được tải lên' });
      }
      // Xử lý thông tin file trước khi trả về
      const processedFiles = req.files.map(file => ({
        originalName: file.originalname,
        fileName: file.filename,
        path: file.path,
        size: file.size,
        mimetype: file.mimetype,
        url: `/src/public/images/${file.filename}` // URL truy cập file
      }));

      console.log('Ảnh đã upload:', processedFiles);

      res.status(200).json({
        success: true,
        message: 'Upload thành công',
        count: processedFiles.length,
        files: processedFiles
      });
    } catch (error) {
      console.error('Lỗi khi upload:', error);
      res.status(500).json({
        success: false,
        error: 'Đã xảy ra lỗi khi upload file',
        details: error.message
      });
    }
  }
);

export default router;
