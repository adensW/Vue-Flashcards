import {aidb} from './aidb-0.1.2.js'

var VueAidb={};

VueAidb.install=function(Vue){
    Vue.prototype.$aidb = aidb();
}
export default VueAidb;