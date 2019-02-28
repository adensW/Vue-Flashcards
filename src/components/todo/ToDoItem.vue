<template>
  <div class="a-row">
    <div class="a-bar--float" v-if="isblur">
      <a-btn text @click="deepsDown">
        <a-icon>arrow_back_ios</a-icon>
      </a-btn>
      <a-btn text @click="add">
        <a-icon>add</a-icon>
      </a-btn>
      <a-btn text @click="deepsUp">
        <a-icon flip>arrow_back_ios</a-icon>
      </a-btn>
      <a-btn text @click="$emit('deleteTodo',id)">
        <a-icon>delete</a-icon>
      </a-btn>
      <a-btn text @click="focus">
        <a-icon>clear</a-icon>
      </a-btn>
    </div>
    <div class="a-row borderline">
      <div :class="deepcol">&nbsp;</div>
      <div @mousedown="blur" @mouseup="clearcount" :class="inputcol">
        <input type="checkbox" :checked="ischecked" @change="$emit('toDoChange',id)">
        <input
          :value="title"
          @input="input"
          @click="click"
          :readonly="isblur"
          placeholder="input something"
        >
      </div>
      <slot></slot>

    </div>
    <div>
      <to-do-item v-for="todo in childrenToDos" :key="todo.id"
        :item="todo"
        @deepsUp="deepsUp"
        @deepsDown="deepsDown"
        @toDoChange="toDoChange"
        @deleteTodo="deleteTodo"
        @add="add"
        :depth="curdepth+1"
      >

      </to-do-item>
    </div>
  </div>
</template>
<script>
import _ from "lodash";
import ToDoItem from "./ToDoItem"
export default {
  name: "ToDoItem",
  components:{
    ToDoItem
  },
  props: ["item","depth"],
  data() {
    return {
      todo: this.item,
      isblur: false,
      curdepth:this.depth||0,
      loop: function() {},
      childrenToDos:[],
    };
  },
  watch: {
    item: function(val) {
      this.todo = val;
    }
  },
  computed: {
    deepcol() {
      let classList = [
        `a-col-${this.curdepth}`,
        `a-col-lg-${this.curdepth}`,
        `a-col-md-${this.curdepth}`,
        `a-col-sm-${this.curdepth}`,
        `a-col-xs-${this.curdepth}`
      ];
      return classList;
    },
    buttoncol() {
      let classList = [
        `a-col-2`,
        `a-col-lg-2`,
        `a-col-md-2`,
        `a-col-sm-2`,
        `a-col-xs-2`
      ];
      return classList;
    },
    inputcol() {
      let classList = [
        `a-col-${24 - 2 - this.curdepth}`,
        `a-col-lg-${24 - 2 - this.curdepth}`,
        `a-col-md-${24 - 2 - this.curdepth}`,
        `a-col-sm-${24 - 2 - this.curdepth}`,
        `a-col-xs-${24 - 2 - this.curdepth}`
      ];
      if (this.isblur) {
        classList.push(`a-blur--hover`);
      }
      return classList;
    },
    id: {
      get: function() {
        return this.todo.id;
      }
    },
    title: {
      // getter
      get: function() {
        return this.todo.title;
      },
      // setter
      set: function(value) {
        this.todo.title = value;
      }
    },
    ischecked: function() {
      return this.todo.checked;
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init:function(){
      this.$aidb.open("DB_Vue_FlashCard")
        .getQuery("ToDos",{"parentId":this.todo.id}).then(result=>{
          if(result){
            this.childrenToDos = result;
          }
        })
    },
    clearcount: function() {
      clearTimeout(this.loop);
    },
    focus: function() {
      clearTimeout(this.loop);
      this.isblur = false;
    },
    blur: function() {
      clearTimeout(this.loop);
      this.setloop();
    },
    setloop: function() {
      if (!this.isblur) {
        this.loop = setTimeout(() => {
          this.isblur = true;
        }, 1000);
      }
    },
    input: _.debounce(function(e) {
      this.title = e.target.value;
      this.update();
    }, 300),
    click: function() {
      this.$store.dispatch("changeDetail", this.todo);
    },
    update: function() {
      this.$store.dispatch("updateToDo", this.todo);
      // this.$aidb.open("DB_Vue_FlashCard").put("ToDos",this.todo).execude()
    },
    deepsDown: function() {
      this.$emit("deepsDown", this.id);
      this.isblur = false;
    },
    deepsUp: function() {
      this.$emit("deepsUp", this.id);
      this.isblur = false;
    },
    add: function(pid) {
      let uid =this.$uuid.v1();
        let toDoItem = {
          id: uid,
            isChecked: false,
            title: "",
            deeps: 0,
            sort: this.todo.length||0,
            isFold: false,
            parentId:pid||this.todo.id||0,
          };
         
        if(pid){
          let parent= this.todos.find(function(val){
              return val.id = pid  
          });
          toDoItem.sort=parent.childrenNum;
          toDoItem.deeps = parent.deeps+1;
          parent.childrenNum += 1;
          this.$store.dispatch('updateToDo',parent);
        }
        this.$store.dispatch('addToDo',toDoItem);
        this.isblur = false;
    },
    toDoChange: function(id) {
      this.$emit("toDoChange", this.id);
    },
    deleteTodo: function(id) {
      this.$emit("deleteTodo", this.id);
    },
  }
};
</script>
<style scoped>
.a-blur--hover {
  filter: blur(2px);
  pointer-events: none;
}
.a-bar--float {
  position: absolute;
  z-index: 3;
}
.borderline {
  /* border-bottom:1px solid gray; */
  height: 36px;
  line-height: 36px;
  z-index: 2;
}
.input:focus {
  outline: none;
}
:focus {
  outline: none;
}
</style>
