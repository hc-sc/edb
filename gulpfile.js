var del = require('del');
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var shell = require('gulp-shell');
var runSequence = require('run-sequence');


const INCLUDES = ['app/renderer/**/*.js'];
const EXCLUDES = [];

const GLOB = INCLUDES.concat(EXCLUDES);

gulp.task('lint', function() {
    return gulp.src(GLOB)
        .pipe(eslint({
            "quiet": true
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});


gulp.task('clean', function() {
    del('build/scripts', 'build/renderer/*.js');
});

gulp.task('clean:release', function() {
    del('release');
})

gulp.task('clean:full', function() {
    runSequence('clean', 'clean:release');
});

//gulp.task('tdd');

// just bundles
gulp.task('bundle', shell.task(
    'cd app && jspm bundle-sfx app.js ../build/renderer/bundle.js --skip-source-maps --minify --no-mangle'
));

gulp.task('bundle:clean', function() {
    runSequence('clean', 'bundle');
});

// bundles and produces source-maps
gulp.task('bundle:map', shell.task(
    'cd app && jspm bundle app.js renderer/bundle.js'
));

// transfers resources to the build dir for packaging
gulp.task('pack', function() {
    gulp.src(['app/package.json'])
        .pipe(gulp.dest('build/'))
    gulp.src(['app/renderer/data/**/*.*'])
        .pipe(gulp.dest('build/renderer/data'))
    gulp.src(['app/renderer/img/**/*.*'])
        .pipe(gulp.dest('build/renderer/img'))
    gulp.src(['app/renderer/scripts/**/*.*'])
        .pipe(gulp.dest('build/renderer/scripts'))
    gulp.src(['app/renderer/app.js'])
        .pipe(gulp.dest('build/renderer'))
});

gulp.task('dist', shell.task(
    'electron-packager build --platform=win32 --arch=x64 --version=1.2.3 --icon=resources/worldwide_128px_1201435_easyicon.net.ico --out=release'
));

// should lint first
gulp.task('build', function() {
    runSequence('clean', 'pack', 'bundle', 'dist');
});
