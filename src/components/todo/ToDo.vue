<template>
    <div>
        <to-do-item v-for="todo in todos" :key="todo.id" v-bind:item="todo"></to-do-item>
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
  methods: {}
};
</script>

<style>
</style>
