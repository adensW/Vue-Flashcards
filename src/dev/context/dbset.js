export class dbset{
    
    constructor(request,name,prop){
        this.name=name;
        this._schame=null;
        this._table=null;
        this.database = null;
        this.request = request;
        this.create(name,prop);
        return this;
    }
   
    setIndex(name,attr,prop){
        if(!this.isTableExist()){
            return null;
        }

    }
    add(prop){
        if(!this.isTableExist()){
            return null;
        }
        var request = db.transaction([this.name], 'readwrite')
        .objectStore(this.name)
        .add(prop);
    
      request.onsuccess = function (event) {
        console.log('数据写入成功');
      };
    
      request.onerror = function (event) {
        console.log('数据写入失败');
      }
    }
    update(prop){
        if(!this.isTableExist()){
            return null;
        }
    }
    delete(prop){
        if(!this.isTableExist()){
            return null;
        }
    }
    create(name,prop){
        if(!this.isTableExist()){
            return null;
        }
        this.request.onupgradeneeded = function (event) {
            this.database = event.target.result;
            
            if (!this.database.objectStoreNames.contains('person')) {
                this._table = this.database.createObjectStore('person', { keyPath: 'id' });
                console.log(this._table)
            }
          }
        
    }
    isTableExist(){
        if(typeof this._schame==='undefined'){
            return false;
        }
        return true;
    }

}