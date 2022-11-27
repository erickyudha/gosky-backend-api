const {cloudinary, config} = require('../../config/cloudinary');

module.exports = {
  async upload(file) {
    const publicId = Date.now() + '-' + Math.round(Math.random() * 1e9);
    return cloudinary.uploader
        .upload(file, {
          height: 600, width: 800, crop: 'fit',
          folder: config.dir, public_id: publicId,
        });
  },

  async delete(id) {
    return cloudinary.uploader.destroy(`${config.dir}/${id}`);
  },
};
