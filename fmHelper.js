const print = require('./src/printer');
const utils = require('./src/utils');

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
  
  buildPaths: function(dirs, args) {
    let paths = [];
    for (let arg of args) {
      console.log({arg});
      if (utils.hasOwnProp(dirs, arg)) {
        // get path from config
        paths.push(dirs[arg]);
      } else {
        // use passed arg as path
        paths.push(arg);
      }
    }
    return paths;
  }
};
