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
      'public/lib/bootstrap/bootstrap-transition.js'
    , 'public/lib/bootstrap/bootstrap-alert.js'
    , 'public/lib/bootstrap/bootstrap-modal.js'
    , 'public/lib/bootstrap/bootstrap-dropdown.js'
    , 'public/lib/bootstrap/bootstrap-scrollspy.js'
    , 'public/lib/bootstrap/bootstrap-tab.js'
    , 'public/lib/bootstrap/bootstrap-tooltip.js'
    , 'public/lib/bootstrap/bootstrap-popover.js'
    , 'public/lib/bootstrap/bootstrap-button.js'
    , 'public/lib/bootstrap/bootstrap-collapse.js'
    , 'public/lib/bootstrap/bootstrap-carousel.js'
    , 'public/lib/bootstrap/bootstrap-typeahead.js'
    , 'public/lib/bootstrap/bootstrap-affix.js'
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