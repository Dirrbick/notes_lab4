'use strict';

const Input = require('../lib/input.js');

//describe: "name of test"
//it: "the one that fails"
//expect: "the passing test"

//Not the write inputs!!

// What you should be looking for




describe('It handles the input correct', () => {
  it('Handles good input for -a flag', () => {
    let result = new Input(rightNote);
    expect(result.valid()).toBeTruthy();
  })
});

