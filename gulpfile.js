var del = require('del');
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var jspm = require('gulp-jspm');
var shell = require('gulp-shell');
var runSequence = require('run-sequence');


const INCLUDES = ['app/renderer/**/*.js'];
const EXCLUDES = [];

const GLOB = INCLUDES.concat(EXCLUDES);

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
gulp.task('clean', function(callback) {
    return del([
        'build/renderer/scripts/',
        'build/renderer/img/',
        'build/renderer/data/',
        'build/renderer/bundle.js',
        'build/package.json'
    ]).then(() => console.log('All files cleaned'));
});

// deletes the release dir
gulp.task('clean:dist', function() {
    return del(['dist'])
        .then(() => console.log('Dist dir cleaned'));
})

// cleans everything
gulp.task('clean:full', function() {
    return runSequence('clean', 'clean:dist');
});

// tdd
gulp.task('tdd', function() {

});

// // just bundles

gulp.task('bundle', function() {
    return gulp.src('app/renderer/app.js')
        .pipe(jspm({
            selfExecutingBundle: true,
            minify: true,
            mangle: false,
            skipSourceMaps: true
        }))
        .pipe(gulp.dest('build/renderer/bundle.js'))
});

// bundles and produces source-maps
gulp.task('bundle:map', shell.task(
    'cd app && jspm bundle-sfx app.js ../build/renderer/bundle.js --no-mangle'
));

// transfers resources to the build dir for packaging
gulp.task('pack', function() {
    return Promise.all([
        gulp.src(['app/package.json'])
            .pipe(gulp.dest('build/')),
        gulp.src(['app/renderer/data/**/*.*'])
            .pipe(gulp.dest('build/renderer/data')),
        gulp.src(['app/renderer/img/**/*.*'])
            .pipe(gulp.dest('build/renderer/img')),
        gulp.src(['app/renderer/scripts/**/*.html'])
            .pipe(gulp.dest('build/renderer/scripts'))
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
    runSequence('clean', 'pack', 'bundle', 'dist');
});

gulp.task('build:map', function() {
    runSequence('clean', 'pack', 'bundle:map', 'dist');
})
