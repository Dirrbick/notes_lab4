'use strict';

/**
  * Notes
  * @module notes
  */

/**
  * Note - class
  * @param input
  * @function Note
  */

/**
  * operation - calls a class method based on the action specified
  * @function operation
  */

/**
  * add - will add note to database with optional category
  * @function add
  * @params object
  */

/**
  * list - will display a list of notes, option to filter by category
  * @function list
  * @params object
  */
/**
  * delete - will delete a note in the db based on unique id
  * @function delete
  * @params object
  */

const mongoose = require('mongoose');
const Notes = require('./models/notes-schema.js');
const dbURL = 'mongodb+srv://KoryJackson:seattle-401-javascript@401javascript-ytxho.mongodb.net/test';

class Note {
  constructor(input) {
    if (input.command.action){
      this.operation(input.command);
    } else {
      console.error('Error! This command not recognized.');
    }
  }

  operation(command) {
    mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    switch(command.action) {
      case 'add':
        this.add(command);
        break;
      case 'list':
        this.list(command);
        break;
      case 'delete':
        this.delete(command);
      default:
        break;
    }
  }

  async add(command) {
    this.note = { note: command.payload };
    if (command.category) {
      this.note.category = [command.category]
    }
    let noteToSave = new Notes(this.note);
    try {
      await noteToSave.save();
      console.log(`Added note: '${this.note.note}'`);
    } catch (e) {
      console.error('Error adding note!!');
    }
    mongoose.disconnect();
  }

  async list(command) {
    let allNotes = await Notes.fine();

    if (command.category) {
      allNotes = allNotes.filter(item => {
        return item.category.includes(command.category);
      });
    }
    console.log('Notes:');
    console.log('--------');
    allNotes.forEach(item => {
      console.log('id:', + item._id + '-', + 'note:', + item.note);
    });
    mongoose.disconnect();
  }

  async delete(command) {
    if (!command.id) {
      console.log('Error, Note ID is required to delete entry.');
      mongoose.disconnect();
    } else {
      try {
        let deletedNote = await Notes.deleteOne({ _id: comannd.id });
        if (deletedNote.deleteCount > 0) console.log('Deleted ', + deletedNote.deleteCount + 'note(s).');
        else console.log('Error, Note ID was not found.');

        mongoose.disconnect();
      } catch(e) {
        console.error(e);
        mongoose.disconnect();
      }
    }
  }
}

module.exports = Note;



