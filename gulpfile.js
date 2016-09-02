/*
|--------------------------------------------------------------------
| SET DEPENDENCIES
|--------------------------------------------------------------------
*/

// Required for all tasks
var gulp = require('gulp');
// Required for SASS tags
var sass = require('gulp-sass');
// Adds support for SASS globbing
var sassGlob = require('gulp-sass-glob');
// Used to rename CSS and JS depending if minified
var rename = require("gulp-rename");
// Used to add conditional functionality
var gulpif = require('gulp-if');
// Used to delete folders during build process
var del = require('del');
// Used to create synchronous build tasks
var runSequence = require('run-sequence');

/*
|--------------------------------------------------------------------
| CONFIG
|--------------------------------------------------------------------
*/

// If minify is true then css & js will be minified
// This is in case the code needs to be maintained by a less-technical developer
var minify = false;

/*
|--------------------------------------------------------------------
|  DELETE DIST FOLDER
|--------------------------------------------------------------------
*/

gulp.task('deleteDist', function(){
	return del('dist/');
});

/*
|--------------------------------------------------------------------
|  COPY STATIC ASSETS
|--------------------------------------------------------------------
*/

// Copy HTML files
gulp.task('copyHTML', function() {
	// Copy all non-directory files
	gulp.src('dev/html/*.+(html)')
	.pipe(gulp.dest('dist/'));
});

// Copy JS files
gulp.task('copyJS', function() {
	// Copy all non-directory files
	gulp.src('dev/js/*.+(js)')
	.pipe(gulp.dest('dist/js/'));
});

// Copy IMG files
gulp.task('copyIMG', function() {
	// Copy all non-directory files
	gulp.src('dev/img/*.+(png|jpg|gif|svg)')
	.pipe(gulp.dest('dist/img/'));
});

// Copy Template Config
gulp.task('copyConfig', function() {
	// Copy all non-directory files
	gulp.src('dev/template_config.js')
	.pipe(gulp.dest('dist/'));
});

/*
|--------------------------------------------------------------------
|  SASS
|--------------------------------------------------------------------
*/

gulp.task('sass', function () {
	return gulp.src('dev/sass/*.scss')
	.pipe(sassGlob())
	.pipe(gulpif(minify, sass({outputStyle: 'compressed', precision: 8}), sass({outputStyle: 'expanded', precision: 8})))
	.pipe(gulpif(minify, rename({ suffix: '.min' })))
	.on('error', sass.logError)
	.pipe(gulp.dest('./dist/css/'));
});

/*
|--------------------------------------------------------------------
|  PRODUCTION FUNCTIONS
|--------------------------------------------------------------------
*/

// Here we pull everything together into generic watch and build functions

// WATCH FUNCTION
gulp.task("watch", function() {
	// HTML
	gulp.watch('dev/html/**/*.html',['html']);
	// Images
	gulp.watch('dev/img/*.+(png|jpg|gif|svg)',['images']);
	// Watch for Breakpoint JS changes and compile SASS
	gulp.watch('dev/data/breakpoints.json',['sass']);
	// SASS
	gulp.watch('dev/sass/**/*.scss',['sass']);
	// JS
	gulp.watch('dev/js/**/*.js',['js']);
});

// BUILD FUNCTION
gulp.task('build',function() {
	runSequence(
		// Delete Dist Folder
		"deleteDist",	
		// Run other tasks asynchronously 
		["copyHTML", "copyJS", "copyIMG", "sass", "copyConfig"]
	);
});

