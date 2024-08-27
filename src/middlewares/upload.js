const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../services/cloudinary'); // Перевірте шлях

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'contacts_photos',
    format: async (req, file) => 'png',
  },
});

const upload = multer({ storage });

module.exports = upload;
