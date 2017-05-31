//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'),
    less = require('gulp-less'),
     //确保本地已安装gulp-sourcemaps [cnpm install gulp-sourcemaps --save-dev]
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require("browser-sync").create();
 
/*gulp.task('testLess', function () {
    gulp.src('less/*.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('css/ll'));
});*/
/*gulp.task('less', function() {
    gulp.src('less/*.less')
        .pipe(less())
        .pipe(gulp.dest('css/re'))
        .pipe(livereload());
});*/
/*gulp.task('testWatch', function () {
    gulp.watch('less/*.less', ['sass']); //当所有less文件发生改变时，调用testLess任务
});*/
// 静态服务器 + 监听 scss/html 文件
gulp.task('serve', function() {

    browserSync.init({
        proxy: "http://127.0.0.1/qisousou/Home/user/manage_safe.html",
        injectChanges: true,
        browser: "C:/Users/Administrator/AppData/Local/Google/Chrome/Application/chrome"
    });

    //gulp.watch("css/less/*.less", ['less']);
    // gulp.watch("app/*.html").on('change', reload);
    //gulp.watch("css/*.css", ['css']);
    gulp.watch("js/*.js", ['js']);
    gulp.watch("css/less/*.less", ['less']);
    gulp.watch("../../user/home/view/default/*/*.html", ['html']);
});

gulp.task('less', function () {
    gulp.src("css/less/graph.less")
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write('.', {debug: true}))
        .pipe(gulp.dest('css/css'))// Write the CSS & Source maps
        //.pipe(filter('**/*.css')) // Filtering stream to only css files
        .pipe(browserSync.reload({stream:true}));
});
gulp.task('css', function () {
    browserSync.reload();
});
gulp.task('js', function () {
    browserSync.reload();
});
gulp.task('html', function () {
    browserSync.reload();
});
/*gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});*/
//gulp.task('default',['testLess', 'elseTask']); //定义默认任务 elseTask为其他任务，该示例没有定义elseTask任务
 
//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
//gulp.dest(path[, options]) 处理完后文件生成路径