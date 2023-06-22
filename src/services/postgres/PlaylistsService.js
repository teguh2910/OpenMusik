const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const { PlaylistsmapDBToModel } = require('../../utils/playlists');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthorizationError = require('../../exceptions/AuthorizationError');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }
  async verifyPlaylistOwner(credentialId) {
    const query = {
      text: 'SELECT * FROM playlists WHERE owner = $1',
      values: [credentialId],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
    }
  }
  async addPlaylist({ name,credentialId }) {
    const id = nanoid(16);
 
    const query = {
      text: 'INSERT INTO playlists VALUES($1, $2, $3) RETURNING id',
      values: [id, name, credentialId],
    };
 
    const result = await this._pool.query(query);
 
    if (!result.rows[0].id) {
      throw new InvariantError('Playlist gagal ditambahkan');
    }
 
    return result.rows[0].id;
  }
  async getPlaylist(credentialId) {
    const result = await this._pool.query('SELECT * FROM playlists INNER JOIN users ON users.id = playlists.owner WHERE playlists.owner = $1', [credentialId]);
    return result.rows.map(PlaylistsmapDBToModel);
  }
  async deletePlaylistById(id) {
    const query = {
      text: 'DELETE FROM playlists WHERE id = $1 RETURNING id',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
        throw new NotFoundError('Playlist gagal dihapus. Id tidak ditemukan');
      }
    }
}

module.exports = PlaylistsService;