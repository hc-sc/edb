var del = require('del');
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var jspm = require('gulp-jspm');
var rename = require('gulp-rename');
var shell = require('gulp-shell');
var runSequence = require('run-sequence');
var Q = require('q');

var distF = function() {
    return Q.all(shell.task(
        'electron-packager build --platform=win32 --arch=x64 --version=1.2.3 --icon=resources/worldwide_128px_1201435_easyicon.net.ico --out=dist --overwrite'
    ));
};

const INCLUDES = ['app/renderer/**/*.js'];
const EXCLUDES = [];

const GLOB = INCLUDES.concat(EXCLUDES);

var copyBundledIndexHtml = function() {
    return Q.all(gulp.src('app/renderer/index.html.bundled')
        .pipe(rename('index.html'))
        .pipe(gulp.dest('build/renderer')));
};

var bundleJS = function() {
    return Q.all(gulp.src('app/renderer/app.js')
        .pipe(jspm({
            selfExecutingBundle: true,
            minify: true,
            mangle: false,
            skipSourceMaps: true
        }))
        .pipe(gulp.dest('build/renderer/')));
};

var bundle = function() {
    return copyBundledIndexHtml().then(bundleJS);
};

var buildF = function() {
    return packF().then(bundle).then(distF);
}

var packF = function() {
    return Q.all([
        gulp.src(['app/package.json'])
            .pipe(gulp.dest('build')),
        gulp.src(['app/renderer/data/**/*.*'])
            .pipe(gulp.dest('build/renderer/data')),
        gulp.src(['app/renderer/projects/**/*.*'])
            .pipe(gulp.dest('build/projects')),
        gulp.src(['app/renderer/img/**/*.*'])
            .pipe(gulp.dest('build/renderer/img')),
        gulp.src(['app/renderer/scripts/**/*.html'])
            .pipe(gulp.dest('build/renderer/scripts')),
        gulp.src(['app/main/**/*.js'])
            .pipe(gulp.dest('build/main'))
    ]);
}

var cleanF = function() {
    return del(['build', 'dist']);
}

var distF = function() {
//    return Q.all(
shell.task(
    'electron-packager build --platform=win32 --arch=x64 --version=1.2.3 --icon=resources/worldwide_128px_1201435_easyicon.net.ico --out=dist --overwrite'
);       
//    );
}

// make sure the linter doesn't spot any errors
gulp.task('lint', function() {
    return gulp.src(GLOB)
        .pipe(eslint({
            "quiet": true
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

// deletes any files that will be copied over with 'pack'
gulp.task('clean:build', function() {
    return del(['build']).then(() => console.log('All files cleaned'));
});

// deletes the release dir
gulp.task('clean:dist', function() {
    return del(['dist'])
        .then(() => console.log('Dist dir cleaned'));
})

// cleans everything
gulp.task('clean', function() {
    return runSequence('clean:build', 'clean:dist');
});

// tdd
gulp.task('tdd', function() {

});

// // just bundles

gulp.task('bundle', bundle);

// bundles and produces source-maps
gulp.task('bundle:map', shell.task(
    'cd app && jspm bundle-sfx app.js ../build/renderer/bundle.js --no-mangle'
));

// transfers resources to the build dir for packaging
gulp.task('pack', function() {
    return Q.all([
        gulp.src(['app/package.json'])
            .pipe(gulp.dest('build')),
        gulp.src(['app/renderer/data/**/*.*'])
            .pipe(gulp.dest('build/renderer/data')),
        gulp.src(['app/renderer/projects/**/*.*'])
            .pipe(gulp.dest('build/projects')),
        gulp.src(['app/renderer/img/**/*.*'])
            .pipe(gulp.dest('build/renderer/img')),
        gulp.src(['app/renderer/scripts/**/*.html'])
            .pipe(gulp.dest('build/renderer/scripts')),
        gulp.src(['app/main/**/*.js'])
            .pipe(gulp.dest('build/main'))
    ]);
});

gulp.task('pack:bundle', function() {
    runSequence('clean', 'pack', 'bundle');
});

gulp.task('dist', shell.task(
    'electron-packager build --platform=win32 --arch=x64 --version=1.2.3 --icon=resources/worldwide_128px_1201435_easyicon.net.ico --out=dist --overwrite'
));

// build the executable. NOTE should lint first!
gulp.task('build', function() {
    return cleanF().then(packF).then(bundle).then(distF);
});

gulp.task('build:map', function() {
    runSequence('clean', 'pack', 'bundle:map', 'dist');
});

gulp.task('create-windows-installer', function() {
    console.log("Create Windows Installer using NSIS for - " + os.platform());
    switch(os.platform()) {
         case 'darwin': 
         // execute build.osx.js 
         break; 
         case 'linux': 
         //execute build.linux.js 
         break; 
         case 'win32': 
         return winInstaller.release();        
    }
});
