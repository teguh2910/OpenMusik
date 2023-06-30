const LikesAlbumHandler = require("./handler");
const routes = require("./routes");

module.exports = {
  name: "LikeAlbums",
  version: "1.0.0",
  register: async (server, { service, albumService }) => {
    const likesAlbumHandler = new LikesAlbumHandler(service, albumService);
    server.route(routes(likesAlbumHandler));
  },
};