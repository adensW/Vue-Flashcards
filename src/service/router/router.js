import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '@/components/dashboard/Dashboard.vue'
import CardList from '@/components/cards/CardList.vue'
import Library from '@/components/library/Library.vue'
import Loading from '@/components/views/Loading.vue'
import Error from '@/components/views/Error.vue'

Vue.use(VueRouter)
const routes=[
    {path:'/',redirect:'/loading'},
    {path:'/loading',component:Loading},
    {path:'/error',component:Error},
    {path:'/index',component:Dashboard},
    {path:'/index/:meta',component:Dashboard},    
    {path:'/card/:id',name:'card',component:CardList},
    {path:'/card',redirect:'/error'},
    {path:'/library',component:Library}
]
export default new VueRouter({
   mode:'history',
   base: __dirname,
    routes
})