'use strict'                                    // for jshint
/* ==========================================================
 * utils.js   v0.0.1
 * Author:    Daniel J. Stroot
 * Date:      01.07.2013
 * ========================================================== */

/* ==========================================================
 * Include required packages / Module Dependencies
 * ========================================================== */
var fs              = require('fs')          // http://nodejs.org/docs/v0.3.1/api/fs.html
   ,UglifyJS        = require("uglify-js");  // https://npmjs.org/package/uglify-js

/* =========================================================
 * BUNDLE: Concatentate and minify all the .js libraries
 *
 * Examples:
 *   utils.bundle()
 * ========================================================== */
exports.bundle = function () {
       
  // ORDER is IMPORTANT!
  var scripts = [
      'public/js/lib/bootstrap/bootstrap-transition.js'
    , 'public/js/lib/bootstrap/bootstrap-alert.js'
//    , 'public/js/lib/bootstrap/bootstrap-modal.js'
    , 'public/js/lib/bootstrap/bootstrap-dropdown.js'
//    , 'public/js/lib/bootstrap/bootstrap-scrollspy.js'
//    , 'public/js/lib/bootstrap/bootstrap-tab.js'
//    , 'public/js/lib/bootstrap/bootstrap-tooltip.js'
//    , 'public/js/lib/bootstrap/bootstrap-popover.js'
    , 'public/js/lib/bootstrap/bootstrap-button.js'
    , 'public/js/lib/bootstrap/bootstrap-collapse.js'
//    , 'public/js/lib/bootstrap/bootstrap-carousel.js'
//    , 'public/js/lib/bootstrap/bootstrap-typeahead.js'
//    , 'public/js/lib/bootstrap/bootstrap-affix.js'
    , 'public/js/utils.js'
    , 'public/js/models/models.js'
    , 'public/js/views/paginator.js'
    , 'public/js/views/header.js'
    , 'public/js/views/home.js'
    , 'public/js/views/winelist.js'
    , 'public/js/views/winedetails.js'
    , 'public/js/views/about.js'
    , 'public/js/main.js'
    ];
  
  // 1: Concatenate and "minify" all the files
  var minified = UglifyJS.minify(scripts);

  // 2: Write out the result
  fs.writeFile(__dirname + '/public/js/bundle.js', minified.code, 'utf8', function (err) {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log('Writing bundle.js');
    }
  });

}