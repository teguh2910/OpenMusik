const routes = (handler) => [
    {
      method: 'POST',
      path: '/export/playlists/{playlistId}',
      handler: handler.postExportPlaylistsHandler,
      options: {
        auth: 'opemusikapp_jwt',
      },
    },
  ];
   
  module.exports = routes;