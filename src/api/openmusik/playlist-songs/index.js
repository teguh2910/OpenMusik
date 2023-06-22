const PlaylistSongsHandler = require('./handler');
const routes = require('./routes');
 
module.exports = {
  name: 'PlaylistSongs',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const playlistsonghandler = new PlaylistSongsHandler(service, validator);
    server.route(routes(playlistsonghandler));
  },
};