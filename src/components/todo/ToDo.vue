<template>
  <div class="sortable-container a-row">
    <a-sortable-bar v-for="todo in filterTodos" :key="todo.id">
      <to-do-item
        :item="todo"
        @deepsUp="deepsUp"
        @deepsDown="deepsDown"
        @toDoChange="toDoChange"
        @deleteTodo="deleteTodo"
        @add="add"
        @addToDo="addToDo"
        :depth="depth"
      >
        <a-icon
          class="a-cursor--click hoverable--outline"
          v-if="todo.childrenNum>0"
          @click="fold(todo.id)"
        >keyboard_arrow_up</a-icon>
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
      let deleteToDos = [];
      let updateToDos =[];
      let sortNum = 1;
      let startSort = 0;
      let a = this.todos.find(function(elem) {
        return elem.id == id;
      });
      if (a.hasChildren>0) {
        for (let index = 0; index < this.todos.length; index++) {
          const element = this.todos[index];
          let endFlag = false;
          if (element.sort > a.sort && element.deeps > a.deeps && !endFlag) {
            sortNum += 1;
            startSort = element.sort;
            deleteToDos.push(element);
          } else {
            endFlag = true;
          }
        }
      } else {
        deleteToDos.push(a);
      }
      let b = this.todos.filter(function(elem) {
        return elem.sort > startSort;
      });
      b.forEach(element => {
        element.sort = element.sort - sortNum;
        updateToDos.push(element);
      });
      this.$store.dispatch("updateToDo", updateToDos);
      this.$store.dispatch("deleteToDo", deleteToDos);
    },
    toDoChange: function(id) {
      let a = this.todos.find(function(elem) {
        return elem.id == id;
      });
      a.checked = !a.checked;
      this.update(a);
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
      if(cid){
        console.log(cid)
        let op_todo = this.childrenToDos.find(function(elem) {
            return elem.id == cid;
        });
        let startIndex = this.childrenToDos.findIndex(function(elem) {
            return elem.id == cid;
        });
        this.childrenToDos.splice(startIndex,1)
        op_todo.parentId = 0;
        this.$emit("addToDo", op_todo);
        this.isblur = false;
      }
    },
    deepsUp: function(id) {
      let a = this.todos.find(function(elem) {
        return elem.id == id;
      });

      let index = this.todos.indexOf(a);

      let prevDeep = this.todos[index - 1<0?0:index-1].deeps;
        
        let isBottom =a.deeps - 1 + 2 > prevDeep + 1
        if(!isBottom){
          a.deeps = a.deeps- 1 + 2;
          a.deepIds =[...new Set(this.todos[index - 1].deepIds.slice(0,a.deeps))];
          a.deepIds.push(a.id)
          let parentsIds = a.deepIds.slice(0,-1);
          let parentToDos = this.todos.filter(function(val){
             return parentsIds.includes(val.id)
          })

          parentToDos.forEach((val)=>{
            val.childrenIds.push(a.id)
            if(val.childrenIds.length>1){
              
              val.childrenIds=[...new Set(val.childrenIds)]

            }
          })
          
          this.update(parentToDos);
        // this.todo.deeps = this.todo.deeps+1
        this.update(a);
        
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
