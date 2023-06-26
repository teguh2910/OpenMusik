const amqp = require('amqplib');
const { Pool } = require('pg');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthorizationError = require('../../exceptions/AuthorizationError');

class ProducerService {
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
          throw new AuthorizationError('Anda tidak berhak mengakses resource ini'+credentialId);
        }
      }
      async verifyPlaylistExist(playlistId) {
        const query = {
          text: 'SELECT * FROM playlists WHERE id = $1',
          values: [playlistId],
        };
        const result = await this._pool.query(query);
        if (!result.rows.length) {
          throw new NotFoundError('Tidak Ditemukan Playlist dengan Id tersebut '+ playlistId);
        }          
      }
      async sendMessage (queue, message) {
        const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
        const channel = await connection.createChannel();
        await channel.assertQueue(queue, { durable: true });
        await channel.sendToQueue(queue, Buffer.from(message));
    
        setTimeout(() => { 
            connection.close(); 
            process.exit(0) 
            }
        , 1000);
    };
}
module.exports = ProducerService;