import _ from 'lodash'

var Lodash={};

Lodash.install=function(Vue){
    // Vue.prototype._ = lodash;
    Vue.mixin({
        methods: {
            _() {
                return _;
            }
        }
    });
}
export default Lodash;