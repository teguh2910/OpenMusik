const routes = (handler) => [
    {
      method: 'POST',
      path: '/albums',
      handler: handler.postAlbumsHandler,
      // options: {
      //   auth: 'opemusikapp_jwt',
      // },
    },
    {
      method: 'GET',
      path: '/albums',
      handler: handler.getAlbumsHandler,
      // options: {
      //   auth: 'opemusikapp_jwt',
      // },
    },
    {
      method: 'GET',
      path: '/albums/{id}',
      handler: handler.getAlbumsByIdHandler,
      // options: {
      //   auth: 'opemusikapp_jwt',
      // },
    },
    {
      method: 'PUT',
      path: '/albums/{id}',
      handler: handler.putAlbumsByIdHandler,
      // options: {
      //   auth: 'opemusikapp_jwt',
      // },
    },
    {
      method: 'DELETE',
      path: '/albums/{id}',
      handler: handler.deleteAlbumsByIdHandler,
      // options: {
      //   auth: 'opemusikapp_jwt',
      // },
    },
  ];
   
  module.exports = routes;