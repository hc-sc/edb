var copydir = require('copy-dir');
var fs = require('fs');
copydir.sync('./node_modules/jsonix/jsonschemas', './resources/app/standards/jsonschemas');

//extraction of schema to .json file
//var GHSTSJsonSchema = JSON.parse(fs.readFileSync('./resources/app/standards/01_00_00/GHSTS.jsonschema').toString());
var GHSTS = require('./resources/app/standards/01_00_00/GHSTS').GHSTS;

var count = 0;
var defName_arr = [];

var transf2vm = function (doc) {
  let ret = { vrole: undefined, fields: undefined };
  let fields = {}, vrole = {};
  //  console.log(doc['propertyInfos']);
  doc.propertyInfos.map(prop => {
    let roles = {empty: true};
    if (prop.collection)
      fields[prop.name] = [];
    else if (prop['typeInfo'] && !prop['type']) {
      let lTypeInfo = prop['typeInfo'];
      lTypeInfo = lTypeInfo.slice(lTypeInfo.lastIndexOf('.') + 1).toLowerCase();
      if (!lTypeInfo.startsWith('type') &&
        !lTypeInfo.endsWith('struct') &&
        !lTypeInfo.endsWith('type') &&
        lTypeInfo !== 'country' &&
        lTypeInfo !== 'unit')
        if (lTypeInfo === 'decimal' || lTypeInfo === 'positiveinteger')
          fields[prop.name] = '';
        else if (lTypeInfo === 'boolean')
          fields[prop.name] = false;
        else if (lTypeInfo === 'date')
          fields[prop.name] = 'Date';
        else
          fields[prop.name] = { ref: prop['typeInfo'].slice(prop['typeInfo'].lastIndexOf('.') + 1).toLowerCase() };
      else
        fields[prop.name] = '';  //Picklist Items
    }
    else
      fields[prop.name] = '';
    if (!fields.hasOwnProperty('has'))
      fields.has = true;
    
    if (prop.required) {
      roles.required = true;
      delete roles.empty;
    }

    if (prop.minOccurs > 0) {
      roles.min = prop.minOccurs;
      delete roles.empty;
    } 

    if (prop.maxOccurs > 0) {
      roles.max = prop.maxOccurs;
      delete roles.empty;
    }

    if (!roles.hasOwnProperty('empty')) {
      vrole[prop.name] = roles;
      vrole.has = true;
    }
  });

  if (fields.has) {
    delete fields.has;
    ret.fields = fields;
  }

  if (vrole.has) {
    delete vrole.has;
    ret.vrole = vrole;
  }

  return JSON.stringify(ret, undefined, '\t');
};

// We reuse GHSTSMappings variable declared in file GHSTSMappings.js which are generated by jsonix
// to count number of GHSTS definitions
GHSTS.typeInfos.forEach(ghstsDefn => {
  defName_arr.push(ghstsDefn.localName);
});

GHSTS.typeInfos.forEach(ghstsDefn => {
  //defName_arr.push(ghstsDefn.localName);
  //console.log(count + ": " + JSON.stringify(ghstsDefn));
  count++;
  var defLocalName = ghstsDefn.localName;
  var jsondef = JSON.stringify(ghstsDefn, undefined, '\t');
  var path = './resources/app/standards/01_00_00/jsondefinitions/' + defLocalName + '.json';
  var vmfilename = defLocalName.slice(defLocalName.lastIndexOf('.') + 1).toLowerCase();
  var vmPath;
  if (vmfilename.startsWith('type') ||
    vmfilename.startsWith('extension') ||
    vmfilename.endsWith('type') ||
    vmfilename === 'country' ||
    vmfilename === 'unit') {
    vmPath = undefined;
  } else {
    vmPath = './src/renderer/view-models/gen/' + vmfilename + '.json';
  }
  try {
    fs.writeFileSync(path, jsondef);
    console.log(path + ' was saved!');
    if (vmPath) {
      try {
        fs.writeFileSync(vmPath, transf2vm(ghstsDefn));
        console.log(vmPath + ' was saved!');
      } catch(err) {
        if (err) console.log(vmPath + ' failed as ' + err);
      }
    }
  } catch (err) {
    if (err) console.log(path + ' failed as ' + err);
  }
});


