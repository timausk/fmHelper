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
  findDublicates: function (arr1, arr2) {
    return arr1.filter(function(val) {
      return arr2.indexOf(val) != -1;
    });
  },
  getLocalConfig: function(path) {
    if (this.isModuleAvailable(path)) {
      const config = require(path);
      return this.isObject(config) ? config : false;
    }
  },
  buildPaths: function(dirs, args) {
    let paths = [];
    for (let arg of args) {
      if (this.hasOwnProp(dirs, arg)) {
        // get path from config
        paths.push(dirs[arg]);
      } else {
        // use passed arg as path
        paths.push(arg);
      }
    }
    return paths;
  },
  isEmpty: function (files) {
    return !files || !files.length;
  },
  isObject: function (obj) {
    return typeof obj === 'object' && obj !== null;
  },
  isModuleAvailable: function(path) {
    try {
      require.resolve(path);
      return true;
    } catch (e) {
      return false;
    }
  },
  deepMerge: function (target, source) {
    for (const key of Object.keys(source)) {
      if (source[key] instanceof Object) Object.assign(source[key], this.deepMerge(target[key], source[key]));
    }
    Object.assign(target || {}, source);
    return target;
  },
  hasOwnProp: function (obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
  }
};
