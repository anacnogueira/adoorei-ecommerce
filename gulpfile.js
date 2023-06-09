const gulp = require("gulp");

const { series, parallel, dest } = require("gulp");

const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const cssnano = require("gulp-cssnano");
const rename = require("gulp-rename");
const plumber = require("gulp-plumber");
const notifier = require('gulp-notifier');
const browserSync = require('browser-sync').create();
const htmlmin = require("gulp-htmlmin");
const kit = require("gulp-kit");

filesPath = {
	html: "./*.kit",
	sass: "./styles/sass/*.scss",
	js: "./js/**/*.js",
}

function kitTask(done) {
	gulp.src(filesPath.html)
		.pipe(kit())
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(dest("./dist"))
	done();
}

function sassTask(done) {
	gulp
		.src(filesPath.sass)
		.pipe(plumber({ errorHandler: notifier.error }))
		.pipe(sourcemaps.init())
		.pipe(autoprefixer())
		.pipe(sass())
		.pipe(cssnano())
	 	.pipe(sourcemaps.write("."))	 	
	 	.pipe(rename(function(path){
	 		if(!path.extname.endsWith(".map")) {
	 			path.basename += ".min";
	 		}	 		
	 	}))
		 .pipe(dest("./dist/styles"))

	done();
}

function jsTask(done) {
	gulp.src(filesPath.js)
		.pipe(plumber({ errorHandler: notifier.error }))
		// .pipe(babel({
		// 	presets: ["@babel/env"]
		// }))
		// .pipe(concat("project.js"))
		// .pipe(uglify())
		// .pipe(rename({
		// 	suffix: ".min"
		// }))
		.pipe(dest("./dist/js"))
	done();
}

function watch() {
	browserSync.init({
		server: {
			baseDir: "./dist"
		}
	});

	gulp.watch(filesPath.html, kitTask).on("change", browserSync.reload);
	gulp.watch("./styles/sass/**/*.scss", sassTask).on("change", browserSync.reload);
	gulp.watch(filesPath.js, jsTask).on("change", browserSync.reload);
}

exports.kitTask = kitTask;
exports.sassTask = sassTask;
exports.watch = watch;
exports.jsTask = jsTask;

//Gulp Serve
exports.build = parallel(sassTask, jsTask, kitTask);

//Gulp Default command
exports.default = series(exports.build, watch);