class SongsHandler {
    constructor(service, validator) {
      this._service = service;
      this._validator = validator;

      this.postSongsHandler = this.postSongsHandler.bind(this);
      this.getSongsHandler = this.getSongsHandler.bind(this);
      this.getSongsByIdHandler = this.getSongsByIdHandler.bind(this);
      this.putSongsByIdHandler = this.putSongsByIdHandler.bind(this);
      this.deleteSongsByIdHandler = this.deleteSongsByIdHandler.bind(this);
    }
   
    async postSongsHandler(request, h) {
        this._validator.validateSongPayload(request.payload);
        const { title,genre,performer,duration,year,albumId } = request.payload;
        const songId = await this._service.addSongs({ title,genre,performer,duration,year,albumId });
        const respone = h.response({
            status: 'success',
            message: 'Song berhasil ditambahkan',
            data: {
              songId,
            },
        });
        respone.code(201);
        return respone;        
    }
    async getSongsHandler() {
        const songs = await this._service.getSongs();
        return {
            status: 'success',
            data: {
              songs,
            },
        };
    }
    async getSongsByIdHandler(request, h) {
        const { id } = request.params;
        const song = await this._service.getSongsById(id);
        return {
            status: 'success',
            data: {
                song,
            },
        };            
    }
    async putSongsByIdHandler(request, h) {
        this._validator.validateSongPayload(request.payload);
        const { title,genre,performer,duration,year } = request.payload;
        const {id} = request.params;
        await this._service.editSongsById({id, title, genre, performer, duration, year });
        return {
            status: 'success',
            message: 'Song berhasil diperbarui',
        };
    }
    async deleteSongsByIdHandler(request, h) {
      const { id } = request.params;
      await this._service.deleteSongsById(id);
        return {
            status: 'success',
            message: 'Song berhasil dihapus',
        };
    }
  }

  module.exports = SongsHandler;