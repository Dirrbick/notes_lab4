'use strict';

const mongoose = require('mongoose');

const notesSchema = mongoose.Schema({
  text: { required: true, type: String },
  category: {type: Array },
});


const notesModel = mongoose.model('notes', notesSchema);

module.exports = notesModel;
