const print = require('./src/printer');
const utils = require('./src/utils');
const fs = require('fs');

module.exports = {
  duplicatesCheck: function (pathA, pathB) {
    let filesFolderA = utils.getFilesFromFolder(pathA);
    if (utils.isEmpty(filesFolderA)) {
      print.info(`no files found in folder: ${pathA}`);
      return;
    }

    let filesFolderB = utils.getFilesFromFolder(pathB);
    if (utils.isEmpty(filesFolderB)) {
      print.info(`no files found in folder: ${pathB}`);
      return;
    }

    let duplicates = utils.findDuplicates(filesFolderA, filesFolderB);
    if (utils.isEmpty(duplicates)) {
      print.info('no duplicate files found');
    } else {
      print.ok('duplicate items found: ');
      duplicates.forEach((item, index) => {
        print.info(`${index}: ${item}`);
      });
    }
  },

  getLocalConfig: function(path) {
    if (utils.isModuleAvailable(path)) {
      const config = require(path);
      return utils.isObject(config) ? config : false;
    }
  },
  
  /**
   * @param {object} dirs
   * @param {object[]} args
   * @returns {Promise<string[], Error>}
   */
  buildPaths: function(dirs, args) {
    return new Promise((resolve, reject) => {
      let paths = [];
      for (let arg of args) {
        let path = utils.hasOwnProp(dirs, arg) ? dirs[arg] : arg;
        if (!fs.existsSync(path)) {
          reject(`path [${path}] does not exist`);
        }
        paths.push(path);
      }
      resolve(paths);
    });
  }
};
