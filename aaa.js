'use strict';

const fs = require('fs-extra');

/*
fs.readdir('~/Documents/devspace/make-font-pix2pix-tensorflow/workspace/left', (e, lFiles) => {
  fs.readdir('~/Documents/devspace/make-font-pix2pix-tensorflow/workspace/right', (e, rFiles) => {
    for (let rFile of rFiles) if (lFiles.indexOf(rFile) === -1) fs.unlink(`~/Documents/devspace/make-font-pix2pix-tensorflow/workspace/right/${rFile}`);
    for (let lFile of lFiles) if (rFiles.indexOf(lFile) === -1) fs.unlink(`~/Documents/devspace/make-font-pix2pix-tensorflow/workspace/right/${lFile}`);
  });
});


*/

fs.readdir('~/Documents/devspace/make-font-pix2pix-tensorflow/workspace/left', (e, files) => {
  for (let i = 0; i < files.length; i++) fs.rename(`~/Documents/devspace/make-font-pix2pix-tensorflow/workspace/left/${files[i]}`, `~/Documents/devspace/make-font-pix2pix-tensorflow/workspace/left/${i+1}.jpg`);
});
