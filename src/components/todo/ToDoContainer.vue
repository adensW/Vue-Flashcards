<template>
    <div>
        <div class='block block__60'>
            <to-do-content></to-do-content>
        </div>
        <div class='block block__40'>
            <to-do v-bind:todos="SortedTodos"></to-do>
        </div>
        <i><v-btn float fab color='#1f7cda' v-on:click="add"><v-icon dark>add</v-icon></v-btn></i>
    </div>

</template>

<script>
import ToDo from "./ToDo";
import ToDoContent from "./ToDoContent";
export default {
  name: "ToDoContainer",
  components: {
    ToDo,
    ToDoContent
  },
  data() {
    return {
      list: [
        {
          id: 1,
          title:'test1',
          checked: false,
          deeps:0,
          treeId: 0,
          sort:1
        },
         {
          id: 2,
          title:'test2',
          checked: false,
          deeps:0,
          treeId: 0,
          sort:0
        }
      ]
    };
  },
  mounted() {},
  methods: {
      add:function(){
          this.list.push({
              id:this.currentSort+1,
              checked:false,
              title:"",
              deeps:0,
              treeId:0,
              sort:this.currentSort})
      }
  },
  computed:{
      SortedTodos:function(){
          let data = this.list;
          return data.sort(function(a,b){return a.sort-b.sort});
      },
      currentSort:function(){
          return this.list.length
      }
  }
};
</script>

<style scoped>
.block{
    float: left;
}
.block__60{
    width: 60%;
}
.block__40{
    width: 40%;
}
.block:after{
    clear:both;
}
</style>
