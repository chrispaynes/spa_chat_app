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
      anchor_schema_map: {
        chat: { opened: true,
                closed: true
              }
      },
      main_html: String()
        + '<div class="spa-shell-head">'
        +   '<div class="spa-shell-head-logo"></div>'
        +   '<div class="spa-shell-head-acct"></div>'
        +   '<div class="spa-shell-head-search"></div>'
        + '</div>'
        + '<div class="spa-shell-main">'
        +   '<div class="spa-shell-main-nav"></div>'
        +   '<div class="spa-shell-main-content"></div>'
        + '</div>'
        + '<div class="spa-shell-foot"></div>'
        + '<div class="spa-shell-chat"></div>'
        + '<div class="spa-shell-modal"></div>'
    },
    stateMap = {
      anchor_map: {}
    },
    // caches jQuery collections in map
    jqueryMap = {},

    // method declarations
    copyAnchorMap, setJqueryMap, changeAnchorPart,
    onHashchange, setChatAnchor, initModule;
  //  ----------------- END MODULE SCOPE VARIABLES  -----------------


  //  ----------------- BEGIN UTILITY METHODS -----------------------
  // these methods don't interact with page elements
  // Returns copy of stored anchor map using jQuery's extend method
  copyAnchorMap = function() {
    return $.extend(true, {}, stateMap.anchor_map);
  };
  //  ----------------- END UTILITY METHODS -------------------------


  //  ----------------- BEGIN DOM METHODS ---------------------------
  // Begin DOM method /setJqueryMap/
  setJqueryMap = function() {
    var $container = stateMap.$container;

    // caches the chat slide jQuery collection within
    jqueryMap = {
      $container: $container
    };
  };
  // End DOM method /setJqueryMap/

  // Begin DOM method /changeAnchorPart
  // Purpose:
  //   Automatically changes part of URI anchor component.
  //   Takes a map of changes and updates only the specified key value component
  //   in the stateMap.anchor_map
  // Arguments:
  //   * arg_map - the map describing what part of the URI anchor to change
  // Returns:
  //   * true - the anchor portion of the URI was updated
  //   * false - the anchor portion of the URI could not be updated
  // Action:
  //   The current anchor rep stored in stateMap.anchor.map
  //   This method
  //     * Creates a copy of this map using copyAnchorMap().
  //     * Modifies the key-values using arg_map.
  //     * Manages the distinction between independent
  //       and dependent values in the encoding.
  //     * Attempts to change URI using uriAnchor.
  //     * Returns true on success, false on failure

  changeAnchorPart = function(arg_map) {
    var
      anchor_map_revise = copyAnchorMap(),
      bool_return = true,
      key_name, key_name_dep;

    // Begin merge changes into anchor map
    KEYVAL:
    for(key_name in arg_map){
      if(arg_map.hasOwnProperty(key_name)) {

        // skip dependent keys during iteration
        if(key_name.indexOf("_") === 0) {
          continue KEYVAL;
        }

        // update independent key value
        anchor_map_revise[key_name] = arg_map[key_name];

        // update matching dependent key
        key_name_dep = "_" + key_name;
        if(arg_map[key_name_dep]) {
          anchor_map_revise[key_name_dep] = arg_map[key_name_dep];
        } else {
          delete anchor_map_revise[key_name_dep];
          delete anchor_map_revise["_s" + key_name_dep];
        }
      }
    }
    // End merge changes into anchor map

    // Begin attempt to update URI; revert to previous state if unsuccessful
    try {
      $.uriAnchor.setAnchor(anchor_map_revise);
    }
    catch(error) {
      // replace URI with existing state
      $.uriAnchor.setAnchor(stateMap.anchor_map, null, true);
      bool_return = false;
    }
    // End attempt to update URI; revert to previous state if unsuccessful

    return bool_return;
  };
  // End DOM method /changeAnchorPart
  //  ----------------- END DOM METHODS -----------------------------


  //  ----------------- BEGIN EVENT HANDLERS ------------------------
  // Begin Event handler /onHashchange/
  // Purpose: Handles the Hashchange event
  // Arguments:
  //  * event - jQuery event object
  // Settings: none
  // Returns: false
  // Actions:
  //  * Parses URI anchor component
  //  * Compares proposed application state against current state 
  //  * Adjust the application only where proposes state change
  //    differs from existing state and is allowed by anchor schema
  onHashchange = function(event){
    var
      // anchor_map_previous = copyAnchorMap(),
      // anchor_map_proposed,
      _s_chat_previous,
      _s_chat_proposed,
      s_chat_proposed,
      anchor_map_proposed,
      is_ok = true,
      anchor_map_previous = copyAnchorMap();

      // attempt to parse anchor
      try {
        anchor_map_proposed = $.uriAnchor.makeAnchorMap();
      }
      catch(error){
        $.uriAnchor.setAnchor(anchor_map_previous, null, true);
        return false;
      }
      stateMap.anchor_map = anchor_map_proposed;
      
      // convenience vars
      _s_chat_previous = anchor_map_previous._s_chat;
      _s_chat_proposed = anchor_map_proposed._s_chat;

      // Begin adjust chat component if changed
      // Clears the URI anchor parameter if the provided position isn't allowed
      // by the uriAnchor settings and revert to the default position
      if(!anchor_map_previous || _s_chat_previous !== _s_chat_proposed){
        s_chat_proposed = anchor_map_proposed.chat;
        switch(s_chat_proposed) {
          case "opened":
            is_ok = spa.chat.setSliderPosition("opened");
            break;
          case "closed":
            is_ok = spa.chat.setSliderPosition("closed");
            break;
          default:
            spa.chat.setSliderPosition("closed")
            delete anchor_map_proposed.chat;
            $.uriAnchor.setAnchor(anchor_map_proposed, null, true); 
        }
      }
      // End adjust chat component if changed

      //  Begin revert anchor if slider change denied
      //  Adds functionality to react property when setSliderPosition
      //  returns a false value (which means the position change request
      //  was denied). Either revers to the prior position anchor value, or
      //  if that doesn't exist, it uses the default.
      if(!is_ok) {
        if(anchor_map_previous) {
          $.uriAnchor.setAnchor(anchor_map_previous, null, true);
          stateMap.anchor_map = anchor_map_previous;
        } else {
          delete anchor_map_proposed.chat;
          $.uriAnchor.setAnchor(anchor_map_proposed, null, true);
        }
      }
      //  End revert anchor if slider change denied

      return false;
    };
  // End Event handler /onHashchange/

  //  ----------------- ENDS EVENT HANDLERS -------------------------


  //  ----------------- BEGIN CALLBACKS -----------------------------
  //  Begin callback method /setChatAnchor/
  //  Example: setChatAnchor("closed")
  //  Purpose: Safely change the anchor's chat component
  //  Arguments:
  //    * position_type - may be "opened" or "closed"
  //  Action:
  //    If possible, changes the URI anchor parameter "chat" to the requested value
  //  Returns:
  //    * true - requested anchor part was updated
  //    * false - requested anchor part was not updated
  //  Throws: none

  setChatAnchor = function(position_type) {
    return changeAnchorPart({
      chat: position_type
    });
  };
  //  ----------------- END CALLBACKS -------------------------------


  //  ----------------- BEGIN PUBLIC METHODS ------------------------
  //  Begin Public Method /initModule/
  //  Example: spa.shell.initModule( $("#div_id") );
  //  Purpose: Directs the shell to offer its capability to the user
  //  Arguments:
  //    * $container (example $("#div_id"))
  //      A jQuery collection that should represent a single DOM container
  //  Action:
  //    Populates $container with the shell of the UI and then configures and
  //    initializes feature modules. The shell is also responsible for
  //    browser-wide issues such as URI anchor and cookie management.
  //  Returns: none
  //  Throws: none

  initModule = function($container) {
    // load HTML and map jQuery collections
    stateMap.$container = $container;
    $container.html(configMap.main_html);
    setJqueryMap();

  // configure uriAnchor to use SPA schema
  $.uriAnchor.configModule({
    schema_map: configMap.anchor_schema_map
  });

  // configure and initialize feature modules
  spa.chat.configModule({
    set_chat_anchor: setChatAnchor,
    chat_model: spa.model.chat,
    people_model: spa.model.people
  });
  spa.chat.initModule(jqueryMap.$container);

  // Handle URI anchor change events
  // This is done after all feature modules are configured
  // and initialized, otherwise they will not be ready to 
  // handle the trigger event, which is used to ensure the anchor
  // is considered on-load
  $(window)
    .bind("hashchange", onHashchange)
    .trigger("hashchange");
  
  };
  // End Public Method /initModule/
  
  return {
    initModule: initModule
  };
  //  ----------------- ENDS PUBLIC METHODS -------------------------
}());
