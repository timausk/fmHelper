/**
 * ToDO
 *  - move node functions to utils
 * @type {module:fs}
 */
const fs = require('fs');
const parser = require('xml2json');
const { parse } = require('path');
const utils = require('./src/utils');
const config = require('./config');

const targetFolder = './dist';
const pathFaces = config.fmUserDirs.faces;
const ext = '.png';

utils.getFiles(pathFaces, ext)
  .then((files) => {
    fs.readFile( './templates/config.xml', function(err, data) {
      const pathTo = 'graphics/pictures/person/0/portrait';
      const json = JSON.parse(parser.toJson(data, {reversible: true, trim: false}));

      // the node to append items (id="maps")
      const node = json['record']['list'];
      const items = [];

      for (const file of files) {
        const id = parse(file).name;
        const item = {
          'from': id,
          'to': pathTo.replace('0', id)
        };
        items.push(item);
      }
      node.record = items;

      const xml = parser.toXml(JSON.stringify(json));

      fs.writeFile(targetFolder + '/config.xml', xml, function(err, data) {
        if (err) {
          console.log(err);
        }
        else {
          console.log('created a config.xml for ' + files.length + 'ids');
        }
      });
    });
  });
