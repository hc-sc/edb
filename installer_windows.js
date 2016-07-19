'use strict';
var Q = require('q');
var jetPack = require('fs-jetpack');
var childProcess = require('child_process');
var projectDir = jetPack;
// Build directory is our destination where the final build will be placed
var buildDir;
// angular application directory
var appDir;
// angular application's package.json file
var distDir;

var instDir;

var manifest;

function init() {
    instDir = projectDir.dir('./resources/windows');

    buildDir = projectDir.dir('./release', { empty: true });
    // angular application directory
    appDir = projectDir.dir('./build');
    // angular application's package.json file
    manifest = appDir.read('./package.json', 'json');

    distDir = projectDir.dir('./dist/eDossierBuilder-win32-x64');

    console.log(manifest);
    return Q();
}

function createInstaller() {
    var deferred = Q.defer();


    function replace(str, patterns) {
        Object.keys(patterns).forEach(function (pattern) {
            console.log(pattern);
            var matcher = new RegExp('{{' + pattern + '}}', 'g');
            str = str.replace(matcher, patterns[pattern]);
        });
        return str;
    }

    var installScript = instDir.read('./installer.nsi');

    installScript = replace(installScript, {
        name: manifest.name,
        productName: manifest.name,
        version: manifest.version,
        src: distDir.path(),
        dest: buildDir.path(),
        icon: instDir.path('icon.ico'),
        setupIcon: instDir.path('icon.ico'),
        banner: instDir.path('banner.bmp')
    });
    buildDir.write('installer.nsi', installScript);

    var nsis = childProcess.spawn('makensis', [buildDir.path('installer.nsi')], {
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

function release() {
    return init()
        .then(createInstaller);
}

module.exports = {
    release: release
};
