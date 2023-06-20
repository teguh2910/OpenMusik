// mengimpor dotenv dan menjalankan konfigurasinya
const ClientError = require('./exceptions/ClientError');
require('dotenv').config();
const Hapi = require('@hapi/hapi');
const Album = require('./api/openmusik/albums');
const Song = require('./api/openmusik/songs');
const AlbumService = require('./services/postgres/AlbumsService');
const SongsService = require('./services/postgres/SongsService');
const AlbumValidator = require('./validator/albums');
const SongValidator = require('./validator/songs');

 
const init = async () => {
  const albumService = new AlbumService();
  const songService = new SongsService();
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });
  
  await server.register({
    plugin: Album,
    options: {
      service: albumService,
      validator: AlbumValidator,
    }
  });
  await server.register({
    plugin: Song,
    options: {
      service: songService,
      validator: SongValidator,
    }
  });
  server.ext('onPreResponse', (request, h) => {
    // mendapatkan konteks response dari request
    const { response } = request;
    if (response instanceof Error) {
 
      // penanganan client error secara internal.
      if (response instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: response.message,
        });
        newResponse.code(response.statusCode);
        return newResponse;
      }
      // mempertahankan penanganan client error oleh hapi secara native, seperti 404, etc.
      if (!response.isServer) {
        return h.continue;
      }
      // penanganan server error sesuai kebutuhan
      const newResponse = h.response({
        status: 'error',
        message: 'terjadi kegagalan pada server kami :( \n'+ response.message,
      });
      newResponse.code(500);
      return newResponse;
    }
    // jika bukan error, lanjutkan dengan response sebelumnya (tanpa terintervensi)
    return h.continue;
  });
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};
 
init();