const fs = require('fs');
const {join} = require('path');

/**
 * getFiles returns an array of the absolute paths of all matching files
 * @param {string} root - the absolute path to a folder
 * @param {regex} regex - the pattern to match against
 */
function getFiles(root, fileRegex) {
  return new Promise((resolve, reject) => {
    fs.readdir(root, (err, files) => {
      if (err) reject(err);
      Promise.all(files.map(file => {
        return new Promise((resolve, reject) => {
          fs.stat(join(root, file), (err, stat) => {
            if (err) reject(err);
            if (stat.isDirectory()) {
              getFiles(join(root, file), fileRegex)
              .then(files => resolve([].concat(...files)))
              .catch(err => reject(err));
            }
            else {
              if (fileRegex.test(file)) {
                resolve([join(root, file)]);
              }
              else resolve([]);
            }
          });
        });
      }))
      .then(paths => resolve([].concat(...paths)))
      .catch(err => reject(err));
    });
  });
}

/**
 * getData retrieves all matching strings from an array of absolute paths)
 * @param {files} - an array of absolute paths
 * @param {textRegex} - the regular expression of data to extract
 * @returns - an array of Objects with properties 'file' as an absolute
 *  path and 'data' as an array of matching strings
 */
function getData(files, textRegex) {
  return Promise.all(files.filter(file => {
    return new Promise((resolve, reject) => {
      const fileName = file.split('/').pop();
      fs.readFile(file, {encoding: 'utf8'}, (err, data) => {
        if (err) reject(`Error reading: ${fileName}`);
        const doc = data.match(textRegex);
        if (doc == null || doc[1] == null) resolve();
        else {
          console.log(file, doc.slice(1));
          resolve({file, data: doc.slice(1)});
        }
      });
    });
  }));
}

/**
 * getData is used to extract regexp matching data from matching file names
 * @param {root} - absolute path to a starting folder
 * @param {fileRegex} - examine files that have a matching file name
 * @param {textRegex} - extract data that matches the regex
 * @returns - an array of Objects with properties 'file' as an absolute
 *  path and 'data' as a string
 */
function getDataFromFiles(root, fileRegex, textRegex) {
  return getFiles(root, fileRegex)
  .then(files => {
    getData(files, textRegex)
    .then(fileData => console.log(fileData))
    .catch(err => console.log(err));
  });
}

getFiles(join(__dirname, '..', 'src', 'renderer', 'components'), /\.vue$/)
.then(files => {
  getData(files, /<docs>([^]*)<\/docs>/)
  .then(data => {
    data.forEach(d => d.then(result => console.log(result.file)));
  });
});

// getDataFromFiles(
//   join(__dirname, '..', 'src', 'renderer', 'components'),
//   /\.vue$/,
//   /<docs>([^]*)<\/docs>/
// )
// .then(fileData => {
//   // fileData.map(file => console.log(file.file));
//   // fileData.forEach(file => {
//   //   const fileName = file.file.split('/').pop();
//   //   console.log(fileName);
//   //   try {
//   //     fs.appendFile(join(__dirname, '..', 'index.md'), file.data[0], {encoding: 'utf8'});
//   //   }
//   //   catch(err) {
//   //     console.error('Error appending to index file');
//   //   }

//   //   fs.writeFile(join(__dirname, '..', 'docs', fileName, file.data[0], () => console.error(`Error generating ${fileName}`)));
//   // });
// })
// .catch(err => console.log(err));

module.exports = {
  getFiles,
  getData,
  getDataFromFiles
};