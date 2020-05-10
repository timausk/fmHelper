const config = require('./config');
const fm = require('./src/helper');
const print = require('./src/printer');
const utils = require('./src/utils');

const args = process.argv.slice(2);

if (args.length === 2) {
  fm.buildPaths(config.fmUserDirs, args)
    .then((paths) => {
      let pathA = paths[0];
      let pathB = paths[1];
      
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
    })
    .catch(err => print.error(err));
} else {
  print.warning('you have to pass folder paths as arguments');
}
