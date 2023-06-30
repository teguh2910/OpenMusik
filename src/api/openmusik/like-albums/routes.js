const routes = (handler) => [
    {
      method: "POST",
      path: "/albums/{albumId}/likes",
      handler: handler.postLikeHandler,
      options: {
        auth: "opemusikapp_jwt",
      },
    },
    {
      method: "GET",
      path: "/albums/{albumId}/likes",
      handler: handler.getLikeHandler,
    },
    {
    method: "DELETE",
    path: "/albums/{albumId}/likes",
    handler: handler.deleteLikeHandler,
    options: {
        auth: "opemusikapp_jwt",
    },
    },

  ];
  
  module.exports = routes;