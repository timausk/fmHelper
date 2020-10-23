/**
 * ToDO
 *  - move node functions to utils
 * @type {module:fs}
 */
const fs = require('fs');
const convert = require('xml-js');
const { parse } = require('path');
const utils = require('./src/utils');
const config = require('./config');

const targetFolder = './dist';
const pathFaces = config.fmUserDirs.faces;
const ext = '.png';

utils.getFiles(pathFaces, ext)
  .then((files) => {
    fs.readFile( './templates/config.xml', 'utf8', function(err, data) {
      const pathTo = 'graphics/pictures/person/0/portrait';
      const obj = convert.xml2js(data);
      let items = [];

      // create list of items to append to the file
      for (const file of files) {
        const id = parse(file).name;
        const item = {
          'type': 'element',
          'name': 'record',
          'attributes': {
            'from': id,
            'to': pathTo.replace('0', id) 
          }
        };
        items.push(item);
      }

      // append
      obj.elements[0].elements[7].elements = items;
      
      const xml = convert.js2xml(obj, {spaces: 2});
      
      fs.writeFile(targetFolder + '/config.xml', xml, function(err, data) {
        if (err) {
          console.log(err);
        }
        else {
          console.log('created a config.xml for ' + files.length + ' ids');
        }
      });
    });
  });
