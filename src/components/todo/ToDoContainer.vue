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
// import {aidb} from "@/plugins/aidb/aidb-0.1.2.js"
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
      // let self = this;
      // this.$aidb.reset()
      // this.$aidb.open('test').put('testtable',{id:this.$uuid.v1(),value:"test666"},"0f30d1c0-fe95-11e8-96ac-2d1a4062fcb3")
      // this.$aidb.open('test').put('testtable',{id:2,value:"test册谔谔谔"})
      //  let a =this.$aidb.execude().then(function(){
      // })
      this.$aidb.open('aidb_default').get('aidb_params',{'database':'aidb_defaul'}).then(function(result){
        console.log(result);
      })
      
    },
    init2:function(){
      //  console.log(this.$aidb.open('test4',3))
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
