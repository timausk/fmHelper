'use strict';

const {readdirSync} = require('fs');


const getFilesFromFolder = (path) => {
  return readdirSync(path).filter(function(file) {
    return file.match(/.*\.(?:png)/ig);
  });
};

const findDuplicates = (arr1, arr2) => {
  return arr1.filter(function(val) {
    return arr2.indexOf(val) !== -1;
  });
};

const deepMerge = (target, source) => {
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object) {
      Object.assign(source[key], deepMerge(target[key], source[key]));
    }
  }
  Object.assign(target || {}, source);
  return target;
};

const hasOwnProp = (obj, key) => {
  return Object.prototype.hasOwnProperty.call(obj, key);
};

const isModuleAvailable = (path) => {
  try {
    require.resolve(path);
    return true;
  } catch (e) {
    return false;
  }
};

const isEmpty = (files) => {
  return !files || !files.length;
};

const isObject = (obj) => {
  return typeof obj === 'object' && obj !== null;
};

module.exports = {
  deepMerge,
  hasOwnProp,
  isModuleAvailable,
  isEmpty,
  isObject,
  findDuplicates,
  getFilesFromFolder
};
