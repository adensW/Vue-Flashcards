import {aidb} from './aidb-0.1.1.js'

var VueAidb={};

VueAidb.install=function(Vue,option){
    Vue.prototype.$aidb = aidb();
}
export default VueAidb;