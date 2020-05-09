const utils = require('./src/utils');
const fs = require('fs');

module.exports = {
  getLocalConfig: function(path) {
    if (utils.isModuleAvailable(path)) {
      const config = require(path);
      return utils.isObject(config) ? config : false;
    }
  },
  
  /**
   * @param {Object} dirs
   * @param {string[]} args
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
