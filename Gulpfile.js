var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var autoprefixer = require('gulp-autoprefixer');
var exec = require('child_process').exec;
var sys = require('sys');

var sassDir = 'app/assets/sass';
var targetCSSDir = 'public/assets/css';

gulp.task('css', function(){
	gulp.src(sassDir + '/main.scss')
		.pipe(sass({ style : 'compressed'}).on('error', gutil.log))
		.pipe(autoprefixer('last 10 versions'))
		.pipe(gulp.dest(targetCSSDir))
		.pipe(notify('CSS compiled, prefixed and minified'));
});

gulp.task('phpunit', function() {
	exec('phpunit', function(error, stdout){
		sys.puts(stdout);
	});
});

gulp.task('watch', function() {
	gulp.watch(sassDir + '/**/*.scss', ['css']);
	gulp.watch('app/**/*.php', ['phpunit']);
});

gulp.task('default', ['css', 'phpunit', 'watch']);