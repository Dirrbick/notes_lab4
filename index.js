#!/usr/bin/env node

'use strict';

const Input = require('./lib/input.js');
const Notes = require('./lib/notes.js');

const input = new Input();

const note = new Notes(input);
