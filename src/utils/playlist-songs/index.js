const PlaylistSongsmapDBToModel = (playlistRows, songRows) => {
  if (!playlistRows || playlistRows.length === 0) {
    return null; // or throw an error, or return an empty playlist object
  }

  const playlist = {
    id: playlistRows[0].playlist_id,
    name: playlistRows[0].playlist_name,
    username: playlistRows[0].username,
    songs: []
  };

  songRows.forEach((songRow) => {
    const song = {
      id: songRow.song_id,
      title: songRow.title,
      performer: songRow.performer
    };
    playlist.songs.push(song);
  });

  return playlist;
};

module.exports = { PlaylistSongsmapDBToModel };
