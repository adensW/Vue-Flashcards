import {} from '@/service/context/dbset'
export class dbcontext{
    constructor(){
        
    }
    open(db,ver){
        this.version = ver;
        
        let request = window.indexedDB.open(db,ver);
        request.onsuccess = function(event){
            this.database= request.result;
        }
        request.onerror = (event)=>{
           this.database = {
                code:-100,
                message:'open database failed',
                value:event,
            }
        } 
        this.database = request ;
        return this.database;
    }
    createSchame(name,prop){

    }
    
}