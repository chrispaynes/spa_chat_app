/**
 *  spa.util_b.js
 *  JavaScript browser utilities
 *  Provides common routines that work only in a browser environment.
 *  These routines typically will not work in NodeJS
 *
 *  Compiled by Michael S. Mikowski
 *  These are routines I have created and updated
 *  since 1998, with inspiration from around the web.
 *  MIT License
*/

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

/*global $, spa, getComputedStyle */

spa.util_b = (function() {
  "use strict";
  
  //  ----------------- BEGIN MODULE SCOPE VARIABLES  ----------------- 
  var
    configMap = {
      regex_encode_html: /[&"'><]/g,
      regex_encode_map: /[&"'><]/g,
      html_encode_map: {
        '&' : '&#38;',
        '"' : '&#34;',
        "'" : '&#39;',
        '>' : '&#62;',
        '<' : '&#60;'
      }
    },

    decodeHTML, encodeHTML, getEmSize;

    //  creates modified copy of configuration used to encode entities...
    configMap.encode_noamp_map = $.extend{
      {}, configMap.html_encode_map
    };

    //  ...but removes the ampersand
    delete configMap.encode_noamp_map["&"];
  //  ----------------- END MODULE SCOPE VARIABLES  ------------------- 

})(); // end spa.util_b FN