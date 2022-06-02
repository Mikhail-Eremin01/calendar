const {src, dest, series, watch} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const csso = require('gulp-csso');
const include = require('gulp-file-include');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const htmlmin = require('gulp-htmlmin');
const del = require('del');
const sync = require('browser-sync').create();

function html() {
    return src('index.html')
    .pipe(htmlmin({
        collapseWhitespace: true
    }))
    .pipe(dest('dist'))
}

function scss() {
    return src('scss/style.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            overrideBrowserslist:  ['last 2 versions'],
            cascade: true
        }))
        .pipe(csso())
        .pipe(concat('index.css'))
        .pipe(dest('dist'))
}

function clear() {
    return del('dist')
}

function serve() {
    sync.init({
        server: ''
    })
    watch('scss/', series(scss)).on('change', sync.reload);
}

exports.build = series(clear, scss, html)
exports.serve = series(clear, scss, html, serve)
exports.clear = clear;