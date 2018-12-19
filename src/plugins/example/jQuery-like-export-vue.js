import {default as jQ} from './jQuery-like-export.js'

var vjQ={};

vjQ.install=function(Vue){
    Vue.prototype.$tool = jQ;
   
}
export default vjQ;