import {} from '@/service/context/dbset'
class context{
    constructor(dbname,ver){
        if(!window.indexedDB)
        {
            console.error("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.")
            return null;
        }
        this.request=null;
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
       
        
    }
    createTable(name,prop){
        let self = this;
        this.open(self._dbname,self._version,"","",function(database){
            let objectStore = database.createObjectStore(name, prop);
            
        })
    }
    open(dbname,version,success,error,upgrade){
        let self = this;
        if(dbname!=self._dbname){
            console.error("you are already opened a context instance using name "+self.name);
            return null;
        }
        const request = window.indexedDB.open(dbname,version);
        self.request = request;
        request.onsuccess = function(event){
            self.database = event.target.result;
            self.result={
                result:false,
                code:1,
                message:'open database success',
                data:null
            }
            if (success && (typeof success === 'function')) {
                success(self.database);
            }
        };
        request.onerror =function(event){
                self.result={
                    result:false,
                    code:-1,
                    message:'open database failed',
                    Exception:event,
                    data:null
                }
                if (error && (typeof error === 'function')) {
                    error();
                }
        }
        request.onupgradeneeded = function(event){
            self.database = event.target.result;
            if (upgrade && (typeof upgrade === 'function')) {
                upgrade(self.database);
            }
        }

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
}
export {context as dbcontext};