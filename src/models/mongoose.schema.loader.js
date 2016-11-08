'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const _ = require('lodash');
const fs = require('fs');
const path = require('path');


module.exports = class SchemaLoader {
  static loadSchema(name, version) {
    let basePath = path.resolve(fs.realpathSync('./resources/app/standards/'), version.replace(/\./g, '-'), 'jsondefinitions');
    let fileName = path.join(basePath, name + '.json');
    let jsonixSchema = require(fileName);
    let coveredSchema = { TYPE_NAME: {type: String, default: jsonixSchema.localName }};
    let isExtPicklistItem = _.filter(jsonixSchema.propertyInfos, (item) => {
      if (item.typeInfo && item.typeInfo.startsWith('.EXTENSIONTYPE')) {
        return item;
      }
    });

    if (isExtPicklistItem.length > 0) {
      return {
        type: 'ObjectId',
        ref: 'Picklist'
      };
    } else
      jsonixSchema.propertyInfos.map(item => {
        let cover = undefined;
        if (!item.typeInfo || item.type === 'attribute') {
          cover = {
            type: 'String'
          };
        } else if (item.typeInfo[0] === '.') {
          if (item.typeInfo.startsWith('.TYPE') || item.typeInfo.startsWith('.EXTENSIONTYPE')) {
            cover = {
              type: 'ObjectId',
              ref: 'Picklist'
            };
          } else
            cover = SchemaLoader.loadSchema(item.typeInfo.slice(1), version);
        } else {
          cover = {
            type: item.typeInfo
          };
        }
        if (cover && item.required) {
          cover.required = true;
        }
        if (item.collection)
          coveredSchema[item.name] = [cover];
        else
          coveredSchema[item.name] = cover;
      });
    console.log(fileName);
    console.log(coveredSchema);
    return coveredSchema;
  }
};
