import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import VueResource from 'vue-resource'
import VueRoute from 'vue-route'
import store from './service/store'
Vue.use(VueResource)
Vue.use(VueRoute)
Vue.config.productionTip = false
new Vue({
  store,
  render: h => h(App),
}).$mount('#app')

