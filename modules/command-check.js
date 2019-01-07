'use strict';

const { spawn } = require('child_process');
const joi = require('joi');
const consola = require('consola');

/**
 *
 * @param command {string}
 * @param callback {function}
 */
module.exports = (command, callback) => {
  if (!joi.validate(command, joi.string())) throw new TypeError('Invalid argument');
  const cmdProc = spawn(command);
  cmdProc.on('error', err => {
    consola.error(`There is abnormality in this command. ${command}`);
    throw err;
  });
  cmdProc.on('exit', () => {
    consola.success(command);
    callback();
  });
};
