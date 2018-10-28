export class dbset{
    
    constructor(db,name,prop){
        this.schame=null;
        this.database = db;
        return this;
    }
   
    setIndex(name,attr,prop){

    }
    add(prop){

    }
    update(prop){

    }
    delete(prop){

    }
    create(name,prop){
        if(!this.isSchameExist()){
            return null;
        }
        if(!this.database.objectStoreNames.contains(name)){
            this.schame = database.createObjectStore(name, prop)
        }
    }
    isSchameExist(){
        if(typeof this.database===null||typeof this.database==='undefined'){
            return false;
        }
        return true;
    }

}