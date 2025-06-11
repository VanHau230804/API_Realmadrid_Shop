// src/routes/Upload.js
import express from 'express';
import multer from 'multer';

const router = express.Router();

// Cấu hình multer để lưu file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/public/images'); // nhớ tạo folder này trước
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });
// Route upload
router.post('/upload', upload.array('files', 5), (req, res) => {
  console.log('Ảnh', req.files); // phải in ra mảng file
  res.status(200).json({ message: 'Upload thành công', files: req.files });
});
export default router;
