'use strict';

const { execFile } = require('child_process');
const fs = require('fs-extra');
const path = require('path');
const joi = require('joi');
const consola = require('consola');

/**
 *
 * @param leftOrRight {string}
 * @param fontPath {string}
 * @param word {string}
 * @param jpgName {string}
 * @param callback {function}
 */
module.exports = (leftOrRight, fontPath, word, jpgName, callback) => {
  if (!joi.validate(leftOrRight, joi.string().regex(/^(left|right)$/))) throw new TypeError('Invalid argument');
  if (!joi.validate(fontPath, joi.string())) throw new TypeError('Invalid argument');
  if (!joi.validate(word, joi.string().length(1))) throw new TypeError('Invalid argument');
  if (!joi.validate(jpgName, joi.number().integer().min(0))) throw new TypeError('Invalid argument');
  if (!joi.validate(callback, joi.func().minArity(1))) throw new TypeError('Invalid argument');

  const jpgPath = path.resolve(__dirname, '..', 'workspace', leftOrRight, `${jpgName}.jpg`);

  execFile('convert',
    ['-font', fontPath, '-pointsize', '256', `label:${word}`, jpgPath],
    (font2jpgErr, font2jpgStdout, font2jpgStderr) => {
    if (font2jpgErr) {
      consola.error('font2jpg', word, font2jpgStderr, font2jpgErr);
      callback(false);
      return false;
    }

    execFile('identify',
      ['-format', '"%[mean]"', jpgPath],
      (checkJpgErr, checkJpgStdout, checkJpgStderr) => {
      if (checkJpgErr) {
        consola.error('checkJpg', word, checkJpgStderr, checkJpgErr);
        fs.unlink(jpgPath, () => callback(false));
        return false;
      }
      const checkVal = parseInt(checkJpgStdout.trim().replace(/"/g, ''));

      if (checkVal === 65535) {
        consola.error(`there isn't ${word} in ${fontPath}`);
        fs.unlink(jpgPath, () => callback(false));
        return false;
      }

      callback(true, jpgName);
    });
  });
};
