import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '@/components/CardDashboard/Dashboard.vue'
import cardlist from '@/components/CardDetail/CardList.vue'
import Library from '@/components/Library/Library.vue'
import Loading from '@/components/CardDashboard/Loading.vue'
import Error from '@/components/Views/Error.vue'

Vue.use(VueRouter)
const routes=[
    {path:'/',redirect:'/loading'},
    {path:'/loading',component:Loading},
    {path:'/error',component:Error},
    {path:'/index',component:Dashboard},
    {path:'/index/:meta',component:Dashboard},    
    {path:'/card/:id',name:'card',component:cardlist},
    {path:'/card',redirect:'/error'},
    {path:'/library',component:Library}
]
export default new VueRouter({
   mode:'history',
   base: __dirname,
    routes
})