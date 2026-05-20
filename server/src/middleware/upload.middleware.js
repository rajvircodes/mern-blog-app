const multer = require("multer");
const path = require('path')
// ====== Where & how store the files

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

// ======= Filter - only allow image files

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpg|jpeg|png|webp/;


const isValidExt = allowedTypes.test(
  path.extname(file.originalname).toLowerCase(),
);

const isValidMime = allowedTypes.test(file.mimetype);

if (isValidExt && isValidMime) {
  cb(null, true); // accept file
} else {
  cb(new Error( "Only image files are allowed"), false); // Reject
}
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});

module.exports = upload;
