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
//cache
const _config = {
    database: null,
    table:"",
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
        openAsync: async function (dbname, ver) {
            if (isNullOrWhitespace(ver)) {
                await aidb._getTableVersion(dbname);
            }
            console.log(params.version)
            // await aidb._openAsync(dbname,ver);
        },
        open: function (dbname, ver) {
            params.database = dbname;
            params.version = ver || params.version;
            return this;
        },
        getOptions: function () {
            return params;
        },
        createTable: function (name, props) {
            let self = this;
            const request = window.indexedDB.open(params.database);
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
                const request = window.indexedDB.open(db);
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
        _openAsync:async function (db, ver) {
            const request = window.indexedDB.open(db, ver);
            request.onsuccess =await function (event) {
                let result = {
                    result: true,
                    code: Code.OpenSuccess,
                    message: 'open database success',
                    data: event.target.result
                }
                _config.database = event.target.result;
                _config.result = result;
            };
            request.onerror =await function (event) {
                let result = {
                    result: false,
                    code: Code.OpenFailed,
                    message: 'open database failed',
                    Exception: event,
                    data: event
                }
                _config.result = result;
            }
            request.onupgradeneeded =await function (event) {
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
            request.onblocked =await function (event) {
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
            await aidb._open(_default.database, _default.version).then(async function(database){

                let transaction = database.transaction(_default.table, 'readonly');
                let objectStore = transaction.objectStore(_default.table);
                var req = objectStore.get(2);
                req.onsuccess=await function(event){
                    let data={}
                    if(req.result){
                        data= aidb.extend(true,{},event.target.result);
                        params.version = data.data[0].version
                        console.log('step1:',data.data[0].version)
                    }
                    console.log("step 2",data.data[0].version)
                }
                
            });
            

            await aidb._setAsync(_default.table);
            const a = await aidb._getAsync(_default.database,_default.version,_default.table,_default.keys.databaseinfo);
            return version;
        },
        _setAsync:async function(table){
            _config.table = table;
        },
        _getAsync: async function (db,ver,table,query) {
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
            let data={};
            const request = window.indexedDB.open(db, ver);
            request.onsuccess =async function (event) {
                
                let database = event.target.result
                let transaction = database.transaction(table, 'readonly');
                let objectStore = transaction.objectStore(table);
                var req = objectStore.get(2);
                 req.onsuccess=await function(event){
                    if(req.result){
                        data= aidb.extend(true,{},event.target.result);
                        
                        callback(data)
                        console.log('req',event.target.result)
                    }else{
                        console.log('req else',event.target.result)
                    }
                    
                }
                console.log('request data',data)
            };
            request.onerror = function (event) {
                
            }
            request.onupgradeneeded = function (event) {
              
            }
            request.onblocked = function (event) {
                
            }
            function callback(data){
                console.log('callback',data)
            }
            ///
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

