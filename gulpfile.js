let gulp = require('gulp');
let sass = require('gulp-sass'); //Подключаем Sass пакет
let browserSync = require('browser-sync'); // Подключаем Browser Sync
let autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов
let cssbeautify = require('gulp-cssbeautify'); // Делает красивый css
let gcmq = require('gulp-group-css-media-queries');// Постпроцессор CSS: групповые медиа-запросы.
let merge = require('merge-stream');
let plumber = require('gulp-plumber');
let del = require('del');
let cache = require('gulp-cache');

let COMPILE = {
	SRC: 'app/assets/template',
	DEST: 'app/'
};
gulp.task('sass', () => { // Создаем таск "sass"
  return gulp.src(['app/assets/sass/*.sass'],['!app/assets/sass/**/*.sass']) // Берем источник
  .pipe(plumber())
	.pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
	.pipe(autoprefixer({
		browsers: ['last 15 versions', '> 1%', 'ie 8', 'ie 7'],
		cascade: true,
		grid: true
	}))
	.pipe(cssbeautify())//Чистый css
	.pipe(gcmq())//Групировка медиа запросов
	.pipe(gulp.dest('app/assets/tpl/css')) // Выгружаем результата в папку app/css
	.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});
gulp.task('browserSync', () => {
  browserSync({ 
	  server: {
		  baseDir: 'app'
		},
	  notify: false // Отключаем уведомления
	});
});

gulp.task('watch', ['browserSync','sass'], () => {
  gulp.watch('app/assets/sass/**/*.sass', ['sass']); // Наблюдение за sass файлами в папке sass
  gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
  gulp.watch('app/assets/tpl/js/**/*.js', browserSync.reload);
});

gulp.task('remove', () => {
	return del.sync('template');
});


gulp.task('default', ['watch']);