class NotesHandler {
    constructor(service) {
      this._service = service;
      this.postNoteHandler = this.postNoteHandler.bind(this);
      this.getNotesHandler = this.getNotesHandler.bind(this);
      this.getNoteByIdHandler = this.getNoteByIdHandler.bind(this);
      this.putNoteByIdHandler = this.putNoteByIdHandler.bind(this);
      this.deleteNoteByIdHandler = this.deleteNoteByIdHandler.bind(this);
    }
   
    postNoteHandler(request, h) {
        try{
        const { title = 'untitled', body, tags } = request.payload;
        const noteId = this._service.addNote({ title, body, tags });
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
            const respone = h.response({
                status: 'fail',
                message: error.message,
            });
            respone.code(400);
            return respone;        
        }
    }
    getNotesHandler() {
        const notes = this._service.getNotes();
        return {
            status: 'success',
            data: {
                notes,
            },
        };
    }
    getNoteByIdHandler(request, h) {
        try{
        const { id } = request.params;
        const note = this._service.getNoteById(id);
        return {
            status: 'success',
            data: {
                note,
            },
        };
    } catch (error) {
        const respone = h.response({
            status: 'fail',
            message: error.message,
        });
        respone.code(404);
        return respone;
        }        
    }
    putNoteByIdHandler(request, h) {
        try{
        const {id} = request.params;
        this._service.editNoteById(id, request.payload);
        return {
            status: 'success',
            message: 'Catatan berhasil diperbarui',
        };
    } catch (error) {
        const respone = h.response({
            status: 'fail',
            message: error.message,
        });
        respone.code(404);
        return respone;
        }

    }
    deleteNoteByIdHandler(request, h) {
      try{
      const { id } = request.params;
      this._service.deleteNotedById(id);
        return {
            status: 'success',
            message: 'Catatan berhasil dihapus',
        };
    }catch(error){
        const respone = h.response({
            status: 'fail',
            message: error.message,
        });
        respone.code(404);
        return respone;
    }
    }
  }

  module.exports = NotesHandler;