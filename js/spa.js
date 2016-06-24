/*  spa.js
 *  Root namespace module
 */

// initialize the app and configure JSlint settings
// indicates expected global variables

/*jslint
    browser: true,
    continue: true,
    devel: true,
    indent: 2,
    maxerr: 50,
    newcap: true,
    nomen: true,
    plusplus: true,
    regexp: true,
    sloppy: true,
    vars: false,
    white: true
*/

/*global $, spa */

/*  uses module pattern to namespace SPA
    this module exports an initModule method to immediately start the app
*/


var spa = (function() {
  "use strict";
  var initModule = function($container) {
    spa.shell.initModule($container);
  };

  return {
    initModule: initModule
  };
}());