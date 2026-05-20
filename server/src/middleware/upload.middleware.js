const multer = require("multer");
const path = require("path");

// ====== Where & how store the files

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

// ======= Filter - only allow image files

const fileFilter = (req, res, cb) => {
  const allowTypes = /jpg|jpeg|png|webp/;
};

const isValidExt = allowTypes.test(
  path.extname(path.originalname).toLowerCase(),
);

const isValidMine = allowTypes.test(file.mimetype);

if (isValidExt && isValidMine) {
  cb(null, true); // accept file
} else {
  cb(new Error(), "Only image files are allowed", false); // Reject
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});

module.exports = upload;
