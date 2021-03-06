import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import store from './service/store/store'
import Router from './service/router/router'
import AlloyFinger from 'alloyfinger'
import AlloyFingerPlugin from './plugins/alloyfinger.vue'
import UUID from 'vue-uuid';
import VueAidb from './plugins/aidb/aidb.vue.js'
import atool from './plugins/tools/atinytool.vue.js'
import './assets/css/index.less'
import AdensUI from './components/ui/index.js'
Vue.use(AdensUI);
Vue.use(atool)
Vue.use(VueAidb)
Vue.use(VueResource)
Vue.use(UUID);
Vue.use(AlloyFingerPlugin,{
  AlloyFinger
})

Vue.config.productionTip = false;
// document.addEventListener('deviceready', function() {
  new Vue({
    store,
    router:Router,
    render: h => h(App),
  }).$mount('#app')
//   window.navigator.splashscreen.hide()
// },false)


