/*
 *  spa.shell.js
 *  Shell module for SPA
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

spa.shell = (function() {

  //  ----------------- BEGIN MODULE SCOPE VARIABLES  ----------------- 
  var
    configMap = {
      main_html: String() + '<div class="spa-shell-head">' + '<div class="spa-shell-head-logo"></div>' + '<div class="spa-shell-head-acct"></div>' + '<div class="spa-shell-head-search"></div>' + '</div>' + '<div class="spa-shell-main">' + '<div class="spa-shell-main-nav"></div>' + '<div class="spa-shell-main-content"></div>' + '</div>' + '<div class="spa-shell-foot"></div>' + '<div class="spa-shell-chat"></div>' + '<div class="spa-shell-modal"></div>',
      chat_extend_time: 1000,
      chat_retract_time: 300,
      chat_extend_height: 450,
      chat_retract_height: 15
    },
    stateMap = {
      $container: null
    },
    // caches jQuery collections in map
    jqueryMap = {},

    setJqueryMap, toggleChat, initModule;
  //  ----------------- END MODULE SCOPE VARIABLES  -----------------


  //  ----------------- BEGIN UTILITY METHODS -----------------------
  // these methods don't interact with page elements
  //  ----------------- END UTILITY METHODS -------------------------

  //  ----------------- BEGIN DOM METHODS ---------------------------
  // Begin DOM method /setJqueryMap/
  setJqueryMap = function() {
    var $container = stateMap.$container;

    // caches the chat slide jQuery collection within
    jqueryMap = {
      $container: $container,
      $chat: $container.find(".spa-shell-chat")
    };
  };
  // End DOM method /setJqueryMap/

  // Begin DOM method /toggleChat/
  // Purpose: Extends or retracts chat slider
  // Arguments:
  //  * do_extend - if true, extends slider, if false retracts
  //  * callback - optional function to execute after animation
  // Settings:
  //  * chat_extend_time, chat_retract_time
  //  * chat_extend_height, chat_retract_height
  // Returns:
  //  * true - slider animation activated
  //  * false - slider animation not activated

  toggleChat = function(do_extend, callback) {
    var
      px_chat_ht = jqueryMap.$chat.height(),
      is_open = px_chat_ht === configMap.chat_extend_height,
      is_closed = px_chat_ht === configMap.chat_retract_height,
      is_sliding = !is_open && !is_closed;

    // avoids race conditions
    if (is_sliding) {
      return false;
    }

    // Begin extend chat slider
    if (do_extend) {
      jqueryMap.$chat.animate({
          height: configMap.chat_extend_height
        },
        configMap.chat_extend_time,
        function() {
          if (callback) {
            callback(jqueryMap.$chat);
          }
        }
      );
      return true;
    }
    // End extend chat slider

    // Begin retract chat slider
    jqueryMap.$chat.animate({
        height: configMap.chat_retract_height
      },
      configMap.chat_retract_time,
      function() {
        if (callback) {
          callback(jqueryMap.$chat);
        }
      }
    );
    // End retract chat slider
  }
  // End DOM method /toggleChat/
  //  ----------------- END DOM METHODS -----------------------------

  //  ----------------- BEGIN EVENT HANDLERS ------------------------
  //  ----------------- ENDS EVENT HANDLERS -------------------------

  //  ----------------- BEGIN PUBLIC METHODS ------------------------
  // Begin Public Method /initModule/
  initModule = function($container) {
    // load HTML and map jQuery collections
    stateMap.$container = $container;
    $container.html(configMap.main_html);
    setJqueryMap();

    // tests toggle functionality
    setTimeout(function() {
      toggleChat(true);
    }, 3000);
    setTimeout(function() {
      toggleChat(false);
    }, 8000);
  }
  // End Public Method /initModule/

  return {
    initModule: initModule
  };
  //  ----------------- ENDS PUBLIC METHODS -------------------------
}());