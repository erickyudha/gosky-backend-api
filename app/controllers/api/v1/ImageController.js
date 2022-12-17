const {
  GeneralError,
  UnauthorizedError,
  MissingFieldError,
} = require('../../../errors');
class ImageController {
  constructor(imageService) {
    this.imageService = imageService;
  }

  handleUpload = async (req, res) => {
    // USER is only authorized to access PROFILE_IMG type
    // ADMIN can access both.
    // IF ROLE CANT ACCESS, use unauthorized error
    try {
      const user = req.user;
      const fileBase64 = req.file.buffer.toString('base64');
      const file = `data:${req.file.mimetype};base64,${fileBase64}`;
      const type = req.query.type;
      const error = new UnauthorizedError();
      if (!req.query.type) {
        const error = new MissingFieldError();
        res.status(400).json(error.json());
        return;
      }
      if (user.role === 'USER') {
        if (type != 'PROFILE_IMG') {
          res.status(401).json(error.json());
          return;
        }
      } else {
        if (type != 'PROFILE_IMG' && type != 'TICKET_IMG') {
          res.status(401).json(error.json());
          return;
        }
      }
      const upload = await this.imageService.upload(file, type);
      const id = upload.public_id.split('s/');
      const data = {imageId: id[1], imageUrl: upload.url};
      res.status(201).json({
        status: 'success',
        message: 'upload image success',
        data: data,
      });
    } catch (err) {
      const error = new GeneralError(err.message);
      res.status(500).json(error.json());
    }
  };

  handleDelete = async (req, res) => {
    // USER is only authorized to access PROFILE_IMG type
    // ADMIN can access both.
    // IF ROLE CANT ACCESS, use unauthorized error
    try {
      const user = req.user;
      const type = req.query.type;
      const imageId = req.query.imageId;
      if (!imageId && !type) {
        const error = new MissingFieldError();
        res.status(400).json(error.json());
        return;
      };
      if (user.role === 'USER') {
        if (type != 'PROFILE_IMG') {
          res.status(401).json(new UnauthorizedError().json());
          return;
        }
      } else {
        if (type != 'PROFILE_IMG' && type != 'TICKET_IMG') {
          res.status(401).json(new UnauthorizedError().json());
          return;
        }
      }
      await this.imageService.delete(imageId, type);
      res.status(200).json({
        status: 'success',
        message: 'delete image success',
      });
    } catch (err) {
      const error = new GeneralError(err.message);
      res.status(500).json(error.json());
    }
  };
};

module.exports = ImageController;
