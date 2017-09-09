// Load our plugins
var gulp = require( 'gulp' ),
	sass = require( 'gulp-sass' ),  // Our sass compiler
	notify = require( 'gulp-notify' ), // Basic gulp notification using OS
	sourcemaps = require( 'gulp-sourcemaps' ), // Sass sourcemaps
	autoprefixer = require( 'gulp-autoprefixer' ), // Adds vendor prefixes for us
	svgSprite = require( 'gulp-svg-sprite' ),
	svgmin = require( 'gulp-svgmin' ),
	size = require( 'gulp-size' ),
	browserSync = require( 'browser-sync' ), // Sends php, js, and css updates to browser for us
	concat = require( 'gulp-concat' ), // Concat our js
	uglify = require( 'gulp-uglify' ),
	babel = require( 'gulp-babel' ),
	del = require( 'del' ),
	rename = require( 'gulp-rename' );


////////////////////////////////////////////////////////////////////////////////
// Path Configs
////////////////////////////////////////////////////////////////////////////////

var paths = {
	sassPath: 'assets/sass/',
	nodePath: 'node_modules/',
	jsPath: 'assets/js/concat',
	destPath: '_dist/',
	foundationJSpath: 'node_modules/foundation-sites/js/',
	imgPath: 'assets/img/'
};

var bsProxy = 'withdesign.dev';


////////////////////////////////////////////////////////////////////////////////
// SVG Sprite Task
////////////////////////////////////////////////////////////////////////////////

// Delete compiled SVGs before creating a new one
gulp.task('clean:svgs', function () {
  return del([
		paths.destPath + 'svg/**/*',
		paths.destPath + 'sprite/sprite.svg',
	]);
});

var svgConfig = {
	mode: {
		symbol: { // symbol mode to build the SVG
			dest: 'sprite', // destination folder
			sprite: 'sprite.svg', //sprite name
			example: false // Build sample page
		}
	},
	svg: {
		xmlDeclaration: false, // strip out the XML attribute
		doctypeDeclaration: false, // don't include the !DOCTYPE declaration
		rootAttributes: { // add some attributes to the <svg> tag
			width: 0,
			height: 0,
			style: 'position: absolute;'
		}
	}
};

gulp.task('svg-min', ['clean:svgs'], function() {
	return gulp.src(paths.imgPath + 'svg/**/*.svg')
		.pipe(svgmin())
		.pipe(gulp.dest(paths.destPath + 'svg'))
		.pipe(notify({
			message: "✔︎ SVG Minify task complete",
			onLast: true
		}));
});

gulp.task('svg-sprite', ['svg-min'], function() {
  return gulp.src([
		paths.imgPath + 'svg/*.svg'
	])
    .pipe(svgSprite(svgConfig))
    .pipe(gulp.dest(paths.destPath))
		.pipe(browserSync.reload({stream:true}))
		.pipe(notify({
			message: "✔︎ SVG Sprite task complete",
			onLast: true
		}));
});


////////////////////////////////////////////////////////////////////////////////
// Our browser-sync task
////////////////////////////////////////////////////////////////////////////////

gulp.task('browser-sync', function() {
	var files = [
		'**/*.php'
	];

	browserSync.init(files, {
		proxy: bsProxy
	});
});


////////////////////////////////////////////////////////////////////////////////
// CSS
////////////////////////////////////////////////////////////////////////////////

gulp.task('css', function() {
	gulp.src(paths.sassPath + 'app.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'})
			.on('error', notify.onError(function(error) {
				return "Error: " + error.message;
			}))
		)
		.pipe(autoprefixer({ browsers: ['last 2 versions'] }))
		.pipe(sourcemaps.write('.'))
		.pipe(size({showFiles: true}))
		.pipe(gulp.dest(paths.destPath + 'css'))
		.pipe(browserSync.stream({match: '**/*.css'}))
		.pipe(notify({
			message: "✔︎ CSS task complete",
			onLast: true
		}));
});


////////////////////////////////////////////////////////////////////////////////
// Login CSS
////////////////////////////////////////////////////////////////////////////////

