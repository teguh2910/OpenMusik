class PlaylistSongsHandler {
    constructor(service, validator) {
      this._service = service;
      this._validator = validator;

      this.postPlaylistSongsHandler = this.postPlaylistSongsHandler.bind(this);
      this.getPlaylistSongsHandler = this.getPlaylistSongsHandler.bind(this);
      this.deletePlaylistSongsByIdHandler = this.deletePlaylistSongsByIdHandler.bind(this);
    }
   
    async postPlaylistSongsHandler(request, h) {        
        const {songId} = request.payload;
        const { id: credentialId } = request.auth.credentials;
        const { id } = request.params;   
        this._validator.validatePlaylistSongPayload(request.payload);
        await this._service.verifyPlaylistOwner(credentialId);
        await this._service.verifyPlaylistExist(songId);                             
        await this._service.addPlaylistSong({ id,songId });
        const respone = h.response({
            status: 'success',
            message: 'Playlist Song berhasil ditambahkan',            
        });
        respone.code(201);
        return respone;
    }
    async getPlaylistSongsHandler(request, h) {        
        const { id: credentialId } = request.auth.credentials;
        const { id } = request.params;
        await this._service.verifyPlaylistSongsExist(id);
        await this._service.verifyPlaylistOwner(credentialId);
        const playlist = await this._service.getPlaylistSong(id);
        
        return {
            status: 'success',
            data: {
                playlist
            },
        };
    }  
    async deletePlaylistSongsByIdHandler(request, h) {
      const { id } = request.params;
      const { id: credentialId } = request.auth.credentials;
      const {songId} = request.payload;
      this._validator.validatePlaylistSongPayload(request.payload);
      await this._service.verifyPlaylistOwner(credentialId);
      await this._service.deletePlaylistSongsById(id,songId);
        return {
            status: 'success',
            message: 'Playlist berhasil dihapus',
        };
    }
  }

  module.exports = PlaylistSongsHandler;