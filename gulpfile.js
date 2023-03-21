const gulp = require("gulp");

const { series, parallel, dest } = require("gulp");

const kit = require("gulp-kit");

filesPath = {
	html: "./*.kit",
}

function kitTask(done) {
	gulp.src(filesPath.html)
		.pipe(kit())
		// .pipe(htmlmin({
		// 	collapseWhitespace: true
		// }))
		.pipe(dest("./dist"))
	done();
}


exports.kitTask = kitTask;