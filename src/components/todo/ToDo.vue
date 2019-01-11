<template>
    <div>
        <to-do-item 
          v-for="todo in todos" 
          :key="todo.id" 
          v-bind:item="todo"
          v-on:deepsUp='deepsUp'
          v-on:deepsDown='deepsDown'
          @toDoChange='toDoChange'></to-do-item>
        <a-btn fab v-on:click="add"><a-icon>add</a-icon></a-btn>
    </div>
</template>

<script>
import ToDoItem from "./ToDoItem";
export default {
  name: "ToDo",
  props:['todos'],
  components: {
    ToDoItem
  },
  data() {
    return {
    };
  },
  mounted() {},
  methods: {
    toDoChange:function(id){
        let a = this.todos.find(function(elem){
        return elem.id == id;
      })
      a.checked=!a.checked;
      this.update(a)
    },
     deepsDown:function(id){
        let a = this.todos.find(function(elem){
        return elem.id == id;
      })
      a.deeps=a.deeps-1<0?0:a.deeps-1;
      
      // this.todos.deeps = this.todo.deeps-1<0?0:this.todo.deeps-1
      this.update(a)
    },
     deepsUp:function(id){

       let a = this.todos.find(function(elem){
        return elem.id == id;
      })
      
      let index = this.todos.indexOf(a);
      
      if(this.todos.length>index&&index>0){
        //
        let prevDeep= this.todos[index-1].deeps;
        a.deeps=a.deeps-1+2>prevDeep+1?a.deeps:a.deeps-1+2;
        // this.todo.deeps = this.todo.deeps+1
        this.update(a)
      }
      
    },
    update:function(item){
        this.$aidb.open("DB_Vue_FlashCard").put("ToDos",item).execude()
    },
    add:function(){
      let toDoItem = {
              id:this.$uuid.v1(),
              isChecked:false,
              title:"",
              deeps:0,
              treeId:0,
              sort:this.todos.length}
            this.todos.push(toDoItem);
            this.$aidb.open("DB_Vue_FlashCard").add("ToDos",toDoItem).execude();
    }
  }
};
</script>

<style>
</style>
