const { SongsPayloadSchema } = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const AlbumsValidator = {
  validateSongPayload: (payload) => {
    const validationResult = SongsPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};
 
module.exports = AlbumsValidator;