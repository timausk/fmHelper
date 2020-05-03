const fm = require('./fmHelper');
const config = require('./config');

const args = process.argv.slice(2);

if (args.length === 2) {
  let paths = fm.buildPaths(config.fmUserDirs, args);
  fm.duplicatesCheck(paths[0], paths[1]);
} else {
  console.log('you have to pass folder paths as arguments');
}
