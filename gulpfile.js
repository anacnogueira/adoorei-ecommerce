const gulp = require("gulp");

const { series, parallel, dest } = require("gulp");

const browserSync = require('browser-sync').create();
const htmlmin = require("gulp-htmlmin");
const kit = require("gulp-kit");

filesPath = {
	html: "./*.kit",
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

function watch() {
	browserSync.init({
		server: {
			baseDir: "./dist"
		}
	});

	gulp.watch(filesPath.html, kitTask).on("change", browserSync.reload);
}	

exports.kitTask = kitTask;
exports.watch = watch;