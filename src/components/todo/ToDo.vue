<template>
  <div class="sortable-container a-row">
    
      <to-do-item v-for="todo in filterTodos" :key="todo.id"
        :item="todo"
        @deepsUp="deepsUp"
        @deepsDown="deepsDown"
        @deleteTodo="deleteTodo"
        @add="add"        
        @addToDo="addToDo"
        :depth="depth"
        :ref="todo.id"
      >
        <a-icon
          class="a-cursor--click hoverable--outline"
          v-if="todo.childrenNum>0"
          @click="fold(todo.id)"
        >keyboard_arrow_up</a-icon>
      </to-do-item>
    
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
    ToDoItem,
  },
  data() {
    return {
      depth:0,
    };
  },
  mounted() {
    this.initSortable();
  },
  computed: {
    filterTodos: function() {
      return this.todos.filter(function(val) {
        return val.isFold == false;
      });
    }
  },
  methods: {
    deleteTodo: function(id) {
      if(id){
          let index = this.todos.findIndex((elem)=>{
          return elem.id==id
        })
        let deleteToDos= this.todos.splice(index,1);
        this.$aidb
        .open("DB_Vue_FlashCard")
        .delete("ToDos", deleteToDos)
        .execude();
      }
    },
    fold: function(id) {
      let childrenToDos=[];
      this.$aidb.getQuery("ToDos",{"parentId":id}).then(function(data){
        data.map(function(val){
          childrenToDos.push(val)
        })
      })
      this.$store.dispatch("addStoreToDo", childrenToDos);
    },
    deepsDown: function(id) {
      let a = this.todos.find(function(elem) {
        return elem.id == id;
      });
      a.deeps = a.deeps - 1 < 0 ? 0 : a.deeps - 1;
      let childrenToDos = this.todos.filter(function(val){
        return a.childrenIds.includes(val.id);
      })
      childrenToDos.map(function(val){
        val.deeps-=1;
      });
      this.update(childrenToDos)
      // this.update(ch);
      let parentId = a.deepIds.splice(-2,1)[0];
      let parent = this.todos.find(function(val){
        return val.id == parentId;
      })
      let index =parent.childrenIds.findIndex(function(val){
          return val==a.id;
      })
      parent.childrenIds.splice(index,1);
      this.update(parent)
      // this.todos.deeps = this.todo.deeps-1<0?0:this.todo.deeps-1
      this.update(a);
    },
    deepsUp: function(id) {
      let cur = this.todos.find(function(elem) {
        return elem.id == id;
      });
      if(cur.sort>0){
        let prev = this.todos.find(function(elem){
          return elem.sort == (cur.sort-1)
        })
        cur.parentId = prev.id;
        cur.sort = this.$refs[prev.id][0].childrenToDos.length||0;
        this.update(cur);
        this.$refs[prev.id][0].childrenToDos.push(cur);
        this.$store.dispatch("deleteToDoLogic", cur);
      }
    },
    update: function(item) {
      this.$store.dispatch("updateToDo", item);
      // this.$aidb.open("DB_Vue_FlashCard").put("ToDos",item).execude()
    },
    addToDo:function(todo){
          this.$aidb.open("DB_Vue_FlashCard").put("ToDos",todo).execude()
          this.todos.push(todo);
        },
    add: function(pid) {
          let uid =this.$uuid.v1();
            let toDoItem = {
              id: uid,
                isChecked: false,
                title: "",
                deeps: 0,
                sort: this.todos.length,
                isFold: false,
                parentId:pid||0,
              };
         
        if(pid){
          let parent= this.todos.find(function(val){
              return val.id = pid  
          })
          toDoItem.sort=parent.childrenNum;
          toDoItem.deeps = parent.deeps+1;
          parent.childrenNum += 1;
          this.$store.dispatch('updateToDo',parent)
        }
        this.$store.dispatch('addToDo',toDoItem)
    },
    initSortable() {
      const sortable = new Sortable(
        document.querySelectorAll(".sortable-container"),
        {
          draggable: ".sortable-bar",
          handle: ".sortable-handle",
          classes: { mirror: "sortable-bar--drag" }
        }
      );
      // sortable.on("sortable:start", response => {
      //   let index = response.data.startIndex;
      //   // console.log(index);
      // });
      // sortable.on("sortable:sort", response => {});
      // sortable.on("sortable:sorted", response => {});
      sortable.on("sortable:stop", response => {
        let data = response.data;
        let oldIndex = data.oldIndex;
        let newIndex = data.newIndex;
        let minIndex = oldIndex < newIndex ? oldIndex : newIndex;
        let maxIndex = oldIndex > newIndex ? oldIndex : newIndex;
        let reToDos = this.todos.filter(function(val) {
          if (oldIndex > newIndex) {
            return val.sort >= minIndex && val.sort < maxIndex;
          } else {
            return val.sort > minIndex && val.sort <= maxIndex;
          }
        });

        let curToDo = this.todos.filter(function(val) {
          return val.sort === oldIndex;
        });
        reToDos.forEach(element => {
          if (newIndex < oldIndex) {
            element.sort += 1;
          } else {
            element.sort -= 1;
          }
        });
        // let curPrev = this.todos.filter(function(val) {
        //   return val.sort === newIndex - 1;
        // });
        curToDo[0].sort = newIndex;

        this.$store.dispatch("updateToDo", curToDo);
        this.$store.dispatch("updateToDo", reToDos);
        if (oldIndex < newIndex) {
          this.redeeps();
        }
      });
    },
    redeeps() {
      let prevDeeps = this.todos[0].deeps;
      let prevToDo = this.todos[0];
      for (let index = 0; index < this.todos.length; index++) {
        if (this.todos[index].sort === 0) {
          prevDeeps = this.todos[index].deeps;
          this.todos[index].deeps = 0;
          prevToDo = this.todos[index];
        } else {
          if (this.todos[index].deeps > prevDeeps) {
            prevDeeps = this.todos[index].deeps;
            this.todos[index].deeps = prevToDo.deeps - 1 + 2;
          } else if (this.todos[index].deeps === prevDeeps) {
            this.todos[index].deeps = prevToDo.deeps;
          }
          prevToDo = this.todos[index];
        }
      }
    }
  }
};
</script>

<style>
</style>
