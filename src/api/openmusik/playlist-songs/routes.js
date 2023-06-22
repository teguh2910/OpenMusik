const routes = (handler) => [
    {
      method: 'POST',
      path: '/playlists/{id}/songs',
      handler: handler.postPlaylistSongsHandler,
      options: {
        auth: 'opemusikapp_jwt',
      },
    },
    {
      method: 'GET',
      path: '/playlists/{id}/songs',
      handler: handler.getPlaylistSongsHandler,
      options: {
        auth: 'opemusikapp_jwt',
      },
    },
    {
      method: 'DELETE',
      path: '/playlists/{id}/songs',
      handler: handler.deletePlaylistSongsByIdHandler,
      options: {
        auth: 'opemusikapp_jwt',
      },
    },
  ];
   
  module.exports = routes;