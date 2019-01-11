export default (function (global, factory) {
    "use strict";
    // eslint-disable-next-line
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        // eslint-disable-next-line
        return define([], factory);
      } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        return module.exports = global.document ?
        factory( global, true ) :
        function( w ) {
            if ( !w.document ) {
                throw new Error( "atool requires a window with a document" );
            }
            return factory( w );
        };
      } else {
        // Browser globals (root is window)
        return factory( global );
      }
    // Pass this if window is not defined yet
    // eslint-disable-next-line
})(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {
    var getProto = Object.getPrototypeOf;
    var class2type = {};
    var toString = class2type.toString;
    var hasOwn = class2type.hasOwnProperty;

    var fnToString = hasOwn.toString;

    var ObjectFunctionString = fnToString.call(Object);
    
    var isFunction = function isFunction( obj ) {

        // Support: Chrome <=57, Firefox <=52
        // In some browsers, typeof returns "function" for HTML <object> elements
        // (i.e., `typeof document.createElement( "object" ) === "function"`).
        // We don't want to classify *any* DOM node as a function.
        return typeof obj === "function" && typeof obj.nodeType !== "number";
    };
   
    var atool = function () {
        return new atool.fn.init();
    }
    atool.fn = atool.prototype = {
        constructor: atool,
        guid : 1,
        getUrlValue:function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substring(1).match(reg);
            if (r != null){
                return decodeURI(r[2]); 
            } 
            return null;
        },
        isNullOrWhiteSpace:function(obj){
            if (Array.isArray(obj)) {
                return obj.length === 0;
            }
            return obj === '' || typeof obj === 'undefined' || Object.keys(obj).length === 0||obj.length===0
        },
        _debounce:function(func, wait) {
            var timeout, args, context, timestamp, result;
            var later = function later() {
              var last = Date.now() - timestamp;
              if (last < wait && last >= 0) {
                timeout = setTimeout(later, wait - last);
              } else {
                timeout = null;
                result = func.apply(context, args);
                if (!timeout) context = args = null;
              }
            };
            return function () {
              context = this;
              args = arguments;
              timestamp = Date.now();
              if (!timeout) {
                timeout = setTimeout(later, wait);
              }
              return result;
            };
          }
        
    }
    atool.extend = atool.fn.extend = function () {
        var src, copyIsArray, copy, name, options, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // Handle a deep copy situation
        if (typeof target === "boolean") {
            deep = target;
            target = arguments[1] || {};
            // skip the boolean and the target
            i = 2;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if (typeof target !== "object" && !isFunction(target)) {
            target = {};
        }

        // extend jQuery itself if only one argument is passed
        if (length === i) {
            target = this;
            --i;
        }

        for (; i < length; i++) {
            // Only deal with non-null/undefined values
            if ((options = arguments[i]) !== null) {
                // Extend the base object
                for (name in options) {
                    src = target[name];
                    copy = options[name];

                    // Prevent never-ending loop
                    if (target === copy) {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    if (deep && copy && (atool.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && Array.isArray(src) ? src : [];

                        } else {
                            clone = src && atool.isPlainObject(src) ? src : {};
                        }

                        // Never move original objects, clone them
                        target[name] = atool.extend(deep, clone, copy);

                        // Don't bring in undefined values
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }

        // Return the modified object
        
        return target;
    };
    atool.fn.init=function(){
        
        return this;
    }
    atool.isFunction = isFunction;
    atool.isArray = Array.isArray;
    
    atool.extend({
        isPlainObject: function (obj) {
            var proto, Ctor;
            // Detect obvious negatives
            // Use toString instead of jQuery.type to catch host objects
            if (!obj || toString.call(obj) !== "[object Object]") {
                return false;
            }
            proto = getProto(obj);
            // Objects with no prototype (e.g., `Object.create( null )`) are plain
            if (!proto) {
                return true;
            }
            // Objects with prototype are plain iff they were constructed by a global Object function
            Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
            return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
        }
    });
   
    atool.fn.init.prototype = atool.fn;
    atool.extend({
        //event
        guid:1,
        addEvent:function(element, type, handler) {
            if (element.addEventListener) {
                element.addEventListener(type, handler, false);
            } else {
                // assign each event handler a unique ID
                if (!handler.$$guid) handler.$$guid = atool.guid++;
                // create a hash table of event types for the element
                if (!element.events) element.events = {};
                // create a hash table of event handlers for each element/event pair
                var handlers = element.events[type];
                if (!handlers) {
                    handlers = element.events[type] = {};
                    // store the existing event handler (if there is one)
                    if (element["on" + type]) {
                        handlers[0] = element["on" + type];
                    }
                }
                // store the event handler in the hash table
                handlers[handler.$$guid] = handler;
                // assign a global event handler to do all the work
                element["on" + type] = atool.handleEvent;
            }
        },
        handleEvent:function(event) {
            var returnValue = true;
            // grab the event object (IE uses a global event object)
            event = event || atool.fixEvent(((this.ownerDocument || this.document || this).parentWindow || window).event);
            // get a reference to the hash table of event handlers
            var handlers = this.events[event.type];
            // execute each event handler
            for (var i in handlers) {
                this.$$handleEvent = handlers[i];
                if (this.$$handleEvent(event) === false) {
                    returnValue = false;
                }
            }
            return returnValue;
        },
        removeEvent:function(element, type, handler) {
            if (element.removeEventListener) {
                element.removeEventListener(type, handler, false);
            } else {
                // delete the event handler from the hash table
                if (element.events && element.events[type]) {
                    delete element.events[type][handler.$$guid];
                }
            }
        },
        fixEvent:function(event) {
            this.preventDefault=function() {
                this.returnValue = false;
            };
            this.stopPropagation = function() {
                this.cancelBubble = true;
            };
            // add W3C standard event methods
            event.preventDefault = this.preventDefault;
            event.stopPropagation = this.stopPropagation;
            return event;
        },
    })
    atool.fn.extend({
    });
   
    return atool;
})
