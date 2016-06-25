/*  
 *  spa.chat.js
 *  Chat feature module for SPA
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

/*global $, spa */

spa.chat = (function() {

  //  ----------------- BEGIN MODULE SCOPE VARIABLES  ----------------- 
  var
    configMap = {
      // stores HTML template for chat slider
      main_html: String()
        + '<div style="padding: 1em; color: #fff;">'
        +   'Hello Chat'
        + '</div>',
      settable_map: {}     
    },
    stateMap = {
      $container: null,
    },

    // caches jQuery collections in map
    jqueryMap = {},

    // method declarations
    setJqueryMap, configModule, initModule;
  //  ----------------- END MODULE SCOPE VARIABLES  -----------------


  //  ----------------- BEGIN UTILITY METHODS -----------------------
  // these methods don't interact with page elements

  //  ----------------- END UTILITY METHODS -------------------------


  //  ----------------- BEGIN DOM METHODS ---------------------------
  
  // Begin DOM method /setJqueryMap/
  setJqueryMap = function() {
    var $container = stateMap.$container;

    jqueryMap = {
      $container: $container
    };
  };
  // End DOM method /setJqueryMap/

  //  ----------------- END DOM METHODS -----------------------------


  //  ----------------- BEGIN EVENT HANDLERS ------------------------
  //  ----------------- ENDS EVENT HANDLERS -------------------------


  //  ----------------- BEGIN PUBLIC METHODS ------------------------
  
  //  Begin public method /configModule/
  //  Purpose: Adjust configutation of allowed keys
  //  Arguments: A map of settable keys and values
  //    * color_name - color to use
  //  Settings:
  //    * configMap.settable_map - declares allowed keys
  //  Returns: true
  //  Throws: none

  configModule = function(input_map) {
    spa.util.setConfigMap({
      input_map: input_map,
      settable_map: configMap.settable_map,
      config_map: configMap
    });
    return true;
  };
  //  End public method /configModule/

  //  Begin public method /initModule/
  //  Purpose: Initializes module
  //  Arguments:
  //    * $container - the jquery element used by this feature
  //  Returns: true
  //  Throws: none

  initModule = function($container) {
    // fills the chat slider container with HTML template
    $container.html(configMap.main_html);
    stateMap.$container = $container;
    setJqueryMap();
    return true;
  };
  //  End public method /initModule/
  
  //  Return public module methods
  return {
    configModule: configModule,
    initModule: initModule
  };
  //  ----------------- ENDS PUBLIC METHODS -------------------------
}());
