import {} from '@/service/context/dbset'

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
        this.database = null;
        this.transaction = null;
        console.log("init")
    }
    createTable(name,prop){
        let self = this;
        this.open(self._dbname,self._version,"","",function(database){
            let objectStore = database.createObjectStore(name, prop);
            
        })
    }
    set(table){
        let self = this;
        let promise = new Promise(function(resolve,reject){
            console.log(self)
        })
        this.PromiseQueue = Promise.all(this.PromiseQueue,promise)
        return self;
    }
    open(dbname,version){
        let self = this;
        if(dbname!=self._dbname){
            console.error("you are already opened a context instance using database name "+self.name);
            return null;
        }
        let promise = new Promise(function(resolve,reject){
            const request = window.indexedDB.open(dbname,version);
            request.onsuccess = function(event){
                self.database = event.target.result;
                self.result={
                    result:false,
                    code:1,
                    message:'open database success',
                    data:null
                }
                resolve();
            };
            request.onerror =function(event){
                    self.result={
                        result:false,
                        code:-1,
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
                    code:-1,
                    message:'last database openning',
                    Exception:event,
                    data:null
                }
                reject();
            }
        })
        this.PromiseQueue.Promise.All(promise);
        return self;
    }
    get(table,id){
        let self= this;
        const promise = new Promise(function(resolve,reject){
            self.open(self._dbname,self._version,function(database){
            var transaction = database.transaction([table]);
            var objectStore = transaction.objectStore(table);
            var request = objectStore.get(id);

            request.onerror = function(event) {
                self.result={
                    result :false,
                    code:20,
                    exception:event,
                    message:'get data failed',
                    data:null
                }
                reject(self.result)
            };

            request.onsuccess = function( event) {
                if (request.result) {
                    self.result={
                        result:true,
                        code:20,
                        event:event,
                        message:'get data success',
                        data:request.result
                    }
                    resolve(self.result);
                    
                } else {
                    self.result={
                        result:true,
                        code:20,
                        message:'transaction execution success but no date return',
                        data:request.result
                    }
                    resolve(self.result);
                }
            };
        })
    })
    return promise;
    }
    getAll(query){}
    add(table,data){
        let self = this;
        const promise = new Promise(function(resolve,reject){
            self.open(self._dbname,self._version,function(database){
                var request = database.transaction([table], 'readwrite')
                .objectStore(table)
                .add(data);
            
                request.onsuccess = function (event) {
                    self.result={
                        result :true,
                        code:10,
                        event:event,
                        message:'write data success',
                        data:null
                    }
                    resolve(self.result);
                };
                
                request.onerror = function (event) {
                    self.result={
                        result :false,
                        code:-10,
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
    put(data,key){

    }
    delete(key){

    }
}
export {context as dbcontext};