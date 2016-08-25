/*
  前面的步骤都是定义一些路径的变量

*/

//dist是生成版本的目标文件夹,就是最终要部署到线上的文件夹
var dist = "dist/";
//src目录是我们的源代码
var src = "simplebootx/";
var static = "Public/";
var paths = {
  tpl: "*.html",
  css: "css/*.css",
  images: "images/**.*",
  js: "js/*.js",
  // lib: {
  //   boostrap: "simpleboot/**/*.*"
  // }
};

/*
  引入要使用的插件
*/
var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var del = require('del');
var vinylPaths = require('vinyl-paths');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var del = require('del');
var s = src,
  d = dist;
//不用编译的文件复制到生成环境中
gulp.task("copy", function(cb) {
  gulp.src(src + "*.html").pipe(gulp.dest(dist));
  gulp.src(s + paths.images).pipe(gulp.dest(d + "images"));
  //gulp.src(s + paths.lib.boostrap).pipe(gulp.dest(d + "simpleboot/"));
});

//压缩css
gulp.task("compressCss", function() {
  return gulp.src(s + paths.css)
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest(d + "css"));
});
//压缩js
gulp.task('compressJs', function() {
  return gulp.src(s + paths.js)
    .pipe(uglify())
    .pipe(gulp.dest(d + "js"));

});
//压缩html
gulp.task('compressHtml', function() {
  var options = {
    removeComments: true, //清除HTML注释
    removeScriptTypeAttributes: true, //删除`<script>`的type="text/javascript"
    removeStyleLinkTypeAttributes: true, //删除`<style`>和`<link>`的type="text/css"
    minifyCSS: true //压缩页面CSS
  };
  return gulp.src(src + '/jump.html')
    .pipe(htmlmin(options))
    .pipe(gulp.dest(dist));

});
//md5
gulp.task('concat', function() { //- 创建一个名为 concat 的 task
  return gulp.src(s + paths.css) //- 需要处理的css文件，放到一个字符串数组里
    .pipe(rev()) //- 文件名加MD5后缀
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest(d + 'css/')) //- 输出文件本地
    .pipe(rev.manifest()) //- 生成一个rev-manifest.json
    .pipe(gulp.dest('./rev')); //- 将 rev-manifest.json 保存到 rev 目录内

});
gulp.task('rev', ['concat'], function() {
  return gulp.src(['./rev/*.json', src + '**/*.html']) //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
    .pipe(revCollector()) //- 执行文件内css名的替换
    .pipe(gulp.dest(dist)); //- 替换后的文件输出的目录

});
//我们最后要运行的命令就是`gulp default`;
gulp.task('default', ['copy', 'compressJs', 'compressHtml', 'rev']);
