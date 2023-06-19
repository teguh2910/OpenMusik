const ClientError = require('../../../exceptions/ClientError');
class NotesHandler {
    constructor(service, validator) {
      this._service = service;
      this._validator = validator;

      this.postOpenMusikHandler = this.postOpenMusikHandler.bind(this);
      this.getOpenMusikHandler = this.getOpenMusikHandler.bind(this);
      this.getOpenMusikByIdHandler = this.getOpenMusikByIdHandler.bind(this);
      this.putOpenMusikByIdHandler = this.putOpenMusikByIdHandler.bind(this);
      this.deleteOpenMusikByIdHandler = this.deleteOpenMusikByIdHandler.bind(this);
    }
   
    async postOpenMusikHandler(request, h) {
        try{
        this._validator.validateNotePayload(request.payload);
        const { title = 'untitled', body, tags } = request.payload;
        const noteId = await this._service.addNote({ title, body, tags });
        const respone = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId,
            },
        });
        respone.code(201);
        return respone;
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                  status: 'fail',
                  message: error.message,
                });
                response.code(error.statusCode);
                return response;
              }
         
              // Server ERROR!
              const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
              });
              response.code(500);
              console.error(error);
              return response;                 
        }
    }
    async getOpenMusikHandler() {
        const notes = await this._service.getNotes();
        return {
            status: 'success',
            data: {
                notes,
            },
        };
    }
    async getOpenMusikByIdHandler(request, h) {
        try{
        const { id } = request.params;
        const note = await this._service.getNoteById(id);
        return {
            status: 'success',
            data: {
                note,
            },
        };
    } catch (error) {
        if (error instanceof ClientError) {
            const response = h.response({
              status: 'fail',
              message: error.message,
            });
            response.code(error.statusCode);
            return response;
          }
     
          // Server ERROR!
          const response = h.response({
            status: 'error',
            message: 'Maaf, terjadi kegagalan pada server kami.',
          });
          response.code(500);
          console.error(error);
          return response;
        }
                
    }
    async putOpenMusikByIdHandler(request, h) {
        try{
        this._validator.validateNotePayload(request.payload);
        const { title, body, tags } = request.payload;
        const {id} = request.params;
        await this._service.editNoteById(id, { title, body, tags });
        return {
            status: 'success',
            message: 'Catatan berhasil diperbarui',
        };
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                  status: 'fail',
                  message: error.message,
                });
                response.code(error.statusCode);
                return response;
              }
         
              // Server ERROR!
              const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
              });
              response.code(500);
              console.error(error);
              return response;
            }

    }
    async deleteOpenMusikByIdHandler(request, h) {
      try{
      const { id } = request.params;
      await this._service.deleteNoteById(id);
        return {
            status: 'success',
            message: 'Catatan berhasil dihapus',
        };
    }catch(error){
        if (error instanceof ClientError) {
            const response = h.response({
              status: 'fail',
              message: error.message,
            });
            response.code(error.statusCode);
            return response;
          }
     
          // Server ERROR!
          const response = h.response({
            status: 'error',
            message: 'Maaf, terjadi kegagalan pada server kami.',
          });
          response.code(500);
          console.error(error);
          return response;
    }
    }
  }

  module.exports = NotesHandler;