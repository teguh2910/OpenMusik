// mengimpor dotenv dan menjalankan konfigurasinya
require('dotenv').config();
const Hapi = require('@hapi/hapi');
const Album = require('./api/openmusik/albums');
const AlbumService = require('./services/postgres/AlbumsService');
const AlbumValidator = require('./validator/albums');

 
const init = async () => {
  const albumService = new AlbumService();
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
    },
  });
 
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};
 
init();