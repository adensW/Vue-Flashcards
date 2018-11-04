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

import CardList from './components/CardDetail/CardList'
import AdenBtnNew from './components/button/AdenBtnNew'
import {dbcontext} from './service/context/dbcontext-class.js'

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
      //init Sets
      let carddbcontext= new dbcontext('DB_Vue_FlashCard');
      carddbcontext.open("DB_Vue_FlashCard").set("Cards").getQuery([2,3],1).then(function(data){
          console.log(data);
      }).catch(function(data){
          console.log(data)
      })
      // carddbcontext.open("DB_Vue_FlashCard").set("Cards").add([{
      //   id:1,front:'front_1',back:'back_1',comment:'comment_1',setId:0
      //   },{
      //   id:2,front:'front_1',back:'back_1',comment:'comment_1',setId:0
      //   },{id:3,front:'front_1',back:'back_1',comment:'comment_1',setId:0

      //   }]);
      
      //create database
      // let carddbcontext= new dbcontext('DB_Vue_FlashCard');
      // carddbcontext.open('DB_Vue_FlashCard',1);
      // carddbcontext.open('DB_Vue_FlashCard',1).createTable("Cards",{keyPath:'id'});
      // carddbcontext.open('DB_Vue_FlashCard',2).createTable("Sets",{keyPath:'id'});
      // seed data
      // let result = carddbcontext.open('DB_Vue_FlashCard').set("Cards").add(
      //           {id:0,front:'front_0',back:'back_0',comment:'comment_0',setId:0}
      //           )
      //           carddbcontext.open('DB_Vue_FlashCard').set("Cards").add(
      //           {id:1,front:'front_1',back:'back_1',comment:'comment_1',setId:0}
      //           )
      //           carddbcontext.open('DB_Vue_FlashCard').set("Cards").add(
      //           {id:2,front:'front_2',back:'back_2',comment:'comment_2',setId:0}
      //           )
      //           carddbcontext.open('DB_Vue_FlashCard').set("Cards").add(
      //           {id:3,front:'front_3',back:'back_3',comment:'comment_3',setId:1}
      //           )
      //           carddbcontext.open('DB_Vue_FlashCard').set("Cards").add(
      //           {id:4,front:'front_4',back:'back_4',comment:'comment_4',setId:1}
      //           )
      // let a = carddbcontext.open('DB_Vue_FlashCard').set("Sets").add(
      //           {id:0,name:'English',details:'for English word remember'});
      // a.then(function(){})
      // carddbcontext.open('DB_Vue_FlashCard').set("Sets").add(
      //           {id:1,name:'Internet',details:'For Internet acknowledge'});
      // carddbcontext.open('DB_Vue_FlashCard').set("Sets").add(
      //           {id:2,name:'MySQL',details:'For Database acknowledge'});
      // carddbcontext.open('DB_Vue_FlashCard').set("Sets").add(
      //           {id:3,name:'Poem',details:'For some awosome poem'})
      
      }
  }
}
</script>
<style>
html{
  font-size: 2vw;
}
</style>
