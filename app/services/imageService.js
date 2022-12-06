const {cloudinary, config} = require('../../config/cloudinary');

module.exports = {
  async upload(file, type) {
    const secondaryDirMap = {
      'PROFILE_IMG': 'profiles',
      'TICKET_IMG': 'tickets',
    };
    const publicId = Date.now() + '-' + Math.round(Math.random() * 1e9);
    return cloudinary.v2.uploader
        .upload(file, {
          folder: `${config.dir}/${secondaryDirMap[type]}`, public_id: publicId,
        });
  },

  async delete(id, type) {
    const secondaryDirMap = {
      'PROFILE_IMG': 'profiles',
      'TICKET_IMG': 'tickets',
    };
    return cloudinary.uploader
        .destroy(`${config.dir}/${secondaryDirMap[type]}/${id}`);
  },
};
