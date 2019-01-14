<template>
  <div class="sortable-container a-row">
    <a-sortable-bar v-for="todo in filterTodos" :key="todo.id">
      <to-do-item
        :item="todo"
        @deepsUp="deepsUp"
        @deepsDown="deepsDown"
        @toDoChange="toDoChange"
        @deleteTodo="deleteTodo"
      >
      <a-icon v-if="todo.hasChildren" @click="fold(todo.id)">keyboard_arrow_up</a-icon>
      </to-do-item>
    </a-sortable-bar>
    <a-btn fab @click="add">
      <a-icon>add</a-icon>
    </a-btn>
  </div>
</template>

<script>
import ToDoItem from "./ToDoItem";
import { Sortable } from "@shopify/draggable";
import func from './vue-temp/vue-editor-bridge';
export default {
  name: "ToDo",
  props: ["todos"],
  components: {
    ToDoItem,
  },
  data() {
    return {};
  },
  mounted() {
    this.initSortable();
  },
  computed:{
    filterTodos:function(){
      return this.todos.filter(function(val){
        return val.isFold == false;
      })
    }
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
    fold:function(id){
      // let parentTodo =this.todos.filter(function(val){
      //   return val.id===id
      // });
      // let childrenTodo =[];
      // let islast = false;
      // let index = 0
      // while (!islast) {
      //   let elem = this.todos[index]
      //   if(elem.sort>parentTodo.sort)
      //   {
      //     if(elem.deeps<=parentTodo.sort){
      //       islast= true;
      //     }else{
      //       elem.fold = true;
      //       childrenTodo.push(elem);
      //     }
      //   }
      //   index++;
      // }
      // console.log(childrenTodo)

      // this.$store.dispatch('updateToDo',childrenTodo)
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
        this.todos[index - 1].hasChildren = true;
        a.deeps = a.deeps - 1 + 2 > prevDeep + 1 ? a.deeps : a.deeps - 1 + 2;
        // this.todo.deeps = this.todo.deeps+1
        this.update(a);
        this.update(this.todos[index - 1]);

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
        sort: this.todos.length,
        isFold:false,
        hasChildren:false,

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
          draggable: ".sortable-bar",
          handle:".sortable-handle",
          classes:{'mirror':'sortable-bar--drag'}
        }
      );
      sortable.on("sortable:start", response => {});
      sortable.on("sortable:sort", response => {});
      sortable.on("sortable:sorted", response => {});
      sortable.on("sortable:stop", response => {
        console.log(response)
        let data = response.data;
        let oldIndex = data.oldIndex;
        let newIndex = data.newIndex;
        let minIndex = oldIndex < newIndex?oldIndex:newIndex;
        let maxIndex = oldIndex > newIndex?oldIndex:newIndex;
        let reToDos = this.todos.filter(function(val){
          if(oldIndex>newIndex){
            return val.sort>=minIndex&&val.sort<maxIndex;
          }else{
            return val.sort>minIndex&&val.sort<=maxIndex;
          }
        })
        
        let curToDo = this.todos.filter(function(val){
          return val.sort===oldIndex;
        })
        reToDos.forEach(element => {
          if(newIndex<oldIndex){
            element.sort+=1;
          }else{
            element.sort-=1;
          }
        });
        let curPrev = this.todos.filter(function(val){
          return val.sort===newIndex-1;
        })
        console.log(curPrev)
        curToDo[0].sort = newIndex;
        
        this.$store.dispatch("updateToDo",curToDo)
        this.$store.dispatch("updateToDo",reToDos)
        if(oldIndex < newIndex){
          this.redeeps();
        }
      });
    },
    redeeps(){
      let prevDeeps = this.todos[0].deeps;
      let prevToDo = this.todos[0];
      for (let index = 0; index < this.todos.length; index++) {
        if(this.todos[index].sort===0){
          prevDeeps = this.todos[index].deeps;
          this.todos[index].deeps=0;
          prevToDo = this.todos[index];
        }else{
          if(this.todos[index].deeps>prevDeeps){
            prevDeeps = this.todos[index].deeps;
            this.todos[index].deeps = prevToDo.deeps-1+2;
          }else if(this.todos[index].deeps===prevDeeps){
            this.todos[index].deeps = prevToDo.deeps;
          }else{

          }
          prevToDo = this.todos[index];
        }
      }
     
      console.log("redeeps")
    }
  }
};
</script>

<style>
</style>
