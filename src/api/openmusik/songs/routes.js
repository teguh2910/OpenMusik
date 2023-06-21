const routes = (handler) => [
    {
      method: 'POST',
      path: '/songs',
      handler: handler.postSongsHandler,
      // options: {
      //   auth: 'opemusikapp_jwt',
      // },
    },
    {
      method: 'GET',
      path: '/songs',
      handler: handler.getSongsHandler,
      // options: {
      //   auth: 'opemusikapp_jwt',
      // },
    },
    {
      method: 'GET',
      path: '/songs/{id}',
      handler: handler.getSongsByIdHandler,
      // options: {
      //   auth: 'opemusikapp_jwt',
      // },
    },
    {
      method: 'PUT',
      path: '/songs/{id}',
      handler: handler.putSongsByIdHandler,
      // options: {
      //   auth: 'opemusikapp_jwt',
      // },
    },
    {
      method: 'DELETE',
      path: '/songs/{id}',
      handler: handler.deleteSongsByIdHandler,
      // options: {
      //   auth: 'opemusikapp_jwt',
      // },
    },
  ];
   
  module.exports = routes;