'use strict';

const { execFile } = require('child_process');
const consola = require('consola');
const notifier = require('node-notifier');
const open = require('open');
const path = require('path');
const joi = require('joi');
const delay = require('delay');

let wordsLen = 0;
const wordsInf = {
  left: {words: [], jpgNames: [], finish: 0},
  right: {words: [], jpgNames: [], finish: 0}
};
const workspacePath = {
  left: path.resolve(__dirname, '..', 'workspace', 'left'),
  right: path.resolve(__dirname, '..', 'workspace', 'right'),
  leftAndRight: path.resolve(__dirname, '..', 'workspace', 'left-and-right')
};
let notify, sound;
let delayA, delayB, delayC;

/**
 *
 * @param wordsLenArg {number}
 */
module.exports.setWordsLen = wordsLenArg => {
  if(!joi.validate(wordsLenArg, joi.number().integer().min(1))) throw new TypeError('Invalid argument');
  wordsLen = wordsLenArg;
};

/**
 *
 * @param notifyArg {string}
 * @param soundArg {string}
 */
module.exports.setNotifyConf = (notifyArg, soundArg) => {
  if (!joi.validate(notifyArg, joi.string())) throw new TypeError('Invalid argument');
  if (!joi.validate(soundArg, joi.string())) throw new TypeError('Invalid argument');

  notify = notifyArg;
  sound = soundArg;
};

/**
 *
 * @param delayAArg {number}
 * @param delayBArg {number}
 * @param delayCArg {number}
 */
module.exports.setDelayConf = (delayAArg, delayBArg, delayCArg) => {
  if (!joi.validate(delayAArg, joi.number().integer())) throw new TypeError('Invalid argument');
  if (!joi.validate(delayBArg, joi.number().integer())) throw new TypeError('Invalid argument');
  if (!joi.validate(delayCArg, joi.number().integer())) throw new TypeError('Invalid argument');

  delayA = delayAArg;
  delayB = delayBArg;
  delayC = delayCArg;
};

/**
 *
 * @param i
 * @param jpgFile
 * @param setJpgNamesLen
 */
const forTuning = async (i, jpgFile, setJpgNamesLen) => {
  await delay((i * (i % delayA === 0 ? delayB : delayC)) * 0.25);
  await execFile(
    'convert',
    [
      '+append',
      path.resolve(workspacePath.left, jpgFile),
      path.resolve(workspacePath.right, jpgFile),
      path.resolve(workspacePath.leftAndRight, jpgFile)
    ],
    (err, stdout, stderr) => {
      if (i >= setJpgNamesLen-1) {
        if (notify === 'true') notifier.notify({
          title: title,
          message: 'when resizing to left all jpg.',
          icon: icon,
          sound: sound === 'true',
          wait: true
        });

        console.log();
        consola.success('finish.');
        process.exit(1);
      }
      if (err) consola.error(`when making left + right jpg ${jpgFile}`, stderr, err);
    }
  );
  await process.stdout.write(`\r${i}/${setJpgNamesLen-1}`);
};

/**
 *
 */
const lrColspan = () => {
  const setJpgNames = wordsInf.left.jpgNames.filter(jpgName => wordsInf.right.jpgNames.indexOf(jpgName) !== -1);
  const setJpgNamesLen = setJpgNames.length;
  for (let i = 0; i < setJpgNamesLen; i++) forTuning(i, `${setJpgNames[i]}.jpg`, setJpgNamesLen);
};

/**
 *
 */
const allResizeLrColspan = () => execFile('mogrify',
  ['-thumbnail', '256x256!', path.resolve(workspacePath.left, '*.jpg')],
  (leftErr, leftStdout, leftStderr) => {
  if (leftErr) {
    consola.error('when resizing to left all jpg.', leftStderr, leftErr);
    if (notify === 'true') notifier.notify({
      title: title,
      message: 'when resizing to left all jpg.',
      icon: icon,
      sound: sound === 'true',
      wait: true
    });
    throw leftErr;
  }

  execFile('mogrify',
    ['-thumbnail', '256x256!', path.resolve(workspacePath.right, '*.jpg')],
    (rightErr, rightStdout, rightStderr) => {
    if (rightErr) {
      consola.error('when resizing to right all jpg.', rightStderr, rightErr);
      if (notify === 'true') notifier.notify({
        title: title,
        message: 'when resizing to left all jpg.',
        icon: icon,
        sound: sound === 'true',
        wait: true
      });
      throw rightErr;
    }

    lrColspan();
  });
});

/**
 *
 * @param leftOrRight {string}
 */
const finishUpNextAllResize = leftOrRight => {
  wordsInf[leftOrRight].finish++;
  if (wordsInf.left.finish < wordsLen-1 || wordsInf.right.finish < wordsLen-1) return true;
  console.log();
  consola.success('font2jpg');
  consola.start('make left + right jpg');
  allResizeLrColspan();
};

/**
 *
 * @param leftOrRight {string}
 * @param check {boolean}
 * @param jpgName {string}
 */
module.exports.addWordInf = (leftOrRight, check, jpgName) => {
  if (delayA === null) throw new TypeError('must: setDelayConf {function}');
  if (wordsLen === 0) throw new TypeError('must: setWordsLen {function}');
  if (!joi.validate(leftOrRight, joi.string().regex(/^(left|right)$/))) throw new TypeError('Invalid argument');
  if (!joi.validate(check, joi.boolean())) throw new TypeError('Invalid argument');
  if (!check) {
    finishUpNextAllResize(leftOrRight);
    return true;
  }
  if (!joi.validate(jpgName, joi.number().integer().min(0))) throw new TypeError('Invalid argument');

  wordsInf[leftOrRight].jpgNames.push(jpgName);
  finishUpNextAllResize(leftOrRight);
};

if (notify === 'true') notifier.on('click', () => open(path.resolve(__dirname, '..')));
