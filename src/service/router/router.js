import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '@/components/CardDashboard/Dashboard.vue'
import cardlist from '@/components/CardDetail/CardList.vue'
import Library from '@/components/Library/Library.vue'
Vue.use(VueRouter)
const routes=[
    {path:'/',redirect:'/index'},
    {path:'/index',component:Dashboard},
    {path:'/card/:id',name:'card',component:cardlist},
    {path:'/library',component:Library}
]
export default new VueRouter({
   mode:'history',
   base: __dirname,
    routes
})