import gulp from 'gulp';
import * as sass from 'sass';
import gulpSass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import cleanCSS from 'gulp-clean-css';
import rename from 'gulp-rename';
import zip from 'gulp-zip';

// Використання dart-sass для компіляції SASS
const sassCompiler = gulpSass(sass);

// Шляхи до вихідних файлів
const paths = {
    styles: {
        src: 'scss/**/*.scss',
        dest: 'dist/css'
    },
    images: {
        src: 'images/*',
        dest: 'dist/images'
    }
};

// Завдання для збірки стилів у режимі debug
function stylesDebug() {
    return gulp.src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sassCompiler().on('error', sassCompiler.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.styles.dest));
}

// Завдання для збірки стилів у режимі production
function stylesProd() {
    return gulp.src(paths.styles.src)
        .pipe(sassCompiler().on('error', sassCompiler.logError))
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.styles.dest));
}

// Завдання для оптимізації зображень
async function images() {
    const imagemin = (await import('gulp-imagemin')).default;
    return gulp.src(paths.images.src)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.images.dest));
}

// Завдання для створення архіву
function archiveDebug() {
    return gulp.src(['dist/**', '!dist/**/*.min.css'])
        .pipe(zip('debug.zip'))
        .pipe(gulp.dest('archives'));
}

function archiveProd() {
    return gulp.src('dist/**')
        .pipe(zip('production.zip'))
        .pipe(gulp.dest('archives'));
}

// Спостерігач за змінами у файлах
function watchFiles() {
    gulp.watch(paths.styles.src, stylesDebug);
    gulp.watch(paths.images.src, images);
}

// Експорт завдань
export { stylesDebug, stylesProd, images, archiveDebug, archiveProd, watchFiles as watch };
