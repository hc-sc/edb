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
    del('release', 'build');
});

//gulp.task('tdd');

// just bundles
gulp.task('bundle', shell.task(
    'cd app && jspm bundle app.js renderer/bundle.js --skip-source-maps'
));

// bundles and produces source-maps
gulp.task('bundle:map', shell.task(
    'cd app && jspm bundle app.js renderer/bundle.js'
));

// transfers resources to the build dir for packaging
gulp.task('pack', function() {
    gulp.src(['app/**/*.*', '!app/**/*.spec.js'])
        .pipe(gulp.dest('build'));
});

gulp.task('build', shell.task(
    'electron-packager build --platform=win32 --arch=x64 --version=1.2.3 --icon=resources/worldwide_128px_1201435_easyicon.net.ico --out=release'
)

// should lint first
gulp.task('dist', function() {
    runSequence('clean', 'bundle', 'pack', 'dist');
});
