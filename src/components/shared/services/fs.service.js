import config from '../../app/app.constants';

const path = require('path');
const fs = require('fs');

export default class FileSystemService {
  constructor($q) {
    this.$q = $q;
  }

  getBaseURL() {
    return config.baseURL;
  }

  getPath() {
    return path.resolve(fs.realpathSync('./'), config.baseURL);
  }

  createSubmission(proj_name, sub_name) {
    let curBasePath = path.resolve(fs.realpathSync('./'), this.getBaseURL()),
      deferred = this.$q.defer();

    if (!proj_name)
      deferred.reject('project name must be defined!');
    else if (!sub_name)
      deferred.reject('submission name must be defined!');
    else {
      this._createFolder(curBasePath)
        .then((folder) => {
          this._createFolder(path.resolve(folder, proj_name))
            .then((folder) => {
              curBasePath = path.resolve(folder, sub_name);
              this._createFolder(curBasePath)
                .then((folder) => {
                  this._createFolder(path.resolve(folder, 'content'));
                  this._createFolder(path.resolve(folder, 'confidential'));
                  this._createFolder(path.resolve(folder, 'utils'))
                    .then((folder) => {
                      this._createFolder(path.resolve(folder, 'viewer'));
                      this._createFolder(path.resolve(folder, 'toc'));
                      this._createFolder(path.resolve(folder, 'resources'))
                    });
                })
                .then(() => {
                  return this._copyXmlTemplate(curBasePath)
                })
                .then(() => {
                  fs.writeFile(
                    path.resolve(curBasePath, '.incomplete'),
                    'The submission is not complated.',
                    (err) => {
                      if (err)
                        deferred.reject(err);
                      else
                        deferred.resolve(curBasePath);
                    }
                  );
                });
            });
        })
        .catch(err => {
          deferred.reject(err);
        });
    }
    return deferred.promise;
  }

  createProject(proj_name) {
    return this.createSubmission(proj_name, '01');
  }

  _copyXmlTemplate(folderName) {
    let deferred = this.$q.defer();
    try {
      let inputFile = path.resolve(fs.realpathSync('./'), 'resources', 'app', 'templates', 'ghsts.xml');
      let ouptFile = path.resolve(folderName, 'ghsts.xml');

      fs.createReadStream(inputFile).pipe(fs.createWriteStream(ouptFile));
      console.log('template copied');
      deferred.resolve('template copied');
    } catch (err) {
      deferred.reject(err);
    }
    return deferred.promise;
  }

  _createFolder(folderName) {
    let deferred = this.$q.defer();
    fs.mkdir(folderName, (err) => {
      if (err) {
        if (err.code === 'EEXIST')
          deferred.resolve(folderName);
        else
          deferred.reject(err);
      }
      else
        deferred.resolve(folderName);
    });
    return deferred.promise;
  }
}