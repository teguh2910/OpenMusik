class PlaylistsHandler {
    constructor(service, validator) {
      this._service = service;
      this._validator = validator;

      this.postPlaylistsHandler = this.postPlaylistsHandler.bind(this);
      this.getPlaylistsHandler = this.getPlaylistsHandler.bind(this);
      this.deletePlaylistsByIdHandler = this.deletePlaylistsByIdHandler.bind(this);
    }
   
    async postPlaylistsHandler(request, h) {
        
        this._validator.validatePlaylistPayload(request.payload);
        const { id: credentialId } = request.auth.credentials;
        const { name} = request.payload;
        const playlistId = await this._service.addPlaylist({ name,credentialId });
        const respone = h.response({
            status: 'success',
            message: 'Playlist berhasil ditambahkan',
            data: {
                playlistId,
            },
        });
        respone.code(201);
        return respone;
    }
    async getPlaylistsHandler(request, h) {        
        const { id: credentialId } = request.auth.credentials;
        await this._service.verifyPlaylistOwner(credentialId);
        const playlists = await this._service.getPlaylist(credentialId);
        return {
            status: 'success',
            data: {
                playlists,
            },
        };
    }   
    async deletePlaylistsByIdHandler(request, h) {
      const { id: credentialId } = request.auth.credentials;
      await this._service.verifyPlaylistOwner(credentialId);
      const { id } = request.params;
      await this._service.deletePlaylistById(id);
        return {
            status: 'success',
            message: 'Playlist berhasil dihapus',
        };
    }
  }

  module.exports = PlaylistsHandler;