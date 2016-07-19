'use strict';
var Q = require('q');
var jetPack = require('fs-jetpack');
var childProcess = require('child_process');
var projectDir = jetPack;
// Release directory is our destination where the final installer will be placed
var distDir;
// angular application directory
var appDir;
// Source of executeable files folder
var sourceDir;
// NSIS builder script folder
var scriptDir;
// reading variables from package.json under edb\app 
var manifest;

function init() {
    scriptDir = projectDir.dir('resources/build-win-installer');
    distDir = projectDir.dir('release', { empty: true });
    appDir = projectDir.dir('app');
    manifest = appDir.read('package.json', 'json');
    sourceDir = projectDir.dir('dist/eDossierBuilder-win32-x64');
    return Q();
}

function createInstaller() {
    var deferred = Q.defer();


    function replace(str, patterns) {
        Object.keys(patterns).forEach(function (pattern) {
            var matcher = new RegExp('{{' + pattern + '}}', 'g');
            str = str.replace(matcher, patterns[pattern]);
        });
        return str;
    }

    var installScript = scriptDir.read('installer.nsi');

    installScript = replace(installScript, {
        name: manifest.name,
        productName: manifest.name,
        version: manifest.version,
        src: sourceDir.path(),
        dest: distDir.path('eDossierBuilderInstaller-win32-x64.exe'),
        icon: scriptDir.path('icon.ico'),
        setupIcon: scriptDir.path('icon.ico'),
        banner: scriptDir.path('banner.bmp')
    });
    distDir.write('installer.nsi', installScript);

    var nsis = childProcess.spawn('makensis', [distDir.path('installer.nsi')], {
        stdio: 'inherit'
    });

    nsis.on('error', function (err) {
        if (err.message === 'spawn makensis ENOENT') {
            throw "Can't find NSIS. Are you sure you've installed it and"
            + " added to PATH environment variable?";
        } else {
            throw err;
        }
    });

    nsis.on('close', function () {
        deferred.resolve();
    });

    return deferred.promise;

}

function removeTemp() {
    return distDir.remove('installer.nsi');
}

function release() {
    return init()
        .then(createInstaller)
        .then(removeTemp);
}

module.exports = {
    release: release
};
