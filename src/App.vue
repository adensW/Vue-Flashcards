<template>
  <div>
    <a-drawer :drawer="drawer">
      <a-list>
        <label class="a-menu-toggle" @click="drawer=!drawer">
            <a-icon v-if="!drawer">menu</a-icon>
            <a-icon v-if="drawer">clear</a-icon>
        </label>
        <a-list-item v-for="item in items" :key="item.title">
            <a-icon>{{item.icon}}</a-icon>
            <router-link :to="item.path">{{item.title}}</router-link>
        </a-list-item>
      </a-list>
    </a-drawer>
    <!-- <a-nav></a-nav> -->
    <a-mask :toggle="drawer"></a-mask>
    <div class='a-container'>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import CardList from './components/cards/CardList'
import ADrawer from './components/ui/layout/ADrawer'
import AList from './components/ui/layout/AList'
import AListItem from './components/ui/layout/AListItem'
import AMask from './components/ui/popup/AMask'
import ANav from './components/ui/layout/ANav'
export default {
  name: 'App',
  components: {
    CardList,
    ADrawer,
    AList,
    AListItem,
    AMask,
    ANav
  },
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
        icon: 'dashboard',
        title: 'index',
        path:"/index"
      },
      {
        icon:'cloud_download',
        title:'library',
        path:'/library'
      },
      {
        icon:'cloud_download',
        title:'ToDo',
        path:'/ToDo'
      },
       {
        icon:'settings',
        title:'setting',
        path:'/setting'
      }, {
        icon:'close',
        title:'close',
        path:'/close'
      }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  created(){
    this.init()
    // 
  },
  methods:{
    init:function(){
        // this.seedData();
      },
    },
  computed:{
    CurrentYear:function(){
      return new Date().getFullYear();
    }
  }
    
}
</script>
<style>
html{
  font-size: 2vw;
}
body{
  overflow-x: hidden;
  margin:0px;
}

</style>
