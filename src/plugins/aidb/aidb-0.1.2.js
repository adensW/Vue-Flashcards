//aidb 指向 aidb
//this 指向 aidb.init
//外界访问 aidb 指向 this 即 aidb.init
//1私有函数 申明为 aidb
//2公有函数 申明为 this 或在aidb.fn = aidb.prototype里声明
// aidb.fn.init=function() 里申明 不为aidb.或者this.都无法访问
const ERRORCODE = {
    INIT: 0,
    INITFAILED: -997,
    OPENSUCCESS: 1,
    OPENFAILED: -1,
    SETFAILED: -2,
    SETSUCCESS: 2,
    EXECUTIONSUCCESS: 10,
    EXECUTIONFAILED: -10,
    FATEL: -999,
    BLOCKED: -998,
    ABORT: -997,
}
const STATE = {
    DELETE: "-1",
    CLEAR: '-10',
    OPEN: "0",
    ADD: "1",
    UPDATE: "2",
}
const _default = {
    database: 'aidb_default',
    table: "aidb_params",
    version: 1,
}
const _initDefault = {
    database: 'aidb_default',
    version: 1,
    tables: [{
        name: 'aidb_params',
        index: [{
            key: 'database',
            unique: true,
        }],
        prop: { keyPath: 'id' },
        state: STATE.ADD,
        sets: [{
            value: { id: 0, database: 'aidb_default', version: 1 },
            state: STATE.ADD
        }]
    }],
    state: STATE.ADD
}
//cache
let dbset = {
    //-->open(test,ver)
    //database:'test',
    //version:1||_default获取最新
    //-->set()
    //tables:[{name:'tablename1',state:'add',sets:[{value:{},state:'add'},{}]}]
    database: '',
    tables: [],
    version: 1,
    state: STATE.OPEN
}
let dbsetreset = {
    //-->open(test,ver)
    //database:'test',
    //version:1||_default获取最新
    //-->set()
    //tables:[{name:'tablename1',state:'add',sets:[{value:{},state:'add'},{}]}]
    database: '',
    tables: [],
    version: 1,
    state: STATE.OPEN
}
let tableset = function () {
    let name = '';
    let index = [];
    let prop = { autoIncrement: true };
    let state = STATE.UPDATE;
    let sets = [];
}
//cache end
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
    let isNullOrWhiteSpace = function isNullOrWhiteSpace(obj) {
        if (Array.isArray(obj)) {
            return obj.length === 0;
        }
        return obj === '' || typeof obj === 'undefined' || Object.keys(obj).length === 0
    }
    var aidb = function () {
        return new aidb.fn.init();
    }
    aidb.fn = aidb.prototype = {
        //外部可以直接访问
        constructor: aidb,
        version: "0.1.2",
        result: {},
        database: null,
        args: dbset,
        initialize: function () {
            aidb._execude(_initDefault).then(function () {
            }).catch(function () {
            })
        },
        reset: function () {
            dbset = dbsetreset;
        },
        open: function (dbname, ver) {
            dbset.database = dbname;
            dbset.version = ver || null;
            return this;
        },
        createTable: function (name, props, index) {
            let table = new tableset();
            table.name = name;
            table.state = STATE.ADD;
            table.prop = props || { autoIncrement: true }
            if (!isNullOrWhiteSpace(index)) {
                table.index = [];
                if (Array.isArray(index)) {
                    table.index = index;
                } else {
                    table.index.push(index);
                }
            }
            dbset.tables.push(table)
            return this;
        },
        execude: function () {
            return aidb._execude().then(function () {
                dbset = dbsetreset;
            });
        },
        set(table) {
            dbset.tables.push(table.toString())
            return this;
        },
        get: function (objectStore,query) {
            //1.query== 1||"1"
            //2.query==['1',2,,3]
            //3.query=={id:1,props:"prop"}
            if(Array.isArray(query)){
                //[1,2,3]
            }else{
                if (typeof query != "object") {
                    //1.query== 1||"1"
                    
                    return aidb._get(dbset.database,objectStore,query);
                }else if(typeof query ==='object'){
                    if(Object.keys(query).length==1){
                         //{index:[]}
                            //{index:''}
                            let index = Object.keys(query)[0];
                            let value = query[index];
                        if (Array.isArray(value)) {
                            //2.query==['1',2,,3]
                            query = { id: query }
                        }else{
                            console.log(index)
                            console.log(value)
                            return aidb._getIndex(dbset.database,objectStore,index,value);
                        }
                    }else{
                        //{index:'',condition:''}
                    }
                    console.log(Object.keys(query))
                }
            }
        },
        add: function (storename, data) {

            let i = dbset.tables.findIndex(function (obj) { return obj.name == storename })
            if (i >= 0) {

                dbset.tables[i].state = dbset.tables[i].state || STATE.UPDATE;
                let dataArr = []
                if (!Array.isArray(data)) {
                    //1.{id:1,val:""}
                    dataArr.push({ value: data, state: STATE.ADD });
                } else {
                    //2,[{},{},{}]
                    dataArr = data;
                    for (let i = 0; i < data.length; i++) {
                        const element = data[i];
                        dataArr.push({ value: element, state: STATE.ADD })
                    }
                }
                dbset.tables[i].sets = dbset.tables[i].sets.concat(dataArr);
            } else {
                let table = new tableset();
                table.name = storename;
                table.state = STATE.UPDATE;
                let dataArr = []
                if (!Array.isArray(data)) {
                    //1.{id:1,val:""}
                    dataArr.push({ value: data, state: STATE.ADD });
                } else {
                    //2,[{},{},{}]
                    dataArr = data;
                    for (let i = 0; i < data.length; i++) {
                        const element = data[i];
                        dataArr.push({ value: element, state: STATE.ADD })
                    }
                }
                table.sets = dataArr;
                dbset.tables.push(table)
            }
            return this;
        },
        put: function (storename,data,id) {
            let i = dbset.tables.findIndex(function (obj) { return obj.name == storename })
            if (i >= 0) {

                dbset.tables[i].state = dbset.tables[i].state || STATE.UPDATE;
                let dataArr = []
                if (!Array.isArray(data)) {
                    //1.{id:1,val:""}
                    dataArr.push({ value: data, state: STATE.UPDATE,id:id||data.id });
                } else {
                    //2,[{},{},{}]
                    dataArr = data;
                    for (let i = 0; i < data.length; i++) {
                        const element = data[i];
                        dataArr.push({ value: element, state: STATE.UPDATE,id:id||data.id })
                    }
                }
                dbset.tables[i].sets = dbset.tables[i].sets.concat(dataArr);
            } else {
                let table = new tableset();
                table.name = storename;
                table.state = STATE.UPDATE;
                let dataArr = []
                if (!Array.isArray(data)) {
                    //1.{id:1,val:""}
                    dataArr.push({ value: data, state: STATE.UPDATE,id:id||data.id });
                } else {
                    //2,[{},{},{}]
                    dataArr = data;
                    for (let i = 0; i < data.length; i++) {
                        const element = data[i];
                        dataArr.push({ value: element, state: STATE.UPDATE,id:id||data.id })
                    }
                }
                table.sets = dataArr;
                dbset.tables.push(table)
            }
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
    aidb.fn.init = function () {

        //必须申明this或aidb 
        //无法访问

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
    });
    aidb.extend({
        //tools
    })
    aidb.extend({
        //外界aidb 无法访问
        //设置私有方法 内部使用 aidb.方法使用
        _versionIncrease: function (name) {
            let promise = new Promise(function (resolve) {
                aidb._getIndex(_default.database, _default.table, 'database', name).then(function (result) {
                    dbset.version = result.version - 1 + 2;
                    // console.log('versionIncrease', dbset);
                    return resolve()
                }).catch(function () {
                    //not created ,set version 1 
                    dbset.version = 1
                    // console.log('versionIncreaseError', result);
                    return resolve()
                })
            })
            return promise;
        },
        _execude: function (args) {
            let promise = new Promise(function (resolve, reject) {
                let set = args || dbset;
                //first check database open or create
                if (isNullOrWhiteSpace(set.database)) {
                    let result = {
                        code: ERRORCODE.OpenFailed,
                        exception: "you are openning database without name!!!",
                        message: "you are openning database without name!!!",
                    }
                    return reject(result);
                }
                if (isNullOrWhiteSpace(set.tables)) {
                    let result = {
                        code: ERRORCODE.SetFailed,
                        exception: "you are openning table without name!!!",
                        message: "you are openning table without name!!!",
                    }
                    return reject(result);
                }
                //second check table create
                let tables = set.tables;
                let tablesAdd = [];
                let tablesDel = [];
                let tablesClr = [];
                let tablesPut = [];
                let tableList = [];
                for (let index = 0; index < tables.length; index++) {
                    const element = tables[index];
                    if (element.state) {
                        switch (element.state) {
                            case STATE.ADD:
                                tablesAdd.push(element);
                                break;
                            case STATE.DELETE:
                                tablesDel.push(element);
                                break;
                            case STATE.CLEAR:
                                tablesClr.push(element);
                                break;
                            case STATE.UPDATE:
                                tablesPut.push(element);
                                break;
                            default:
                                break;
                        }
                        tableList.push(element.name)
                    }
                }
                //table open
                if (tablesAdd.length > 0) {
                    aidb._versionIncrease(dbset.database).then(function () {
                        // console.log('execude', set)
                        aidb._updateParmas(set).then(function () {
                            let request = window.indexedDB.open(set.database, set.version);
                            request.onupgradeneeded = function (event) {
                                //tableadd
                                let database = event.target.result;
                                for (let index = 0; index < tablesAdd.length; index++) {
                                    const table = tablesAdd[index];
                                    if (!database.objectStoreNames.contains(table.name)) {
                                        let objectStore = database.createObjectStore(table.name, table.prop);
                                        if (!isNullOrWhiteSpace(table.index)) {
                                            for (let i = 0; i < table.index.length; i++) {
                                                const ele = table.index[i];
                                                objectStore.createIndex(ele.key, ele.key, { unique: ele.unique })
                                            }
                                        }
                                        if (!isNullOrWhiteSpace(table.sets)) {
                                            let addNext = function Next() {
                                                // console.log(dataArr[head]);
                                                if (head < length) {
                                                    const set = table.sets[head];
                                                    let process;
                                                    switch (set.state) {
                                                        case STATE.ADD:
                                                            process = objectStore.add(set.value)
                                                            process.onsuccess = addNext;
                                                            break;
                                                        case STATE.DELETE:
                                                            process = objectStore.delete(set.value)
                                                            process.onsuccess = addNext;
                                                            break;
                                                        case STATE.UPDATE:
                                                            process = objectStore.put(set.value)
                                                            process.onsuccess = addNext;
                                                            break;
                                                        default:
                                                            break;
                                                    }
                                                    ++head;
                                                } else {   // complete
                                                }
                                            }
                                            // _transaction=_transaction||database.transaction(tableList,'readwrite');
                                            // let transaction=_transaction|| database.transaction(tableList,'readwrite');
                                            // let objectStore= transaction.ObjectStore(table.name);
                                            let head = 0;
                                            let length = table.sets.length;
                                            addNext();
                                        }
                                    }
                                }
                                for (let index = 0; index < tablesDel.length; index++) {
                                    const element = tablesDel[index];
                                    database.deleteObjectStore(element.name);
                                }
                                if (isNullOrWhiteSpace(tablesPut)) {
                                    return resolve();
                                }
                            }
                            request.onsuccess = function (event) {
                                //tableput
                                // console.log('debug',set)
                                let database = event.target.result;
                                let transaction = database.transaction(tableList, 'readwrite');
                                for (let index = 0; index < tablesPut.length; index++) {
                                    const element = tablesPut[index];
                                    let objectStore = transaction.objectStore(element.name)
                                    let head = 0;
                                    let length = element.sets.length;
                                    if (element.sets) {
                                        let putNext = function Next() {
                                            // console.log(dataArr[head]);
                                            if (head < length) {
                                                const set = element.sets[head];
                                                let process;
                                                switch (set.state) {
                                                    case STATE.ADD:
                                                        process = objectStore.add(set.value)
                                                        process.onsuccess = putNext;
                                                        break;
                                                    case STATE.DELETE:
                                                        process = objectStore.delete(set.value)
                                                        process.onsuccess = putNext;
                                                        break;
                                                    case STATE.UPDATE:
                                                        process = objectStore.put(set.value)
                                                        process.onsuccess = putNext;
                                                        break;
                                                    default:
                                                        break;
                                                }
                                                ++head;
                                            } else {   // complete
                                            }
                                        }
                                        putNext();
                                    }
                                }
                                for (let index = 0; index < tablesClr.length; index++) {
                                    const element = tablesClr[index];
                                    let objectStore = transaction.objectStore(element.name)
                                    objectStore.clear();
                                }
                                return resolve();
                            }
                            request.onerror = function (event) {
                                return reject(event);
                            }
                            request.onblocked = function (event) {
                                return reject(event);
                            }
                        });
                    });
                } else {
                    let request = window.indexedDB.open(set.database);

                    request.onupgradeneeded = function (event) {
                        //tableadd

                        let database = event.target.result;
                        for (let index = 0; index < tablesAdd.length; index++) {
                            const table = tablesAdd[index];
                            if (!database.objectStoreNames.contains(table.name)) {
                                let objectStore = database.createObjectStore(table.name, table.prop);
                                if (!isNullOrWhiteSpace(table.index)) {
                                    for (let i = 0; i < table.index.length; i++) {
                                        const ele = table.index[i];
                                        objectStore.createIndex(ele.key, ele.key, { unique: ele.unique })
                                    }
                                }
                                if (!isNullOrWhiteSpace(table.sets)) {
                                    let addNext = function Next() {
                                        // console.log(dataArr[head]);
                                        if (head < length) {
                                            const set = table.sets[head];
                                            let process;
                                            switch (set.state) {
                                                case STATE.Add:
                                                    process = objectStore.add(set.value)
                                                    process.onsuccess = addNext;
                                                    break;
                                                case STATE.DELETE:
                                                    process = objectStore.delete(set.value)
                                                    process.onsuccess = addNext;
                                                    break;
                                                case STATE.UPDATE:
                                                    process = objectStore.put(set.value)
                                                    process.onsuccess = addNext;
                                                    break;
                                                default:
                                                    break;
                                            }
                                            ++head;
                                        } else {   // complete
                                        }
                                    }
                                    // _transaction=_transaction||database.transaction(tableList,'readwrite');
                                    // let transaction=_transaction|| database.transaction(tableList,'readwrite');
                                    // let objectStore= transaction.ObjectStore(table.name);
                                    let head = 0;
                                    let length = table.sets.length;
                                    addNext();
                                }
                            }
                        }
                        for (let index = 0; index < tablesDel.length; index++) {
                            const element = tablesDel[index];
                            database.deleteObjectStore(element.name);
                        }
                        if (isNullOrWhiteSpace(tablesPut)) {
                            return resolve();
                        }
                    }
                    request.onsuccess = function (event) {
                        //tableput
                        let database = event.target.result;

                        let transaction = database.transaction(tableList, 'readwrite');

                        for (let index = 0; index < tablesPut.length; index++) {

                            const element = tablesPut[index];
                            let objectStore = transaction.objectStore(element.name)
                            let head = 0;
                            let length = element.sets.length;
                            let putNext = function Next() {
                                if (head < length) {
                                    const set = element.sets[head];
                                    let process;
                                    switch (set.state) {
                                        case STATE.ADD:
                                            process = objectStore.add(set.value)
                                            process.onsuccess = putNext;
                                            break;
                                        case STATE.DELETE:
                                            process = objectStore.delete(set.value)
                                            process.onsuccess = putNext;
                                            break;
                                        case STATE.UPDATE:
                                            process = objectStore.put(set.value,set.id)
                                            process.onsuccess = putNext;
                                            break;
                                        default:
                                            break;
                                    }
                                    ++head;
                                } else {   // complete
                                }

                            }
                            putNext();
                        }
                        for (let index = 0; index < tablesClr.length; index++) {
                            const element = tablesClr[index];
                            let objectStore = transaction.objectStore(element.name)
                            objectStore.clear();
                        }
                        return resolve();
                    }
                    request.onerror = function (event) {
                        return reject(event);
                    }
                    request.onblocked = function (event) {
                        return reject(event);
                    }
                }
            })
            return promise;
        },
        _updateParmas: function (set) {
            return aidb._getIndex(_default.database, _default.table, 'database', set.database).then(function (result) {
                console.log('update', result);
                result.version = set.version;
                aidb._execude({
                    database: 'aidb_default',
                    version: 1,
                    tables: [{
                        name: 'aidb_params',
                        index: [{
                            key: 'database',
                            unique: true,
                        }],
                        prop: { keyPath: 'id' },
                        state: STATE.UPDATE,
                        sets: [{
                            value: result,
                            state: STATE.UPDATE
                        }]
                    }],
                    state: STATE.OPEN
                })

                //put
            }).catch(function (result) {
                if (isNullOrWhiteSpace(result)) {
                    //add
                    aidb._execude({
                        database: 'aidb_default',
                        version: 1,
                        tables: [{
                            name: 'aidb_params',
                            index: [{
                                key: 'database',
                                unique: true,
                            }],
                            prop: { keyPath: 'id' },
                            state: STATE.UPDATE,
                            sets: [{
                                value: { id: Date.now(), database: set.database, version: set.version },
                                state: STATE.ADD
                            }]
                        }],
                        state: STATE.OPEN
                    })

                } else {
                    //error

                }
            })

        },
        _getIndex: function (db, table, index, value) {
            let promise = new Promise(function (resolve, reject) {
                const request = window.indexedDB.open(db);
                request.onsuccess = function (event) {
                    let database = event.target.result
                    let transaction = database.transaction(table, 'readonly');
                    let objectStore = transaction.objectStore(table);
                    if (objectStore.indexNames.contains(index)) {
                        let indexReq = objectStore.index(index)
                        var req = indexReq.get(value);
                        req.onsuccess = function (event) {
                            if(event.target.result){
                                return resolve(event.target.result)
                            }else{
                                return resolve(null)
                            }
                        }
                        req.onerror=function(event){
                            return reject(event)
                        }
                    }else{
                       return reject({error:'index not created'})
                    }

                };
                request.onerror = function (event) {
                    return reject(event);
                }
                request.onupgradeneeded = function (event) {
                    return resolve(event)
                }
                request.onblocked = function (event) {
                    return reject(event)
                }
            });
            return promise;
        },
        _getQuery: function (db, table, query) {
            let promise = new Promise(function (resolve, reject) {
                const request = window.indexedDB.open(db);
                request.onsuccess = function (event) {

                    let database = event.target.result
                    let transaction = database.transaction(table, 'readonly');
                    let objectStore = transaction.objectStore(table);
                    if (isNullOrWhiteSpace(query)) {
                        //getAll()
                    } else {
                        let queryKeys = Object.keys(query);
                        if (queryKeys.length > 1) {
                            for (let i = 0; i < queryKeys.length; i++) {
                                const element = queryKeys[i];

                                console.log(query[element])
                            }
                        } else {
                            if (Array.isArray(query[queryKeys[0]])) {
                                //handle {key:[1,2,3,4]}

                            } else {
                                //handle {key:1}
                            }
                        }
                    }
                    if (objectStore.indexNames.contains(index)) {
                        let indexReq = objectStore.index(index)
                        var req = indexReq.get(value);
                        req.onsuccess = function (event) {
                            if (event.target.result) {
                                return resolve(event.target.result)
                            } else {
                                return resolve(null)
                            }
                        }
                    }
                };
                request.onerror = function (event) {
                    return reject(event);
                }
                request.onupgradeneeded = function (event) {
                    return resolve(event);
                }
                request.onblocked = function (event) {
                    return reject(event);
                }
            });
            return promise;
        },
        _get: function (db,  table, query) {
            let promise = new Promise(function (resolve, reject) {
                const request = window.indexedDB.open(db);
                request.onsuccess = function (event) {

                    let database = event.target.result
                    let transaction = database.transaction(table, 'readonly');
                    let objectStore = transaction.objectStore(table);
                    // let indexReq = objectStore.index('id')
                    var req = objectStore.get(query);
                    req.onsuccess = function (event) {
                        if (event.target.result) {
                            return resolve(event.target.result)
                        } else {
                            return resolve(null)
                        }

                    }
                };
                request.onerror = function (event) {
                    return reject(event);
                }
                request.onupgradeneeded = function (event) {
                    return resolve(event);
                }
                request.onblocked = function (event) {
                    return reject(event);
                }
            });
            return promise;
        },
    })
    return aidb;
})();
export { aidb };

