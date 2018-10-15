(function (global, factory) {
    "use strict";
    // eslint-disable-next-line
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        // eslint-disable-next-line
        define([], factory);
      } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = global.document ?
        factory( global, true ) :
        function( w ) {
            if ( !w.document ) {
                throw new Error( "aTween requires a window with a document" );
            }
            return factory( w );
        };
      } else {
        // Browser globals (root is window)
        factory( global );
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
   
    var aTween = function () {
        return new aTween.fn.init();
    }
    aTween.fn = aTween.prototype = {
        constructor: aTween,
        animate: function () {
            // eslint-disable-next-line
            return this;
        }
    }
    aTween.extend = aTween.fn.extend = function () {
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
                    if (deep && copy && (aTween.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && Array.isArray(src) ? src : [];

                        } else {
                            clone = src && aTween.isPlainObject(src) ? src : {};
                        }

                        // Never move original objects, clone them
                        target[name] = aTween.extend(deep, clone, copy);

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
    aTween.fn.init=function(){
        
        return this;
    }
    aTween.isFunction = isFunction;
    aTween.isArray = Array.isArray;
    
    aTween.extend({
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
   
    aTween.fn.init.prototype = aTween.fn;
    window.aTween = aTween;
    // function atween(){
    //     return aTween();
    // }
    aTween.fn.extend({
        istest:"test",
        isExtended: function () {
            
            return true;
        }
    });
})