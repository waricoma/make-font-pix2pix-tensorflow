'use strict';

const argparse = require('argparse').ArgumentParser;
const consola = require('consola');
const path = require('path');
const joi = require('joi');
const delay = require('delay');
require('./modules/init')();
const accessCheck = require('./modules/access-check');
const commandCheck = require('./modules/command-check');
const wordsInf = require('./modules/SourceHanSans-Regular-V2-Words');
const wordsLen = wordsInf.words.length;
console.log(100, wordsLen);
const leftAndRightColspan = require('./modules/left-and-right-colspan');
leftAndRightColspan.setWordsLen(wordsLen);

const font2jpgWithCleaning = require('./modules/font2jpg-with-cleaning');

const parser = new argparse({
  version: '0.0.1',
  addHelp: true,
  description: 'make-font-pix2pix-tensorflow',
  argumentDefault: {flip: true}
});

parser.addArgument(['--left'], {required: true, type: 'string', help: 'path to font file'});
parser.addArgument(['--right'], {required: true, type: 'string', help: 'path to font file'});
parser.addArgument(['--notify'], {type: 'string', defaultValue: 'false', help: 'true or false : notify some event'});
parser.addArgument(['--sound'], {type: 'string', defaultValue: 'false', help: 'true or false : for --notify'});
parser.addArgument(['--delayA'], {type: 'int', defaultValue: 250, help: 'await delay(i * (i % ${delayA} === 0 ? ${delayB} : ${delayC}))'});
parser.addArgument(['--delayB'], {type: 'int', defaultValue: 1000, help: 'await delay(i * (i % ${delayA} === 0 ? ${delayB} : ${delayC}))'});
parser.addArgument(['--delayC'], {type: 'int', defaultValue: 100, help: 'await delay(i * (i % ${delayA} === 0 ? ${delayB} : ${delayC}))'});

const args = parser.parseArgs();
args.left = path.resolve(args.left);
args.right = path.resolve(args.right);
if (args.left === args.right) consola.warn('left and right are equal.');

leftAndRightColspan.setNotifyConf(args.notify, args.sound);
leftAndRightColspan.setDelayConf(args.delayA, args.delayB, args.delayC);

/**
 *
 * @param leftOrRight {string}
 * @param i {number}
 */
const forTuning = async (leftOrRight, i) => {
  if (!joi.validate(leftOrRight, joi.string().regex(/^(left|right)$/))) throw new TypeError('Invalid argument');
  if (!joi.validate(i, joi.number().integer().min(0))) throw new TypeError('Invalid argument');

  await delay(i * (i % args.delayA === 0 ? args.delayB : args.delayC));
  await font2jpgWithCleaning(leftOrRight, args[leftOrRight], wordsInf.words[i], wordsInf.unicodes[i], (check, jpgName) => leftAndRightColspan.addWordInf(leftOrRight, check, jpgName));
  await process.stdout.write(`\r${i}/${wordsLen-1}`);
};

consola.info('must: https://imagemagick.org/script/download.php');
commandCheck('convert', () => commandCheck('mogrify', () => commandCheck('identify', () => accessCheck(args.left, () => accessCheck(args.right, () => {
  consola.start('font to jpg');
  for(let i = 0; i < wordsLen; i++) for (let leftOrRight of ['left', 'right']) forTuning(leftOrRight, i);
}) ) ) ) );


