import {} from '@/service/context/dbset'
const  Code={
    Init:0,
    OpenSuccess:1,
    OpenFailed:-1,
    ExecutionSuccess:10,
    ExecutionFailed:-10,
    Fatel:-999,
    Blocked:-998,

}
class context{
    constructor(dbname,ver){
        if(!window.indexedDB)
        {
            console.error("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.")
            return null;
        }
        this.PromiseQueue = Promise.resolve(1);
        this._dbname=dbname;
        this._version = ver;
        this.result={
            result:true,
            code:0,
            message:"",
            data:null,
        };
        this.table="",
        this.database = null;
        this.transaction = null;
    }
    createTable(name,prop){
        let self = this;
        let promise = new Promise(function(resolve,reject){
            self.PromiseQueue.then(function(){
                console.log(self.database)
                if (!self.database.objectStoreNames.contains(name)) {
                    self.database.createObjectStore(name, prop);
                    self._version=self.database.version
                }
            }).catch(function(){
                console.log("error")
            })
        })
        
       return promise;
    }
    set(table){
        let self = this;
        self.table = table;
        return self;
    }
    open(dbname,version){
        let self = this;
        if(dbname!=self._dbname){
            console.error("you are already opened a context instance using database name "+self.name);
            return null;
        }
        let promise = new Promise(function(resolve,reject){
            const request = window.indexedDB.open(dbname,version=version||self._version);
            request.onsuccess = function(event){
                self.database = event.target.result;
                self.result={
                    result:false,
                    code:Code.OpenSuccess,
                    message:'open database success',
                    data:null
                }
                resolve();
            };
            request.onerror =function(event){
                    self.result={
                        result:false,
                        code:Code.OpenFailed,
                        message:'open database failed',
                        Exception:event,
                        data:null
                    }
                   reject()
            }
            request.onupgradeneeded = function(event){
                self.database = event.target.result;
                resolve()
            }
            request.onblocked = function(event){
                self.result={
                    result:false,
                    code:Code.Blocked,
                    message:'last database openning',
                    Exception:event,
                    data:null
                }
                reject();
            }
        })
        this.PromiseQueue=promise;
        return self;
    }
    get(id){
        let self= this;
        if(self.table===""){
            return null;
        }
       
        const promise = new Promise(function(resolve,reject){
            self.PromiseQueue.then(function(){
                let transaction = self.database.transaction([self.table])
                var objectStore = transaction.objectStore(self.table);
                var request = objectStore.get(id);

                request.onerror = function(event) {
                    self.result ={
                        code:Code.ExecutionFailed,
                        message:"Get Data Failed with key "+id,
                        exception:event,
                        data:null
                    }
                    reject(event.target.result);
                    self.database.close();
                };

                request.onsuccess = function(event) {
                    if (request.result) {
                        self.result={
                            code:Code.ExecutionSuccess,
                            message:"Get Data Success",
                            exception:null,
                            data:event.target.result

                        }
                        resolve(event.target.result);
                        self.database.close();
                    } else {
                        self.result={
                            code:Code.ExecutionFailed,
                            message:"Get Data failed",
                            exception:event,
                            data:null

                        }
                        reject(event.target.result);
                        self.database.close();
                    }
                };
            })
                
            }).catch(function(){
                console.log("open database failed");
                console.log(self);
                self.database.close();
    
            })
        this.PromiseQueue = promise;
        return promise;
    }
    getAll(){
        let self= this;
        if(self.table===""){
            return null;
        }
        const promise = new Promise(function(resolve,reject){
            self.PromiseQueue.then(function(){
                let transaction = self.database.transaction(self.table,'readonly');
                let objectStore = transaction.objectStore(self.table);
                if ('getAll' in objectStore) {
                    // IDBObjectStore.getAll() will return the full set of items in our store.
                    objectStore.getAll().onsuccess = function(event) {
                        self.result = {
                            code:Code.ExecutionSuccess,
                            message:"get data success",
                            exception:null,
                            data:event.target.result
                        }
                        resolve(event.target.result);
                    };
                  } else {
                    // Fallback to the traditional cursor approach if getAll isn't supported.
                    var data = [];
                    objectStore.openCursor().onsuccess = function(event) {
                      var cursor = event.target.result;
                      if (cursor) {
                        data.push(cursor.value);
                        cursor.continue();
                      } else {
                        reject(event);
                      }
                    };
                  }
            })
        })
        return promise;
    }
    add(data){
        let self = this;
        const promise = new Promise(function(resolve,reject){
            self.PromiseQueue.then(function(){
                var request = self.database.transaction([self.table], 'readwrite')
                .objectStore(self.table)
                .add(data);
            
                request.onsuccess = function (event) {
                    self.result={
                        result :true,
                        code:Code.ExecutionSuccess,
                        event:event,
                        message:'write data success',
                        data:null
                    }
                    resolve(self.result);
                };
                
                request.onerror = function (event) {
                    self.result={
                        result :false,
                        code:Code.ExecutionFailed,
                        exception:event.target,
                        message:'write data failed, please see more details in exception',
                        data:null
                    }
                    reject(self.result)
                }
            })
        })
       
       return promise;
    }
    put(data){
        let self = this;
        const promise = new Promise(function(resolve,reject){
            self.PromiseQueue.then(function(){
                var request = self.database.transaction([self.table], 'readwrite')
                .objectStore(self.table)
                .put(data);
            
                request.onsuccess = function (event) {
                    self.result={
                        result :true,
                        code:getComputedStyle.ExecutionSuccess,
                        event:event,
                        message:'write data success',
                        data:null
                    }
                    resolve(self.result);
                };
                
                request.onerror = function (event) {
                    self.result={
                        result :false,
                        code:Code.ExecutionFailed,
                        exception:event,
                        message:'write data failed',
                        data:null
                    }
                    reject(self.result)
                }
            })
        })
       
       return promise;
    }
    delete(key){
        let self = this;
        const promise = new Promise(function(resolve,reject){
            self.PromiseQueue.then(function(){
                var request = self.database.transaction([self.table], 'readwrite')
                .objectStore(self.table)
                .delete(key);
                request.onsuccess = function (event) {
                    self.result={
                        result :true,
                        code:Code.ExecutionSuccess,
                        event:event.target,
                        message:'Delete data success',
                        data:null
                    }
                    resolve(self.result);
                };
                
                request.onerror = function (event) {
                    self.result={
                        result :false,
                        code:Code.ExecutionFailed,
                        exception:event.target,
                        message:'delete data failed, please see more details in exception',
                        data:null
                    }
                    reject(self.result)
                }
            })
        })
       
       return promise;
    }
}
export {context as dbcontext};