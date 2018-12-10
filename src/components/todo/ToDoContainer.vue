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
      let self = this;

      // let query={id:'1234345346',database:"test"}
      // let queryKeys = Object.keys(query);
      // for (let i = 0; i < queryKeys.length; i++) {
      //   const element = queryKeys[i];
      //   console.log(query[element])  
      // }
      // console.log(queryKeys)
      // this.$aidb.initialize()
      // console.log(this.$aidb.open('test1',1).createTable('1'))
      // console.log(this.$aidb.open('test2',2).createTable('2'))
      // console.log(this.$aidb.open('test3',3).createTable('3'))
      // let request =  window.indexedDB.open('DB_Vue_FlashCard',3)
      // request.onsuccess=function(event){
      //     let database = event.target.result
      //     // console.log(database.transaction(['table.name'], 'readwrite')
      //     //   .objectStore('table.name'))
      //    var request = database.transaction(['Cards','ToDos'], 'readwrite')
      //       .objectStore('Cards')
      //       // .add({ id: self.$uuid.v1(), name: '张三', age: 24, email: 'zhangsan@example.com' });
      //       // .get('1fe28e40-fb8a-11e8-b55f-d5700dffec0a');
      //       .getAll([0,1,3])

      //     request.onsuccess = function (event) {
      //       console.log(request.result);
      //     };

      //     request.onerror = function (event) {
      //       console.log('数据写入失败');
      //     }
      // }
      // request.onupgradeneeded=function(event){
      //   let database = event.target.result;
      //     if (!database.objectStoreNames.contains('table.name')) 
      //     {
      //       let objectStore = database.createObjectStore('table.name',{ keyPath: 'id' });
      //       objectStore.createIndex('name', 'name', { unique: true });
      //     }
           

      // }
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
