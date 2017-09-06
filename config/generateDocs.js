const fs = require('fs');
const {join} = require('path');

/**
 * getFiles returns an array of the absolute paths of all matching files
 * @param {string} root - the absolute path to a folder
 * @param {regex} regex - the pattern to match against
 */
function getFiles(root, regex) {
  return new Promise((resolve, reject) => {
    fs.readdir(root, (err, files) => {
      if (err) reject(err);
      Promise.all(files.map(file => {
        return new Promise((resolve, reject) => {
          fs.stat(join(root, file), (err, stat) => {
            if (err) reject(err);
            if (stat.isDirectory()) {
              getFiles(join(root, file), regex)
              .then(files => resolve([].concat(...files)))
              .catch(err => reject(err));
            }
            else {
              if (regex.test(file)) {
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

getFiles(join(__dirname, '..', 'src', 'renderer', 'components'), /\.vue$/)
.then(files => {
  fs.open(join(__dirname, '..', 'docs.md'), 'w', (err, docs) => {
    if (err) return console.error('Error opening doc file');
    files.forEach(file => {
      const fileName = file.split('/').pop();
      fs.readFile(file, {encoding: 'utf8'}, (err, data) => {
        if (err) return console.error(`Error reading: ${fileName}`);
        const doc = data.match(/<docs>([^]*)<\/docs>/);
        if (doc == null || doc[1] == null) return;
        fs.appendFile(docs, doc[1], err => {
          if (err) console.error(`Error appending: ${fileName}`);
          else console.log(`Added: ${fileName}`);
        });
      });
    });
  });
})
.catch(err => console.log(err));

module.exports = {
  getFiles
};