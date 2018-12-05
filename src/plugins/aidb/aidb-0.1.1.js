//aidb 指向 aidb
//this 指向 aidb.init
//外界访问 aidb 指向 this 即 aidb.init
//1私有函数 申明为 aidb
//2公有函数 申明为 this 或在aidb.fn = aidb.prototype里声明
// aidb.fn.init=function() 里申明 不为aidb.或者this.都无法访问
const _default = {
    database: '_config',
    table: "_params",
    version: 1,
    keys: {
        all: 1,
        databaseinfo: 2,//{[{name:"",version:1},{name:"",version:2,tables:["","",""]},{}]}
    }
}
const _config = {
    database: null,
    result: {},
    data:{}
}
function paramsInstance() {

    // 判断是否存在实例
    if (typeof paramsInstance.instance === 'object') {
        return paramsInstance.instance;
    }

    // 其它内容
    this.version = 1
    this.database = "";
    this.table = "";
    // 缓存
    paramsInstance.instance = this;

    // 隐式返回this
}
let params = new paramsInstance();
let aidb = (function () {
    var getProto = Object.getPrototypeOf;
    var class2type = {};
    var toString = class2type.toString;
    var hasOwn = class2type.hasOwnProperty;

    var fnToString = hasOwn.toString;

    var ObjectFunctionString = fnToString.call(Object);

    var isFunction = function isFunction(obj) {
        // Support: Chrome <=57, Firefox <=52
        // In some browsers, typeof returns "function" for HTML <object> elements
        // (i.e., `typeof document.createElement( "object" ) === "function"`).
        // We don't want to classify *any* DOM node as a function.
        return typeof obj === "function" && typeof obj.nodeType !== "number";
    };
    let isNullOrWhitespace = function isNullOrWhitespace(obj) {
        return obj === '' || typeof obj === 'undefined' || Object.keys(obj).length === 0
    }
    const Code = {
        Init: 0,
        InitFailed: -997,
        OpenSuccess: 1,
        OpenFailed: -1,
        ExecutionSuccess: 10,
        ExecutionFailed: -10,
        Fatel: -999,
        Blocked: -998,

    }
    var aidb = function () {
        return new aidb.fn.init();
    }
    aidb.fn = aidb.prototype = {
        //外部可以直接访问
        constructor: aidb,
        version: "0.1.1",
        result: {},
        database: null,

        initialize: async function () {
            console.log('a')
            await aidb._open(_default.database, _default.version)
            console.log(aidb.database)
        },
        openAsync: function (dbname, ver) {

        },
        open: async function (dbname, ver) {
            if (isNullOrWhitespace(ver)) {
                params.version =await aidb._getTableVersion(dbname);
                console.log(params)
            }
            // await aidb._openAsync(dbname,ver);
            params.database = dbname;
            params.version = ver || params.version;
            return this;
        },
        getOptions: function () {
            return params;
        },
        createTable: function (name, props) {
            let self = this;
            const request = window.indexedDB.open(params.database, params.version);
            request.onsuccess = function (event) {
                let result = {
                    result: true,
                    code: Code.ExecutionSuccess,
                    message: 'Create table Success',
                    innerException: event,
                    data: event
                }
                self.result = self.result || result;

                // let a = event.target.result.objectStoreNames;
                // console.log(a);
                // for(item in a){
                //     self.tables.push(a[item])
                // }


            };
            request.onerror = function (event) {
                let result = {
                    result: false,
                    code: Code.OpenFailed,
                    message: 'open database failed',
                    innerException: event,
                    data: event
                }
                self.result = result;

            }
            request.onupgradeneeded = function (event) {
                let database = event.target.result;
                if (!database.objectStoreNames.contains(name)) {
                    database.createObjectStore(name, props);
                    params.version = database.version;
                    let result = {
                        result: true,
                        code: Code.ExecutionSuccess,
                        message: 'create table success',
                        Exception: "",
                        data: event
                    }
                    self.result = result;
                } else {
                    let result = {
                        result: false,
                        code: Code.ExecutionFailed,
                        message: 'table allready exist',
                        Exception: "",
                        data: event
                    }
                    self.result = result;
                }

            }
            request.onblocked = function (event) {
                let result = {
                    result: false,
                    code: Code.Blocked,
                    message: 'last database openning',
                    innerException: event,
                    data: ""
                }
                self.result = result;
            }
            return this;
        },
        set(table) {
            params.table = table;
            return this;
        },
        get: function (query, limit = 200, offset = 0) {
            //1.query== 1||"1"
            //2.query==['1',2,,3]
            //3.query=={id:1,props:"prop"}
            if (typeof query != "object") {
                //1.query== 1||"1"

                let id = query;
                query = { id: id }
            }

            if (Array.isArray(query)) {
                //2.query==['1',2,,3]
                query = { id: query }
            }

            if (params.table === "") {
                return null;
            }
            let offsetCount = offset;
            let limitCount = 0;
            var promise = new Promise(function (resolve, reject) {
                aidb._open(params.database, params.version).then(function (database) {
                    let transaction = database.transaction(params.table, 'readonly');
                    let objectStore = transaction.objectStore(params.table);
                    let data = [];

                    let cursorObject = objectStore.openCursor();

                    cursorObject.onerror = function (event) {
                        aidb._error(event, reject)
                    }
                    cursorObject.onsuccess = function (event) {
                        let cursor = event.target.result;
                        if (cursor) {
                            if (isInCondition(cursor.value)) {
                                if (offsetCount <= 0 && limitCount < limit) {
                                    data.push(cursor.value)
                                    limitCount++;
                                } else {
                                    offsetCount--;
                                }
                            } else {
                                //
                            }
                            cursor.continue();
                        } else {
                            //complete
                            resolve(data);
                        }
                    }
                    function isInCondition(item) {
                        let checked = true;
                        let itemKeys = Object.keys(item);
                        let queryKeys = Object.keys(query);
                        for (let i = 0; i < queryKeys.length; i++) {
                            if (itemKeys.includes(queryKeys[i])) {
                                if (Array.isArray(query[queryKeys[i]])) {
                                    //handle {id:[1,2,3,4]}
                                    if (!query[queryKeys[i]].includes(item[queryKeys[i]])) {
                                        checked = false;
                                    }
                                }
                                else if (item[queryKeys[i]] != query[queryKeys[i]]) {
                                    //handle {id:1}
                                    checked = false;
                                }
                            } else {
                                checked = false;
                            }


                        }
                        return checked;
                    }

                    // 
                })
            })
            return promise;
        },
        add: function (data) {
            //1.{id:1,val:""}
            //2,[{},{},{}]
            let dataArr = []
            if (!Array.isArray(data)) {
                //1.{id:1,val:""}
                dataArr.push(data);
            } else {
                //2,[{},{},{}]
                dataArr = data;
            }
            let head = 0;
            let length = dataArr.length;
            aidb._open(params.database, params.version).then(function (database) {
                var objectStore = database.transaction([params.table], 'readwrite')
                    .objectStore(params.table);
                addNext();
                function addNext() {
                    // console.log(dataArr[head]);
                    if (head < length) {
                        let process = objectStore.add(dataArr[head])
                        process.onsuccess = addNext;
                        ++head;
                    } else {   // complete

                    }
                }


            })
            return this;
        },
        put: function (data) {
            let dataArr = []
            if (!Array.isArray(data)) {
                dataArr.push(data);
            } else {
                dataArr = data;
            }
            let head = 0;
            let length = dataArr.length;

            const promise = new Promise(function (resolve, reject) {
                aidb._open(params.database, params.version).then(function (database) {
                    var objectStore = database.transaction([params.table], 'readwrite')
                        .objectStore(params.table);
                    putNext();
                    function putNext() {
                        // console.log(dataArr[head]);
                        if (head < length) {
                            let procee = objectStore.put(dataArr[head]);
                            procee.onsuccess = putNext;
                            process.onerror = reject;
                            ++head;
                        } else {   // complete
                            // console.log('update complete');
                            resolve();
                        }
                    }


                })
            })

            return promise;
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
    aidb.fn.init = function () {

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
        istest: "test",
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
        _open: function (db, ver) {
            let self = this;
            let promise = new Promise(function (resolve, reject) {
                const request = window.indexedDB.open(db, ver);
                request.onsuccess = function (event) {
                    let result = {
                        result: true,
                        code: Code.OpenSuccess,
                        message: 'open database success',
                        data: event.target.result
                    }
                    self.database = event.target.result;
                    resolve(event.target.result, result);
                };
                request.onerror = function (event) {
                    let result = {
                        result: false,
                        code: Code.OpenFailed,
                        message: 'open database failed',
                        Exception: event,
                        data: event
                    }
                    reject(result)
                }
                request.onupgradeneeded = function (event) {
                    let database = event.target.result;
                    let result = {
                        result: false,
                        code: Code.OpenSuccess,
                        message: 'upgrade database and open success',
                        data: event.target.result
                    }
                    resolve(database, result)
                }
                request.onblocked = function (event) {
                    let result = {
                        result: false,
                        code: Code.Blocked,
                        message: 'last database openning',
                        Exception: event,
                        data: event
                    }
                    reject(result);
                }

            })
            return promise;
        },
        _openAsync: function (db, ver) {
            const request = window.indexedDB.open(db, ver);
            request.onsuccess = function (event) {
                let result = {
                    result: true,
                    code: Code.OpenSuccess,
                    message: 'open database success',
                    data: event.target.result
                }
                _config.database = event.target.result;
                _config.result = result;
            };
            request.onerror = function (event) {
                let result = {
                    result: false,
                    code: Code.OpenFailed,
                    message: 'open database failed',
                    Exception: event,
                    data: event
                }
                _config.result = result;
            }
            request.onupgradeneeded = function (event) {
                let database = event.target.result;
                let result = {
                    result: false,
                    code: Code.OpenSuccess,
                    message: 'upgrade database and open success',
                    data: event.target.result
                }
                _config.database = database;
                _config.result = result;
            }
            request.onblocked = function (event) {
                let result = {
                    result: false,
                    code: Code.Blocked,
                    message: 'last database openning',
                    Exception: event,
                    data: event
                }
                _config.result = result;
            }
        },
        _getTableVersion: async function () {
            let version = 2;
            await aidb._openAsync(_default.database, _default.version);
            await aidb._get(_default.keys.databaseinfo);
            console.log("_getTableVersion",_config);
            return version;
        },
        _get: async function (query) {
            //1.query== 1||"1"
            //2.query==['1',2,,3]
            //3.query=={id:1,props:"prop"}
            if (typeof query != "object") {
                //1.query== 1||"1"

                let id = query;
                query = { id: id }
            }

            if (Array.isArray(query)) {
                //2.query==['1',2,,3]
                query = { id: query }
            }
            let data;
            console.log('here',_config.database)
            let transaction = _config.database.transaction(params.table, 'readonly');
            let objectStore = transaction.objectStore(params.table);
            let request = objectStore.get(query);
            request.onerror = function (event) {
                _config.result = {
                    code: Code.ExecutionFailed,
                    message: "Get Data Failed with key " + query,
                    exception: event,
                    data: null
                }
                console.log("error",event.target.result)
                
            };

            request.onsuccess = function (event) {
                if (request.result) {
                    // _config.result = {
                    //     code: Code.ExecutionSuccess,
                    //     message: "Get Data Success",
                    //     exception: null,
                    //     data: event.target.result

                    // }
                    console.log("success",event.target.result)
                   _config.data = event.target.result;
                   data=event.target.result;
                } else {
                    _config.result = {
                        code: Code.ExecutionFailed,
                        message: "Get Data failed",
                        exception: event,
                        data: null

                    }
                    console.log("success else",event.target.result)
                }
            };

            // 
            return data

        },
        _error: function (data, callback) {
            callback(data);
        }
    })
    return aidb;
})();
export { aidb };

