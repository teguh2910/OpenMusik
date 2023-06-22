const routes = (handler) => [
    {
      method: 'POST',
      path: '/playlists',
      handler: handler.postPlaylistsHandler,
      options: {
        auth: 'opemusikapp_jwt',
      },
    },
    {
      method: 'GET',
      path: '/playlists',
      handler: handler.getPlaylistsHandler,
      options: {
        auth: 'opemusikapp_jwt',
      },
    },
    {
      method: 'DELETE',
      path: '/playlists/{id}',
      handler: handler.deletePlaylistsByIdHandler,
      options: {
        auth: 'opemusikapp_jwt',
      },
    },
  ];
   
  module.exports = routes;