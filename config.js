const fm = require('./fmHelper');

const localConfigPath = './config.local.js';
const localConfig = fm.getLocalConfig(localConfigPath);

const baseConfig = {};

baseConfig.fmVersion = 2019;
baseConfig.fmUserDirs = {};
baseConfig.fmUserDirs.base = 'Documents/Sports Interactive/Football Manager 2019';
baseConfig.fmUserDirs.graphics = baseConfig.fmUserDirs.base + '/graphics';
baseConfig.fmUserDirs.players = baseConfig.fmUserDirs.graphics + '/players';
baseConfig.fmUserDirs.logos = baseConfig.fmUserDirs.graphics + '/logos';
baseConfig.fmUserDirs.kits = baseConfig.fmUserDirs.graphics + '/kits';

module.exports = localConfig ? fm.deepMerge(baseConfig, localConfig) : baseConfig;
