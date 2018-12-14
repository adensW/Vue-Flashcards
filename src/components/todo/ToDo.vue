<template>
    <div>
        <to-do-item 
          v-for="todo in todos" 
          :key="todo.id" 
          v-bind:item="todo"
          v-on:selectToDO="$emit('selectToDO',$event)"></to-do-item>
        <i><v-btn float fab color='#1f7cda' v-on:click="add"><v-icon dark>add</v-icon></v-btn></i>
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
    add:function(){
      let toDoItem = {
              id:this.$uuid.v1(),
              checked:false,
              title:"",
              deeps:0,
              treeId:0,
              sort:this.todos.length}
            this.todos.push(toDoItem);
            this.$aidb.open("DB_Vue_FlashCard").add("ToDos",toDoItem)
    }
  }
};
</script>

<style>
</style>
