'use strict';
 
var gulp            = require('gulp'),
    babel           = require('gulp-babel'),
    sass            = require('gulp-sass'),
    cssnano         = require('gulp-cssnano'),
    sourcemaps      = require('gulp-sourcemaps'),
    autoprefixer    = require('gulp-autoprefixer');
 
gulp.task('babel', () =>
    gulp.src('src/js/**/*.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('public/js/'))
);

gulp.task('workflow', function () {
  gulp.src('./src/stylesheets/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false,
    }))
    .pipe(cssnano())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/stylesheets/'));
});

gulp.task('copyfonts', () =>
gulp.src('./src/assets/fonts/*.{ttf,woff,eof,svg}')
    .pipe(gulp.dest('./public/assets/fonts')))

gulp.task('default', function () {
  gulp.watch('src/stylesheets/**/*.scss', ['workflow']);
  gulp.watch('./src/js/**/*.js', ['babel']);
});
