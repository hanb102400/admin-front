const { series, parallel, watch } = require('gulp');
const { src, dest } = require('gulp');
const webserver = require('gulp-webserver');

function copyHtml() {
    src('src/**/*.vue')
    .pipe(dest('dist/'));
    return src('src/**/*.html')
    .pipe(dest('dist/'));
}

function copyCss() {
    return src('src/**/*.css')
    .pipe(dest('dist/'));
}

function copyJs() {
    return src('src/**/*.js')
    .pipe(dest('dist/'));
}
function copyRes() {
   src('src/**/*.ttf')
  .pipe(dest('dist/'));

  src('src/**/*.woff')
  .pipe(dest('dist/'));

}

// `clean` 函数并未被导出（export），因此被认为是私有任务（private task）。
// 它仍然可以被用在 `series()` 组合中。
function clean(cb) {
  // body omitted
  cb();
}

// `build` 函数被导出（export）了，因此它是一个公开任务（public task），并且可以被 `gulp` 命令直接调用。
// 它也仍然可以被用在 `series()` 组合中。
function build(cb) {
  // body omitted
  copyHtml();
  copyCss();
  copyJs();
  copyRes();
  cb();
}

function server(cb) {
    // body omitted
    src('dist').pipe(webserver({    //该任务调用的模块
        path:'/',
        host:'127.0.0.1',
        port:'1357',
        livereload: true, //自动刷新
        direactoryListing:true, //指定目录找到
        open:true   //自动打开
    }));
    cb();
  }

exports.build = build;
exports.default = series(clean, build,server);