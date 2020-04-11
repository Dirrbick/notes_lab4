'use strict';


/**
 * Notes
 * @module validator
 */

/**
 * Validator - class
 * @param schema
 * @function Validator
 */

/**
  * isValid - tests validity of object based on schema
  * @function isValid
  */

/**
  * isCorrectType - determines which type test method to call
  * @function isCorrectType
  * @returns {boolean}
  */

/**
 * isTruthy - determines if input is true/false
 * @function isTruthy
 * @returns {boolean}
 */

/**
 * isString - determines if input is a string
 * @function isString
 * @returns {boolean}
 */

/**
 * isNumber - determines if input is a number
 * @function isNumber
 * @returns {boolean}
 */


class Validator {

  constructor(schema) {
    this.schema = schema;
  }

  isValid(data) {
    let valid = true;

    if (typeof data !== 'object' || Array.isArray(data)) {
      console.error('Not an object');
      return false;
    }

    for (let fieldName in this.schema) {
      let field = this.schema[fieldName];

      let required = field.required
      ? this.isTruthy(data[fieldName])
      : true;

      let type = field.type
      ? this.isCorrectType(data[fieldName], field)
      : true;

      if (!(required && type)) {
        valid = false;
      }
    }

    return valid;
  }

  isCorrectType(input, field) {
    switch(field.type) {
      case 'string': return this.isString(input);
      case 'number': return this.isNumber(input);
      default: return false;
    }
  }

  isTruthy(input) {
    return !!input;
  }

  isString(input) {
    return typeof input === 'string';
  }

  isNumber(input) {
    return typeof input === 'number';
  }

}

module.exports = Validator;