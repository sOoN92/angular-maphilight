var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    ngAnnotate = require('gulp-ng-annotate'),
    angularFilesort = require('gulp-angular-filesort');



// > gulp build

gulp.task('build', function () {
    gulp.src([
        './lib/angular.maphilight.js'
    ])
        .pipe(ngAnnotate())
        .pipe(angularFilesort())
        .pipe(uglify())
        .pipe(concat('angular.maphilight.min.js'))
        .pipe(gulp.dest('./lib'));
});
