const cloudinary = require('cloudinary');

const {
  CLOUD_NAME = 'cloudinary',
  CLOUD_API_KEY = 'key',
  CLOUD_API_SECRET = 'secret',
  CLOUD_SECURE = true,
  CLOUD_DIR = 'gosky',
} = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
  secure: CLOUD_SECURE,
});

// Edit where picture will be saved in cloudinary (folder)
const config = {
  dir: CLOUD_DIR,
};

module.exports = {cloudinary, config};
