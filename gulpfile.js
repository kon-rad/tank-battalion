'use strict';

var gulp            = require('gulp'),
    babel           = require('gulp-babel');
 
gulp.task('babel', () =>
    gulp.src('src/js/main.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('public/js/'))
);

gulp.task('default', function () {
  gulp.watch('./src/js/**/*.js', ['babel']);
});
