<template>
  <div>
    <div class="block block__60">
      <to-do-content></to-do-content>
    </div>
    <div class="block block__40">
      <to-do v-bind:todos="SortedTodos"></to-do>
    </div>
  </div>
</template>

<script>
import ToDo from "./ToDo";
import ToDoContent from "./ToDoContent";
import { dbcontext } from "@/service/context/dbcontext-class.js";
// import {aidb} from "@/service/context/context-0.1.1.js"
export default {
  name: "ToDoContainer",
  components: {
    ToDo,
    ToDoContent
  },
  data() {
    return {
      list: []
    };
  },
  created() {
    this.init();
    this.init2();
  },
  mounted() {},
  methods: {
    update: function(val) {
      console.log(val);
      let context = new dbcontext("DB_Vue_FlashCard");
      // carddbcontext.open("DB_Vue_FlashCard",3).createTable("ToDos",{keyPath:'id'});
      context
        .open("DB_Vue_FlashCard")
        .set("ToDos")
        .put(val);
    },
    add: function() {
      let toDoItem = {
        id: this.$uuid.v1(),
        checked: false,
        title: "",
        deeps: 0,
        treeId: 0,
        sort: this.currentSort
      };
      this.list.push(toDoItem);
      let context = new dbcontext("DB_Vue_FlashCard");
      // carddbcontext.open("DB_Vue_FlashCard",3).createTable("ToDos",{keyPath:'id'});
      context
        .open("DB_Vue_FlashCard")
        .set("ToDos")
        .add(toDoItem);
    },
    init: function() {
      // this.$aidb.initialize()
      console.log(this.$aidb.open('test1',1))
      console.log(this.$aidb.open('test2',2))
      console.log(this.$aidb.open('test3',3))
    },
    init2:function(){
       console.log(this.$aidb.open('test4',3))
    },
    seedData:function(){
        // this.$aidb
        // .open("_config", 1).createTable('_params');
        this.$aidb
        .open("_config", 1)
        .set("_params")
        .add([
          {
            id: 1,
            data: { database: "_config", tables: ["_params"], version: 1 }
          },
          {
            id: 2,
            data: [
              {
                database: "test",
                tables: [
                  "tablename1",
                  "tablename2",
                  "tablename3",
                  "tablename4"
                ],
                version: 4
              }
            ]
          }
        ]);
    }
  },
  computed: {
    SortedTodos: function() {
      let data = this.list;
      return data.sort(function(a, b) {
        return a.sort - b.sort;
      });
    },
    currentSort: function() {
      return this.list.length;
    }
  }
};
</script>

<style scoped>
.block {
  float: left;
}
.block__60 {
  width: 60%;
}
.block__40 {
  width: 40%;
}
.block:after {
  clear: both;
}
</style>
