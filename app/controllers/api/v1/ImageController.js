class ImageController {
  constructor(imageService) {
    this.imageService = imageService;
  }

  handleUpload(req, res) {
    // TODO:
    // USER is only authorized to access PROFILE_IMG type
    // ADMIN can access both.
    // IF ROLE CANT ACCESS, use unauthorized error
  };

  handleDelete(req, res) {
    // TODO:
    // USER is only authorized to access PROFILE_IMG type
    // ADMIN can access both.
    // IF ROLE CANT ACCESS, use unauthorized error
  };
};

module.exports = ImageController;
