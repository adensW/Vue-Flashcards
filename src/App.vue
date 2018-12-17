<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
      :stateless='true'
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
          :to="{path:item.path}"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
     
    </v-toolbar>
    <v-content>
        <v-container> 
          <router-view></router-view> 
        </v-container>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld'

import CardList from './components/cards/CardList'
import AdenBtnNew from './components/button/AdenBtnNew'

export default {
  name: 'App',
  components: {
    CardList,
    AdenBtnNew
   
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
       
    }
}
</script>
<style>
html{
  font-size: 2vw;
}
body{
  overflow-x: hidden;
}
</style>
