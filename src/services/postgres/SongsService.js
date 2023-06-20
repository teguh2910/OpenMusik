const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const { SongsmapDBToModel } = require('../../utils/songs');
const NotFoundError = require('../../exceptions/NotFoundError');

class SongsService {
  constructor() {
    this._pool = new Pool();
  }
 
  async addSongs({ title, genre, performer, duration, year, albumId }) {
    const id = nanoid(16);
 
    const query = {
      text: 'INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6 , $7) RETURNING id',
      values: [id, title, genre, performer, duration, year, albumId],
    };
 
    const result = await this._pool.query(query);
 
    if (!result.rows[0].id) {
      throw new InvariantError('Songs gagal ditambahkan');
    }
 
    return result.rows[0].id;
  }
  async getSongs() {
    const result = await this._pool.query('SELECT id,title,performer FROM Songs');
    return result.rows.map(SongsmapDBToModel);
  }
  async getSongsById(id) {
    const query = {
      text: 'SELECT * FROM Songs WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);
 
    if (!result.rows.length) {
      throw new NotFoundError('Songs tidak ditemukan');
    }
 
    return result.rows.map(SongsmapDBToModel)[0];
  }
  async editSongsById({ id, title, genre, performer, duration, year, albumId }) {
    const query = {
      text: 'UPDATE songs SET title = $1, genre = $2, performer= $3, duration=$4, year=$5 WHERE id = $6 RETURNING id',
      values: [title, genre, performer, duration, year,  id],
    };
 
    const result = await this._pool.query(query);
 
    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui Songs. Id tidak ditemukan');
    }
  }
    async deleteSongsById(id) {
    const query = {
      text: 'DELETE FROM songs WHERE id = $1 RETURNING id',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
        throw new NotFoundError('Songs gagal dihapus. Id tidak ditemukan');
      }
    }
}

module.exports = SongsService;