/* eslint-env node */

/*
  This gulpfile optimizes all svg files using svgmin and produces
  an .scss file which contains a variable for each icon
*/

var gulp = require('gulp')
  ,svgmin = require('gulp-svgmin')
  ,concat = require('gulp-concat')
  ,inject = require('gulp-inject-string')
  ,flatmap = require('gulp-flatmap')
;




gulp.task('default', function () {
  var intro_string = '// svg icons variables\n' +
      '// NB: this a generated file, any changes will be overwritten\n\n';

  return gulp.src(['./svg/*.svg'])

    .pipe(flatmap(function(stream , file){
      var icon_name = file.path.replace(/^\/(.+\/)*(.+)\.(.+)$/, '$2');

      return stream
        .pipe(svgmin(function () {
          return {
            // https://github.com/svg/svgo/tree/master/plugins
            plugins: [
              { cleanupIDs: { remove: true, minify: true } }
              , { removeDoctype: true }
              , { removeComments: true }
              , { removeTitle: true }
              , { removeDimensions: true }
              , { cleanupNumericValues: { floatPrecision: 3  } }
              , { convertColors: { names2hex: true, rgb2hex: true } }
              , { removeStyleElement: true }
              , { removeUselessDefs: true }
              , { removeEmptyContainers: true }
              , { removeAttrs: { attrs: ['(fill|stroke|class|style|data.*)', 'svg:(width|height)'] } }
              //, { addAttributesToSVGElement: {attribute: "#{$attr}"}}
            ]
            //,js2svg: { pretty: true }
          };
        })) // end svgmin
        .pipe(inject.wrap('$sharing-links-' + icon_name + ': \'', '\';'));

    })) // end flatmap
    .pipe(concat( '_icons.scss' ))
    .pipe(inject.prepend( intro_string ))
    .pipe(gulp.dest('./'));
});

