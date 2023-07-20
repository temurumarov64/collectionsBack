const multer = require("multer")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + Path.extname(file.originalname));
  },
});
const fileTypes = ['image/png', 'image/jpeg', 'image/jpg']
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if(fileTypes.includes(file.mimetype)) {
        cb(null, true)
    } else{
        cb(null, false)
    }

  },
}).single("photo");

module.exports.upload = upload;
