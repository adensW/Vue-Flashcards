import lodash from 'lodash'

var Lodash={};

Lodash.install=function(Vue,option){
    Vue.prototype._ = lodash;
}
export default Lodash;