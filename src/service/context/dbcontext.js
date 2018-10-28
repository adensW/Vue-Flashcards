
export function dbcontext(db,ver){
    this.database=db;
    this.version=ver;
    this.init=function(db,ver){
        this.database = db;
    this.version=ver;
    console.log(this.database)
    console.log(this.version)
        
    };
    this.open=function(){
        console.log('open'+this.database+this.version)
        
    };
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