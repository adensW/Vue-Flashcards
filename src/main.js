import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import VueResource from 'vue-resource'
import store from './service/store/store'
import Router from './service/router/router'
import AlloyFinger from 'alloyfinger'
import AlloyFingerPlugin from './plugins/alloyfinger.vue'
import UUID from 'vue-uuid';
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


