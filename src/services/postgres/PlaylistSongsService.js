const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const { PlaylistSongsmapDBToModel } = require('../../utils/playlist-songs');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthorizationError = require('../../exceptions/AuthorizationError');

class PlaylistSongsService {
  constructor() {
    this._pool = new Pool();
  }
  async verifyPlaylistExist(songId) {
    const query = {
      text: 'SELECT * FROM songs WHERE id = $1',
      values: [songId],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Tidak Ditemukan Playlist dengan Id tersebut');
    }
  }
  async verifyPlaylistSongsExist(id) {
    const query = {
      text: 'SELECT * FROM playlistsongs WHERE playlist_id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Tidak Ditemukan Playlist dengan Id tersebut');
    }
  }
  async verifyPlaylistOwner(credentialId) {
    const query = {
      text: 'SELECT * FROM playlists WHERE owner = $1',
      values: [credentialId],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new AuthorizationError('Anda tidak berhak mengakses resource ini'+credentialId);
    }
  }
  async addPlaylistSong({id, songId }) {
    const id_p = nanoid(16);        
    const query = {
      text: 'INSERT INTO playlistsongs VALUES($1, $2, $3) RETURNING id',
      values: [id_p, id, songId],
    };
 
    const result = await this._pool.query(query);
 
    if (!result.rows[0].id) {
      throw new InvariantError('Song Gagal ditambahkan Playlist');
    }
 
  }
  async getPlaylistSong(id) {
    const playlistResult = await this._pool.query(
      'SELECT playlists.id as playlist_id, playlists.name as playlist_name, users.username FROM playlistsongs INNER JOIN playlists ON playlists.id=playlistsongs.playlist_id INNER JOIN users ON playlists.owner=users.id WHERE playlists.id = $1 GROUP BY playlists.id, users.username',
      [id]
    );
    const songResult = await this._pool.query(
      'SELECT songs.id as song_id, songs.title, songs.performer FROM playlistsongs INNER JOIN playlists ON playlists.id=playlistsongs.playlist_id INNER JOIN users ON playlists.owner=users.id INNER JOIN songs ON songs.id=playlistsongs.song_id WHERE playlists.id = $1',
      [id]
    );
  
    const playlist = PlaylistSongsmapDBToModel(playlistResult.rows, songResult.rows);
  
    return playlist;
  }
  
  
  async deletePlaylistSongsById(id, songId) {
    const query = {
      text: 'DELETE FROM playlistsongs WHERE song_id = $1 AND playlist_id=$2 RETURNING id',
      values: [songId,id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
        throw new NotFoundError('Song gagal dihapus di Playlist. Song_Id tidak ditemukan'+ songId + id);
      }
    }
}

module.exports = PlaylistSongsService;