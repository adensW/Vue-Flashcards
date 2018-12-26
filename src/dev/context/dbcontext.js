
export let dbcontext={
    _dbname :'null',
    _verison:1,
    
   open:function(dbname,ver){
        console.log(this['_dbname'])
        const promise= new Promise(function(resolve,reject){
            const request = window.indexedDB.open(dbname,ver);
            request.onsuccess = function(event){
                console.log("open success")
                resolve();
            };
            request.onerror =reject;
        })
        return promise;
    },
    createTable:function(name,prop){
        this.open().then(function(name,prop){
            console.log(name);
            console.log(prop);
        }).catch(function(){
            console.log("error")
        })
    }
}
// dbcontext.prototype.init=function(){
//     this.database = db;
//     this.version=ver;
//     console.log(this.database)
//     console.log(this.version)
// }
// dbcontext.prototype.open=function(){
//     console.log('open'+this.database+this.version)
// }