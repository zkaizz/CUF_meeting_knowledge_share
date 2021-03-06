var gulp = require('gulp');
var browserSync = require('browser-sync');

var babel = require('gulp-babel');
var clean = require('gulp-clean');

/*
gulp.task("hello", function(){
  console.log("Hello World");
});

gulp.task("default", ["hello"]);

gulp.task("copyIndex", function(){
  gulp.src("src/index.html")
     .pipe(gulp.dest("./build"));

  var theFileorFiles = gulp.src("src/index.html");
  var filesYouCopied = gulp.dest(theFileorFiles, gulp.dest("./build"));
});
*/

gulp.task("copyIndex", function(){
  gulp.src("src/index.html")
   .pipe(gulp.dest("./build"))
   .pipe(browserSync.reload({stream: true}));

  //var theFileorFiles = gulp.src("src/index.html");
  //var filesYouCopied = gulp.dest(theFileorFiles, gulp.dest("./build"));
  //var theFilesYouReloaded = browserSync.reload(filesYouCopied);
});

gulp.task('browserSync', function(){
    browserSync({
       server: {
          baseDir: './build'
       } 
    });
});

gulp.task("watchFiles", function(){
   gulp.watch('src/index.html', ['copyIndex']);
   gulp.watch('src/**/*.js', ['babelIt']);
});

gulp.task("babelIt", function(){
   return gulp.src("src/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("./build"))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task("clean", function(){
    gulp.src("./build",{read: false})
     .pipe(clean());
});

gulp.task("default", ["copyIndex", "babelIt" ,"browserSync", "watchFiles"]);
