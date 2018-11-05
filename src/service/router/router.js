import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '@/components/dashboard/Index.vue'
import cardlist from '@/components/cards/Index.vue'
import Library from '@/components/library/Index.vue'
import Loading from '@/components/views/Loading.vue'
import Error from '@/components/views/Error.vue'

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