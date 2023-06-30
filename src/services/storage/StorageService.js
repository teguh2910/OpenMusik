const { default: mod } = require('@hapi/jwt');
const fs = require('fs');
const { Pool } = require('pg');
 
class StorageService {
  
  constructor(folder) {
    this._folder = folder;
    this._pool = new Pool();
 
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
  }
 
  async UpdateCover({ id, coverUrl }) {
    const query = {
      text: 'UPDATE albums SET coverurl = $1 WHERE id = $2 RETURNING id',
      values: [coverUrl,id],
    };
 
    const result = await this._pool.query(query);
 
    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui Album. Id tidak ditemukan');
    }
  }

  writeFile(file, meta) {
    const filename = +new Date() + meta.filename;
    const path = `${this._folder}/${filename}`;
 
    const fileStream = fs.createWriteStream(path);
 
    return new Promise((resolve, reject) => {
      fileStream.on('error', (error) => reject(error));
      file.pipe(fileStream);
      file.on('end', () => resolve(filename));
    });
  }
}

module.exports = StorageService;