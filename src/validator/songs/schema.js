const Joi = require('joi');
 
const SongsPayloadSchema = Joi.object({
  title: Joi.string().required(),
  genre: Joi.string().required(),
  performer: Joi.string().required(),
  duration: Joi.number(),
  year: Joi.number().required(),
  almbumId: Joi.string(),  
});

module.exports = { SongsPayloadSchema };