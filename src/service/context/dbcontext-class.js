import {} from '@/service/context/dbset'
import { dbset } from './dbset';

class context{
    constructor(dbname,ver){
        if(!window.indexedDB)
        {
            console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.")
            return null;
        }
        this.request=null;
        this._dbname=dbname;
        this._version = ver;
        this.result={
            code:0,
            message:"",
            data:null,
        };
        this.database = null;
        this.transaction = null;
        this.tables=[];
        
    }
    createTable(name,prop){
        let self = this;
        this.open(this._dbname,this._version,"","",function(database){
            console.log(database)
            let objectStore = database.createObjectStore(name, prop);
            console.log(self)
        })
    }
    open(dbname,version,success,error,upgrade){
        let self = this;
        if(dbname!=self._dbname){
            console.log("you are already opened a context instance using name "+self.name);
            return null;
        }
        const request = window.indexedDB.open(dbname,version);
        self.request = request;
        request.onsuccess = function(event){
            self.database = request.result;
            self.result={
                code:1,
                message:'open database success',
                data:null
            }
            if (success && (typeof success === 'function')) {
                success();
            }
            console.log("open success"+new Date())
        };
        request.onerror =function(event){
                self.result={
                    code:-1,
                    message:'open database failed',
                    data:null
                }
                if (error && (typeof error === 'function')) {
                    error();
                }
                console.log("open failed"+new Date())
        }
        request.onupgradeneeded = function(event){
            self.database = event.target.result;
            if (upgrade && (typeof upgrade === 'function')) {
                upgrade(self.database);
            }
            console.log("upgrade"+new Date())
           
        }

    }
    get(){
        let self= this;
        this.open().then(function(){
            var transaction = self.database.transaction(['testdb']);
            var objectStore = transaction.objectStore('testtable2');
            var request = objectStore.get(1);

            request.onerror = function(event) {
                console.log('事务失败');
            };

            request.onsuccess = function( event) {
                if (request.result) {
                    console.log('Name: ' + request.result.name);
                    console.log('Age: ' + request.result.age);
                    console.log('Email: ' + request.result.email);
                } else {
                    console.log('未获得数据记录');
                }
            };
        })
        
    }
    add(){
        var request = this.database.transaction(['testtable'], 'readwrite')
        .objectStore('testtable')
        .add({ id: 1, name: '张三', age: 24, email: 'zhangsan@example.com' });
    
        request.onsuccess = function (event) {
            console.log('数据写入成功');
        };
        
        request.onerror = function (event) {
            console.log('数据写入失败');
        }
    }
    // createTable(name,prop){
    //     let self = this;
    //     self.open(self._dbname,self._version).then(function(){

    //         self.tables.push(new dbset(self.request,name,prop))

    //     })

    //     return self;
    // }

}
export {context as dbcontext};