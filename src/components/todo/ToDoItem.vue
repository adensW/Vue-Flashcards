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
      <a-btn text @click="deleteTodo">
        <a-icon>delete</a-icon>
      </a-btn>
      <a-btn text @click="focus">
        <a-icon>clear</a-icon>
      </a-btn>
    </div>
    <div class="a-row borderline">
      <div :class="deepcol">&nbsp;</div>
      <div class="a-row" @mousedown="blur" @mouseup="clearcount" :class="inputcol">
        <input
          class="a-col-1"
          type="checkbox"
          :checked="ischecked"
          @change="$emit('toDoChange',id)"
        >
        <input
          class="a-col-22"
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
      <to-do-item
        v-for="todo in sortedChildrenToDos"
        :key="todo.id"
        :item="todo"
        @deepsUp="deepsUp"
        @deepsDown="deepsDown"
        @toDoChange="toDoChange"
        @deleteTodo="deleteTodo"
        @add="add"
        @addToDo="addToDo"
        :depth="curdepth+1"
      ></to-do-item>
    </div>
  </div>
</template>
<script>
import _ from "lodash";
import ToDoItem from "./ToDoItem";
export default {
  name: "ToDoItem",
  components: {
    ToDoItem
  },
  props: ["item", "depth"],
  data() {
    return {
      todo: this.item,
      isblur: false,
      curdepth: this.depth || 0,
      loop: function() {},
      childrenToDos: []
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
    },
    sortedChildrenToDos() {
      let data = this.childrenToDos;
      return data.sort(function(a, b) {
        return a.sort - b.sort;
      });
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init: function() {
      this.$aidb
        .open("DB_Vue_FlashCard")
        .getQuery("ToDos", { parentId: this.todo.id })
        .then(result => {
          if (result) {
            this.childrenToDos = result;
          }
        });
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
    deepsDown: function(cid) {
      if (cid) {
        console.log(cid);
        let op_todo = this.childrenToDos.find(function(elem) {
          return elem.id == cid;
        });
        let startIndex = this.childrenToDos.findIndex(function(elem) {
          return elem.id == cid;
        });
        this.childrenToDos.splice(startIndex, 1);
        op_todo.parentId = this.todo.parentId;
        op_todo.sort = this.todo.sort + 1;
        this.$emit("addToDo", op_todo);
        this.isblur = false;
      } else {
        this.childrenToDos = [];
        this.$emit("deepsDown", this.id);
        this.isblur = false;
      }
    },
    deepsUp: function() {
      if (this.$parent.childrenToDos) {
        let pa = this.$parent.childrenToDos;
        let index = pa.findIndex(elem => {
          return elem.id == this.todo.id;
        });
        if (index > 0) {
          this.todo.sort =
            this.$parent.$children[index - 1].childrenToDos.length || 0;
          this.todo.parentId = this.$parent.$children[index - 1].id;
          this.$aidb
            .open("DB_Vue_FlashCard")
            .put("ToDos", this.todo)
            .execude();
          this.$parent.$children[index - 1].childrenToDos.push(this.todo);
          this.$parent.childrenToDos.splice(index, 1);
        }
      } else{
        console.log(1)
        this.$emit("deepsUp",this.todo.id)
      }
      this.isblur = false;
    },
    addToDo: function(todo) {
      this.childrenToDos.forEach(function(value, index) {
        if (value.sort >= todo.sort) {
          value.sort += 1;
        }
      });

      this.childrenToDos.push(todo);
      this.$aidb
        .open("DB_Vue_FlashCard")
        .put("ToDos", this.childrenToDos)
        .execude();
    },
    add: function(pid) {
      let uid = this.$uuid.v1();
      let toDoItem = {
        id: uid,
        isChecked: false,
        title: "",
        deeps: 0,
        sort: this.childrenToDos.length || 0,
        isFold: false,
        parentId: pid || this.todo.id || 0
      };

      this.childrenToDos.push(toDoItem);
      this.isblur = false;
    },
    toDoChange: function(id) {
      this.$emit("toDoChange", this.id);
    },
    deleteTodo: function(id) {
      if(id){
          let index = this.childrenToDos.findIndex((elem)=>{
          return elem.id==id
        })
        let deleteToDos= this.childrenToDos.splice(index,1);
        this.$aidb
        .open("DB_Vue_FlashCard")
        .delete("ToDos", deleteToDos)
        .execude();
        // this.$store.dispatch("deleteToDo", deleteToDos);
      }else{
        // console.log(this.childrenToDos)
        this.$aidb
        .open("DB_Vue_FlashCard")
        .delete("ToDos", this.childrenToDos)
        .execude();
        this.$emit("deleteTodo", this.id);
      }
    }
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
  /* */
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
