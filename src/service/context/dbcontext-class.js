import { } from '@/service/context/dbset'
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
class context {
    constructor(dbname, ver) {
        if (!window.indexedDB) {
            // console.error("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.")
            return {
                code: Code.InitFailed,
                message: "Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.",
                result: false
            };
        }
        this.PromiseQueue = Promise.resolve(1);
        this._dbname = dbname;
        this._version = ver;
        this.result = {
            result: true,
            code: 0,
            message: "",
            data: null,
        };
        this.table = "";
        this.database = null;
        this.transaction = null;
    }
    createTable(name, prop) {
        let self = this;
        let promise = new Promise(function (resolve, reject) {
            self.PromiseQueue.then(function () {

                if (!self.database.objectStoreNames.contains(name)) {
                    self.database.createObjectStore(name, prop);
                    self._version = self.database.version;
                    resolve();
                }
            }).catch(function () {
                reject();
                return {
                    code: Code.ExecutionFailed,
                    message: 'Create Table Failed',
                    result: false
                }
            })
        })

        return promise;
    }
    set(table) {
        let self = this;
        self.table = table;
        return self;
    }
    open(dbname, version) {
        let self = this;
        if (dbname != self._dbname) {
            return {
                result: false,
                code: Code.Fatel,
                message: "you are already opened a context instance using database name " + self.name,
            };
        }
        let promise = new Promise(function (resolve, reject) {
            const request = window.indexedDB.open(dbname, version = version || self._version);
            request.onsuccess = function (event) {
                self.database = event.target.result;
                self.result = {
                    result: false,
                    code: Code.OpenSuccess,
                    message: 'open database success',
                    data: null
                }
                resolve();
            };
            request.onerror = function (event) {
                self.result = {
                    result: false,
                    code: Code.OpenFailed,
                    message: 'open database failed',
                    Exception: event,
                    data: null
                }
                reject()
            }
            request.onupgradeneeded = function (event) {
                self.database = event.target.result;
                resolve()
            }
            request.onblocked = function (event) {
                self.result = {
                    result: false,
                    code: Code.Blocked,
                    message: 'last database openning',
                    Exception: event,
                    data: null
                }
                reject();
            }
        })
        this.PromiseQueue = promise;
        return self;
    }
    get(id) {
        let self = this;
        if (self.table === "") {
            return null;
        }

        const promise = new Promise(function (resolve, reject) {
            self.PromiseQueue.then(function () {
                let transaction = self.database.transaction([self.table])
                var objectStore = transaction.objectStore(self.table);
                var request = objectStore.get(id);

                request.onerror = function (event) {
                    self.result = {
                        code: Code.ExecutionFailed,
                        message: "Get Data Failed with key " + id,
                        exception: event,
                        data: null
                    }
                    reject(event.target.result);
                    self.database.close();
                };

                request.onsuccess = function (event) {
                    if (request.result) {
                        self.result = {
                            code: Code.ExecutionSuccess,
                            message: "Get Data Success",
                            exception: null,
                            data: event.target.result

                        }
                        resolve(event.target.result);
                        self.database.close();
                    } else {
                        self.result = {
                            code: Code.ExecutionFailed,
                            message: "Get Data failed",
                            exception: event,
                            data: null

                        }
                        reject(event.target.result);
                        self.database.close();
                    }
                };
            })

        }).catch(function () {
            self.database.close();
        })
        this.PromiseQueue = promise;
        return promise;
    }
    getQuery(query, limit = 200, offset = 0) {
        let self = this;
        if (typeof query != "object") {
            return null;
        }
        if (Array.isArray(query)) {
            query = { id: query }
        }

        if (self.table === "") {
            return null;
        }
        let offsetCount = offset;
        let limitCount = 0;
        var promise = new Promise(function (resolve, reject) {
            self.PromiseQueue.then(function () {
                let transaction = self.database.transaction(self.table, 'readonly');
                let objectStore = transaction.objectStore(self.table);
                let data = [];

                let cursorObject = objectStore.openCursor();

                cursorObject.onerror = function (event) {
                    self._error(event, reject)
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
    }
    getAll() {
        let self = this;
        if (self.table === "") {
            return null;
        }
        const promise = new Promise(function (resolve, reject) {
            self.PromiseQueue.then(function () {
                let transaction = self.database.transaction(self.table, 'readonly');
                let objectStore = transaction.objectStore(self.table);
                if ('getAll' in objectStore) {
                    // IDBObjectStore.getAll() will return the full set of items in our store.
                    objectStore.getAll().onsuccess = function (event) {
                        self.result = {
                            code: Code.ExecutionSuccess,
                            message: "get data success",
                            exception: null,
                            data: event.target.result
                        }
                        resolve(event.target.result);
                    };
                } else {
                    // Fallback to the traditional cursor approach if getAll isn't supported.
                    var data = [];
                    let cursorObject = objectStore.openCursor();
                    cursorObject.onsuccess = function (event) {
                        var cursor = event.target.result;
                        if (cursor) {
                            data.push(cursor.value);
                            cursor.continue();
                        } else {
                            resolve(data);
                        }
                    };
                    cursorObject.onerror = reject;
                }
            })
        })
        return promise;
    }
    add(data) {
        let self = this;
        let dataArr = []
        if (!Array.isArray(data)) {
            dataArr.push(data);
        } else {
            dataArr = data;
        }
        let head = 0;
        let length = dataArr.length;

        const promise = new Promise(function (resolve, reject) {
            self.PromiseQueue.then(function () {
                var objectStore = self.database.transaction([self.table], 'readwrite')
                    .objectStore(self.table);
                addNext();
                function addNext() {
                    // console.log(dataArr[head]);
                    if (head < length) {
                        let process = objectStore.add(dataArr[head])
                        process.onsuccess = addNext;
                        process.onerror = reject;
                        ++head;
                    } else {   // complete
                        resolve();
                    }
                }


            })
        })

        return promise;
    }
    put(data) {
        let self = this;
        let dataArr = []
        if (!Array.isArray(data)) {
            dataArr.push(data);
        } else {
            dataArr = data;
        }
        let head = 0;
        let length = dataArr.length;

        const promise = new Promise(function (resolve, reject) {
            self.PromiseQueue.then(function () {
                var objectStore = self.database.transaction([self.table], 'readwrite')
                    .objectStore(self.table);
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
    delete(key) {
        let self = this;
        const promise = new Promise(function (resolve, reject) {
            self.PromiseQueue.then(function () {
                var request = self.database.transaction([self.table], 'readwrite')
                    .objectStore(self.table)
                    .delete(key);
                request.onsuccess = function (event) {
                    self.result = {
                        result: true,
                        code: Code.ExecutionSuccess,
                        event: event.target,
                        message: 'Delete data success',
                        data: null
                    }
                    resolve(self.result);
                };

                request.onerror = function (event) {
                    self.result = {
                        result: false,
                        code: Code.ExecutionFailed,
                        exception: event.target,
                        message: 'delete data failed, please see more details in exception',
                        data: null
                    }
                    reject(self.result)
                }
            })
        })

        return promise;
    }
    _error(event, callback) {
        callback(event)
    }
    _success(event, callback) {
        callback(event)
    }
    _fatal(event, callback) {
        callback(event)
    }
    _complete(event, callback) {
        callback(event)
    }
    _eventprocess(event, callback) {
        if (event.type === "success") {
            // console.log(event);
            callback(event);
        }
    }
}
export { context as dbcontext };