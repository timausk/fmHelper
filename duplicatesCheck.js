const fm = require('./fmHelper');
const config = require('./config');
const print = require('./src/printer');

const args = process.argv.slice(2);

if (args.length === 2) {
  fm.buildPaths(config.fmUserDirs, args)
    .then(paths => fm.duplicatesCheck(paths[0], paths[1]))
    .catch(err => print.error(err));
} else {
  print.warning('you have to pass folder paths as arguments');
}
