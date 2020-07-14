'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const autoprefixer = require('gulp-autoprefixer');

const plumber = require("gulp-plumber");

gulp.task('babel', () =>
    gulp
        .src('src/js/**/*.js')
        .pipe(
            babel({
                presets: ['@babel/env']
            })
        )
        .pipe(gulp.dest('public/js/'))
);

gulp.task('workflow', () => {
    return gulp.src('./src/stylesheets/**/*.css')
        .pipe(plumber())
        .pipe(gulp.dest('./public/stylesheets/'));
});

gulp.task('copyfonts', () =>
    gulp
        .src('./src/stylesheets/util/*.{ttf,woff,eof,svg}')
        .pipe(gulp.dest('./public/stylesheets/util'))
);

gulp.task('moveFavicon', () =>
    gulp.src('src/favicon/**.*').pipe(gulp.dest('public/favicon/'))
);

gulp.task('imagemin', () => {
    return gulp.src('./src/assets/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./public/assets/images'));
});

gulp.task('moveJSVendor', () => {
    return gulp.src('src/js-vendor/*').pipe(gulp.dest('public/'));
});

gulp.task('moveAudio', () => {
    return gulp.src('src/assets/audio/*').pipe(gulp.dest('public/assets/audio'));
});

gulp.task(
    'default',
    gulp.series(
        'workflow',
        'babel',
        'copyfonts',
        'moveFavicon',
        'imagemin',
        'moveJSVendor',
        'moveAudio',
        (done) => {
            gulp.watch('src/stylesheets/**/*.scss', gulp.series('workflow'));
            gulp.watch('./src/js/**/*.js', gulp.series('babel'));
            done();
        }
    )
);

gulp.task('dev', gulp.series('workflow', 'babel', (done) => {
            gulp.watch('src/stylesheets/**/*.scss', gulp.series('workflow'));
            gulp.watch('./src/js/**/*.js', gulp.series('babel'));
            done();
        }
    )
);

gulp.task(
    'build',
    gulp.series(
        'workflow',
        'babel',
        'copyfonts',
        'moveFavicon',
        'imagemin',
        'moveJSVendor',
        'moveAudio',
        () => {
            console.log('Application ready! God speed!');
        }
    )
);
