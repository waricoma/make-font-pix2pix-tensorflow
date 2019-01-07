'use strict';

const fs = require('fs-extra');
const joi = require('joi');
const consola = require('consola');

/**
 *
 * @param path {string}
 * @param callback {function}
 */
module.exports = (path, callback) => {
  if (!joi.validate(path, joi.string())) throw new TypeError('Invalid argument');
  fs.lstat(path, (lstatErr, stats) => {
    if (lstatErr) {
      consola.error(`when access to ${path}`);
      process.exit(0);
    }
    if (!stats.isFile()) {
      consola.error(`This isn't file ${path}`);
      process.exit(0);
    }
    fs.access(path, fs.constants.R_OK, accessErr => {
      if (accessErr) {
        consola.error(`when check permission of reading ${path}`);
        process.exit(0);
      }
      consola.success(path);
      callback();
    });
  });
};
