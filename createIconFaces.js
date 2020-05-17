/**
 * ToDo:
 *  - config paths
 *  - check if iconFaces folder exist and create
 *  - generate icon faces just if not exist
 */
const sharp = require('sharp');
const config = require('./config');
const utils = require('./src/utils');
const print = require('./src/printer');

const pathFaces = config.fmUserDirs.customFaces;
const pathIconFaces = utils.joinPath(pathFaces, '../iconfaces/');
const extension = '.png';
const iconFaceDimension = {
  height: 25,
  width: 18
};

utils.getFiles(pathFaces, extension)
  .then((files) => {
    for (let file of files) {
      let inputFilePath = pathFaces + file;
      let outputFilePath = pathIconFaces + file;
      sharp(inputFilePath).resize(iconFaceDimension).toFile(outputFilePath)
        .catch(function(err){
          print.error(`Error: ${err}`);
        });
    }
  })
  .catch(err => print.error(`Error: ${err}`));
