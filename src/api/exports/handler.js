const ClientError = require('../../exceptions/ClientError');
 
class ExportsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
 
    this.postExportPlaylistsHandler = this.postExportPlaylistsHandler.bind(this);
  }
 
  async postExportPlaylistsHandler(request, h) {    
      const {playlistId} = request.params;
      const { id: credentialId } = request.auth.credentials;
      this._validator.validateExportPlaylistsPayload(request.payload);
      await this._service.verifyPlaylistOwner(credentialId);
      await this._service.verifyPlaylistExist(playlistId);
      const message = {
        userId: request.auth.credentials.id,
        targetEmail: request.payload.targetEmail,
      };
 
      await this._service.sendMessage('export:playlists', JSON.stringify(message));
 
      const response = h.response({
        status: 'success',
        message: 'Permintaan Anda dalam antrean',
      });
      response.code(201);
      return response;
  }
}
 
module.exports = ExportsHandler;