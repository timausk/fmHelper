const fm = require('./fmHelper');

const homeDir = process.env['HOME'];
const args = process.argv.slice(2);

if (args.length === 2) {
  const pathA = homeDir + '/' + args[0];
  const pathB = homeDir + '/' + args[1];
  fm.duplicatesCheck(pathA, pathB);
} else {
  console.log('you have to pass folder paths as arguments');
}
