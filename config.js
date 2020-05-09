const fm = require('./fmHelper');
const utils = require('./src/utils');
const path = require('path');

const dirHome = process.env['HOME'];
const dirRoot = path.dirname(require.main.filename);
const localConfigFilename = 'config.local.js';

const baseConfig = {};
baseConfig.fmVersion = 2019;
baseConfig.fmUserDirs = {};
baseConfig.fmUserDirs.base = dirHome + '/Documents/Sports Interactive/Football Manager 2019';
baseConfig.fmUserDirs.graphics = baseConfig.fmUserDirs.base + '/graphics';
baseConfig.fmUserDirs.players = baseConfig.fmUserDirs.graphics + '/players';
baseConfig.fmUserDirs.logos = baseConfig.fmUserDirs.graphics + '/logos';
baseConfig.fmUserDirs.kits = baseConfig.fmUserDirs.graphics + '/kits';


const localConfig = fm.getLocalConfig(dirRoot + '/' + localConfigFilename);

module.exports = localConfig ? utils.deepMerge(baseConfig, localConfig) : baseConfig;
