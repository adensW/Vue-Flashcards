//aidb 指向 aidb
//this 指向 aidb.init
//外界访问 aidb 指向 this 即 aidb.init
//1私有函数 申明为 aidb
//2公有函数 申明为 this 或在aidb.fn = aidb.prototype里声明
// aidb.fn.init=function() 里申明 不为aidb.或者this.都无法访问
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
   
    var aidb = function () {
        return new aidb.fn.init();
    }
    aidb.fn = aidb.prototype = {
        //外部可以直接访问
        constructor: aidb,
        dbVersion:1,
        dbName:"",

        open:function(dbname,ver){
            this.dbName = dbname||this.dbName;
            this.dbVersion=ver||this.dbVersion||1;
            return this;
        },
        // open: function (dbname) {
        //     // eslint-disable-next-line
        //     console.log(dbname)
        //     this._open(dbname);
        //     aidb._open(dbname)
        //     this.get(dbname);
        //     return this;
        // },
        createTable:function(name,prop){
            return this;
        },
        get:function(data){
            return this;
        },
        add:function(data){
            return this;
        },
        put:function(data){
            return this;
        }

    }
    aidb.extend = aidb.fn.extend = function () {
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
                    if (deep && copy && (aidb.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && Array.isArray(src) ? src : [];

                        } else {
                            clone = src && aidb.isPlainObject(src) ? src : {};
                        }

                        // Never move original objects, clone them
                        target[name] = aidb.extend(deep, clone, copy);

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
    aidb.fn.init=function(){
        //必须申明this或aidb 
        //无法访问
        // __open=function(data){
        //     console.log("init function __open "+data)
        // }
    }
    aidb.fn.init.prototype = aidb.fn;
    aidb.isFunction = isFunction;
    aidb.isArray = Array.isArray;
    
    aidb.extend({
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
   
   
    aidb.fn.extend({
        //外部 aidb 可以访问 公共方法
        //内部可以通过this访问
        istest:"test",
        isExtended: function () {
            
            return true;
        },
        // _open:function(data){
        //     console.log("aidb fn extend"+data)
        // }
    });
    aidb.extend({
        //外界aidb 无法访问
        //设置私有方法 内部使用 aidb.方法使用
        _open:function(data){
        }
    })
    export {aidb};

