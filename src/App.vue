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
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
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
     
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
     
    </v-toolbar>
    <v-content>
      <adencontent/>
    </v-content>

    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld'
import adencontent from './components/aden-content'

export default {
  name: 'App',
  components: {
    adencontent
  },
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      },{
        icon:'settings',
        title:'setting'
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Flashcards'
    }
  }
}
</script>
