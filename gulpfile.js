var gulp = require("gulp"),
  nodemon = require("gulp-nodemon"),
  gulpMocha = require("gulp-mocha"),
  env = require("gulp-env");

gulp.task("default", function() {
  nodemon({
    script: "app.js",
    ext: "js",
    ignore: ["./node_modules/**"]
  }).on("restart", function() {
    console.log("Restarting...");
  });
});

gulp.task("test", function() {
  env({ vars: { NODE_ENV: "test" } });
  gulp
    .src("tests/**/*.js", { read: false })
    .pipe(gulpMocha({ reporter: "list", exit: true }))
    .on("error", console.error);
});
