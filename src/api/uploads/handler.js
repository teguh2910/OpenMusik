const InvariantError = require('../../exceptions/InvariantError');
class UploadsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postUploadImageHandler = this.postUploadImageHandler.bind(this);
  }
 
  async postUploadImageHandler(request, h) {
      const { cover } = request.payload;
      const { id } = request.params;
      this._validator.validateImageHeaders(cover.hapi.headers);
      const filename = await this._service.writeFile(cover, cover.hapi);
      await this._service.UpdateCover({ id, coverUrl: `http://${process.env.HOST}:${process.env.PORT}/upload/images/${filename}` });
      const response = h.response({
        status: 'success',
        message : 'Sampul berhasil diunggah',
        cover: {
          fileLocation: `http://${process.env.HOST}:${process.env.PORT}/upload/images/${filename}`,
        },
      });
      response.code(201);
      return response;
  }
}

module.exports = UploadsHandler;