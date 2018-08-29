var gulp = require('gulp');
 
gulp.task('hello', function(){
	console.log('Hello Gulp.js');
});

gulp.task('uglify:js', function(){
	return gulp.src('src/js/*.js')
		.pipe(concat('app.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});