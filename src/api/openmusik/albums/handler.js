class AlbumsHandler {
    constructor(service, validator) {
      this._service = service;
      this._validator = validator;

      this.postAlbumsHandler = this.postAlbumsHandler.bind(this);
      this.getAlbumsHandler = this.getAlbumsHandler.bind(this);
      this.getAlbumsByIdHandler = this.getAlbumsByIdHandler.bind(this);
      this.putAlbumsByIdHandler = this.putAlbumsByIdHandler.bind(this);
      this.deleteAlbumsByIdHandler = this.deleteAlbumsByIdHandler.bind(this);
    }
   
    async postAlbumsHandler(request, h) {
        
        this._validator.validateAlbumPayload(request.payload);
        const { name, year } = request.payload;
        const albumId = await this._service.addAlbum({  name, year });
        const respone = h.response({
            status: 'success',
            message: 'Album berhasil ditambahkan',
            data: {
              albumId,
            },
        });
        respone.code(201);
        return respone;
    }
    async getAlbumsHandler() {
        const notes = await this._service.getAlbums();
        return {
            status: 'success',
            data: {
                notes,
            },
        };
    }
    async getAlbumsByIdHandler(request, h) {
        const { id } = request.params;
        const album = await this._service.getAlbumById(id);
        return {
            status: 'success',
            data: {
                album,
            },
        };        
    }
    async putAlbumsByIdHandler(request, h) {
        this._validator.validateAlbumPayload(request.payload);
        const { name, year } = request.payload;
        const {id} = request.params;
        await this._service.editAlbumById({id, name, year });
        return {
            status: 'success',
            message: 'Album berhasil diperbarui',
        };
    }
    async deleteAlbumsByIdHandler(request, h) {
      const { id } = request.params;
      await this._service.deleteAlbumById(id);
        return {
            status: 'success',
            message: 'Album berhasil dihapus',
        };
    }
  }

  module.exports = AlbumsHandler;