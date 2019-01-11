<template>
  <div class="sortable-container">
    <a-sortable-bar v-for="todo in todos" :key="todo.id">
      <to-do-item
        :item="todo"
        @deepsUp="deepsUp"
        @deepsDown="deepsDown"
        @toDoChange="toDoChange"
        @deleteTodo="deleteTodo"
      ></to-do-item>
    </a-sortable-bar>

    <a-btn fab @click="add">
      <a-icon>add</a-icon>
    </a-btn>
  </div>
</template>

<script>
import ToDoItem from "./ToDoItem";
import { Sortable } from "@shopify/draggable";
export default {
  name: "ToDo",
  props: ["todos"],
  components: {
    ToDoItem
  },
  data() {
    return {};
  },
  mounted() {
    this.initSortable();
  },
  methods: {
    deleteTodo: function(id) {
      let a = this.todos.find(function(elem) {
        return elem.id == id;
      });
      let b = this.todos.filter(function(elem){
        return elem.sort>a.sort;
      })
      b.forEach(element => {
        element.sort = element.sort-1;
        this.$store.dispatch("updateToDo",element)
      });
      // console.log(b)
      this.$store.dispatch("deleteToDo", a);
      // this.$aidb.open("DB_Vue_FlashCard").delete("ToDos",a).execude().then(
      //   ()=>{
      //     this.$emit('refresh',id);
      //   }
      // )
    },
    toDoChange: function(id) {
      let a = this.todos.find(function(elem) {
        return elem.id == id;
      });
      a.checked = !a.checked;
      this.update(a);
    },
    deepsDown: function(id) {
      let a = this.todos.find(function(elem) {
        return elem.id == id;
      });
      a.deeps = a.deeps - 1 < 0 ? 0 : a.deeps - 1;

      // this.todos.deeps = this.todo.deeps-1<0?0:this.todo.deeps-1
      this.update(a);
    },
    deepsUp: function(id) {
      let a = this.todos.find(function(elem) {
        return elem.id == id;
      });

      let index = this.todos.indexOf(a);

      if (this.todos.length > index && index > 0) {
        //
        let prevDeep = this.todos[index - 1].deeps;
        a.deeps = a.deeps - 1 + 2 > prevDeep + 1 ? a.deeps : a.deeps - 1 + 2;
        // this.todo.deeps = this.todo.deeps+1
        this.update(a);
      }
    },
    update: function(item) {
      this.$store.dispatch("updateToDo", item);
      // this.$aidb.open("DB_Vue_FlashCard").put("ToDos",item).execude()
    },
    add: function() {
      let toDoItem = {
        id: this.$uuid.v1(),
        isChecked: false,
        title: "",
        deeps: 0,
        treeId: 0,
        sort: this.todos.length
      };
      this.todos.push(toDoItem);
      this.$aidb
        .open("DB_Vue_FlashCard")
        .add("ToDos", toDoItem)
        .execude();
    },
    initSortable() {
      const sortable = new Sortable(
        document.querySelectorAll(".sortable-container"),
        {
          draggable: ".sortable-bar"
        }
      );
      sortable.on("sortable:start", response => {});
      sortable.on("sortable:sort", response => {});
      sortable.on("sortable:sorted", response => {});
      sortable.on("sortable:stop", response => {
        let data = response.data;
        let oldIndex = data.oldIndex;
        let newIndex = data.newIndex;
      });
    }
  }
};
</script>

<style>
</style>
