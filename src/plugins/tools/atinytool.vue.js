import atool from './atinytool.js'

var tool={};

tool.install=function(Vue){
    Vue.prototype.$tool = atool;
   
}
export default tool;