gulp.task('login-css', function() {
	gulp.src(paths.sassPath + 'login.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'})
			.on('error', notify.onError(function(error) {
				return "Error: " + error.message;
			}))
		)
		.pipe(autoprefixer({ browsers: ['last 2 versions'] }))
		.pipe(rename('login.min.css'))
		.pipe(sourcemaps.write('.'))
		.pipe(size({showFiles: true}))
		.pipe(gulp.dest(paths.destPath + 'css'))
		.pipe(browserSync.stream({match: '**/*.css'}))
		.pipe(notify({
			message: "✔︎ Login CSS task complete",
			onLast: true
		}));
});


////////////////////////////////////////////////////////////////////////////////
// JS
////////////////////////////////////////////////////////////////////////////////

gulp.task('js', function() {
	return gulp.src([

		/* Choose what JS Plugin you'd like to use. Note that some plugins also
		require specific utility libraries that ship with Foundation—refer to a
		plugin's documentation to find out which plugins require what, and see
		the Foundation's JavaScript page for more information.
		http://foundation.zurb.com/sites/docs/javascript.html */

		// // Core Foundation - needed when choosing plugins ala carte
		// paths.foundationJSpath + 'foundation.core.js',
		// paths.foundationJSpath + 'foundation.util.mediaQuery.js',
		//
		// // Choose the individual plugins you want in your project
		// paths.foundationJSpath + 'foundation.abide.js',
		// paths.foundationJSpath + 'foundation.accordion.js',
		// paths.foundationJSpath + 'foundation.accordionMenu.js',
		// paths.foundationJSpath + 'foundation.drilldown.js',
		// paths.foundationJSpath + 'foundation.dropdown.js',
		// paths.foundationJSpath + 'foundation.dropdownMenu.js',
		// paths.foundationJSpath + 'foundation.equalizer.js',
		// paths.foundationJSpath + 'foundation.interchange.js',
		// paths.foundationJSpath + 'foundation.magellan.js',
		// paths.foundationJSpath + 'foundation.offcanvas.js',
		// paths.foundationJSpath + 'foundation.orbit.js',
		// paths.foundationJSpath + 'foundation.responsiveMenu.js',
		// paths.foundationJSpath + 'foundation.responsiveToggle.js',
		// paths.foundationJSpath + 'foundation.reveal.js',
		// paths.foundationJSpath + 'foundation.slider.js',
		// paths.foundationJSpath + 'foundation.sticky.js',
		// paths.foundationJSpath + 'foundation.tabs.js',
		// paths.foundationJSpath + 'foundation.toggler.js',
		// paths.foundationJSpath + 'foundation.tooltip.js',
		// paths.foundationJSpath + 'foundation.util.box.js',
		// paths.foundationJSpath + 'foundation.util.keyboard.js',
		// paths.foundationJSpath + 'foundation.util.motion.js',
		// paths.foundationJSpath + 'foundation.util.nest.js',
		// paths.foundationJSpath + 'foundation.util.timerAndImageLoader.js',
		// paths.foundationJSpath + 'foundation.util.touch.js',
		// paths.foundationJSpath + 'foundation.util.triggers.js',
		// paths.foundationJSpath + 'foundation.zf.responsiveAccordionTabs.js',

		// Babel polyfill
		paths.nodePath + 'babel-polyfill/dist/polyfill.min.js',
        // Our custom JS
        paths.jsPath + '**/*.js'
	])
	.pipe(babel({
		presets: ['es2015']
	}))
	.pipe(concat('app.js'))
	.pipe(gulp.dest(paths.destPath + 'js'))
	.pipe(uglify().on('error', notify.onError(function(error) {
			return "Error: " + error.message;
		}))
	)
	.pipe(rename('app.min.js'))
	.pipe(size({showFiles: true}))
	.pipe(browserSync.reload({stream:true}))
	.pipe(notify({ message: "✔︎ JS task complete"}));
});


// Watch our files and fire off a task when something changes
gulp.task('watch', ['build'], function() {
	gulp.watch(paths.sassPath + '**/*.scss', ['css']);
	gulp.watch(paths.jsPath + '**/*.js', ['js']);
	gulp.watch(paths.imgPath + 'svg/**/*.svg', ['svg-sprite']);
});

// Full gulp build, including server + watch
gulp.task('serve', ['browser-sync', 'watch']);

// Our default gulp task, which runs a one-time task
gulp.task('build', ['css', 'js', 'svg-sprite', 'login-css']);