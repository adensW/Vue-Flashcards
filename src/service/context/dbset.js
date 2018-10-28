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
            this.schame = this.database.createObjectStore(name, prop)
        }
    }
    isSchameExist(){
        if(Object.keys(this.database).length === 0||typeof this.database==='undefined'){
            return false;
        }
        return true;
    }

}