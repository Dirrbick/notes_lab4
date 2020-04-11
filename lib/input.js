'use strict';

/**
 * Input
 * @module input
 */

/**
 * Input - class
 * @function Input
 */


const minimist = require('minimist');
const Validator = require('./validator.js')

class Input {
  constructor() {
    this.args = minimist(process.argv.slice(2));

    this.command = {};

    Object.entries(this.args).forEach(arr => {
      switch(arr[0]) {
        case 'a':
        case 'add':
          if (typeof arr[1] !== 'boolean') this.command = {action: 'add', payload: arr[1]};
          break;
        case 'c':
        case 'category':
          this.command.category = arr[1];
          break;
        case 'l':
        case 'list':
          this.command = {action: 'list', category: arr[1]};
          if (typeof this.command.category === 'boolean') this.command.category = null;
          break;
        case 'd':
        case 'delete':
          this.command = { action: 'delete', id: arr[1]};
          if (typeof arr[1] === 'boolean') this.command.id = null;
        default:
          break;
      }
    });
  }
}

module.exports = Input;
