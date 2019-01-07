'use strict';

const fs = require('fs-extra');
const path = require('path');

module.exports = () => {
  fs.mkdirs(path.resolve(__dirname, '..', 'workspace', 'left'));
  fs.mkdirs(path.resolve(__dirname, '..', 'workspace', 'right'));
  fs.mkdirs(path.resolve(__dirname, '..', 'workspace', 'left-and-right'));
};
