'use strict';

const _ = require('lodash');
const fs = require('fs');
const path = require('path');


module.exports = class SchemaLoader {
  static loadSchema(name, version) {
    console.log(name);
    let basePath = path.resolve(fs.realpathSync('./resources/app/standards/'), version.replace(/\./g, '_'), 'jsondefinitions');
    let fileName = path.join(basePath, name + '.json');
    let jsonixSchema = require(fileName);
    let coveredSchema = { TYPE_NAME: { type: 'String', default: jsonixSchema.localName } };
    let cover;
    let isExtPicklistItem = _.filter(jsonixSchema.propertyInfos, (item) => {
      if (item.name === 'value' || item.name === 'valuedecode') {
        return item;
      }
    });

    if (isExtPicklistItem.length === jsonixSchema.propertyInfos.length) {
      cover = {
        type: 'ObjectId',
        ref: 'Picklist'
      };
      return cover;
    } else
      for (var i = 0; i < jsonixSchema.propertyInfos.length; i++) {
        let item = jsonixSchema.propertyInfos[i];
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
          } else {
            cover = SchemaLoader.loadSchema(item.typeInfo.slice(1), version);
          }
        } else if (item.typeInfo === 'Decimal' || item.typeInfo === 'PositiveInteger') {
          cover = {
            type: 'Number'
          };
        } else {
          cover = {
            type: item.typeInfo
          };
        }
        if (item.collection)
          coveredSchema[item.name] = [cover];
        else {
          if (item.required && item.name !== 'metadatastatus' && (item.typeInfo && !item.typeInfo[0] === '.')) {
            cover.required = true;
          }
          coveredSchema[item.name] = cover;
        }

      }

    return coveredSchema;
  }
};
