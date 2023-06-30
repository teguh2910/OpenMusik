/* eslint-disable no-underscore-dangle */

class LikesAlbumHandler {
  constructor(service, albumService) {
    this._service = service;
    this._albumService = albumService;

    this.postLikeHandler = this.postLikeHandler.bind(this);
    this.getLikeHandler = this.getLikeHandler.bind(this);
    this.deleteLikeHandler = this.deleteLikeHandler.bind(this);
  }

  async postLikeHandler(request, h) {
      const { albumId } = request.params;
      const { id: credentialId } = request.auth.credentials;

      await this._albumService.checkAlbum(albumId);

      const alreadyLiked = await this._service.checkAlreadyLike(credentialId, albumId);

      if (!alreadyLiked) {
        const likeId = await this._service.addAlbumLike(credentialId, albumId);

        const response = h.response({
          status: "success",
          message: `Berhasil melakukan like pada album dengan id: ${likeId}`,
        });
        response.code(201);
        return response;
      }else{
        const response = h.response({
          status: "fail",
          message: "Gagal melakukan like, album sudah dilike sebelumnya",
        });
        response.code(400);
        return response;
      }
    }
    async deleteLikeHandler(request, h) {
      const { albumId } = request.params;
      const { id: credentialId } = request.auth.credentials;
      await this._service.deleteAlbumLike(credentialId, albumId);

      const response = h.response({
        status: "success",
        message: "Berhasil melakukan unlike",
      });
      response.code(200);
      return response;
  }


  async getLikeHandler(request, h) {    
      const { albumId } = request.params;

      const data = await this._service.getLikesCount(albumId);
      const likes = data.count;

      const response = h.response({
        status: "success",
        data: {
          likes,
        },
      });
      response.header("X-Data-Source", data.source);
      response.code(200);
      return response;
    }
}

module.exports = LikesAlbumHandler;