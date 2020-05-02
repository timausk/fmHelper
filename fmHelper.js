const {readdirSync} = require('fs');

module.exports = {
  duplicatesCheck: function (pathA, pathB) {
    let filesFolderA = this.getFilesFromFolder(pathA);
    if (this.isEmpty(filesFolderA)) {
      console.log(`no files found in folder: ${pathA}`);
      return;
    }

    let filesFolderB = this.getFilesFromFolder(pathB);
    if (this.isEmpty(filesFolderB)) {
      console.log(`no files found in folder: ${pathB}`);
      return;
    }

    let duplicates = this.findDublicates(filesFolderA, filesFolderB);
    if (this.isEmpty(duplicates)) {
      console.log('no duplicate files found');
      return;
    } else {
      console.log('duplicate items found: ');
      duplicates.forEach((item, index) => {
        console.log(`${index}: ${item}`);
      });
    }
  },
  getFilesFromFolder: function (path) {
    return readdirSync(path).filter(function(file) {
      return file.match(/.*\.(?:png)/ig);
    });
  },
  isEmpty: function (files) {
    return !files || !files.length;
  },
  findDublicates: function (arr1, arr2) {
    return arr1.filter(function(val) {
      return arr2.indexOf(val) != -1;
    });
  }
};
