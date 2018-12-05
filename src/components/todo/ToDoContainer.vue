<template>
    <div>
        
        <div class='block block__60'>
            <to-do-content></to-do-content>
        </div>
        <div class='block block__40'>
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
      list: [
      ]
    };
  },
  created(){
      this.init();
  },
  mounted() {},
  methods: {
      update:function(val){
          console.log(val)
            let context= new dbcontext('DB_Vue_FlashCard');
            // carddbcontext.open("DB_Vue_FlashCard",3).createTable("ToDos",{keyPath:'id'});
            context.open("DB_Vue_FlashCard").set("ToDos").put(val)
      },
      add:function(){
          let toDoItem = {
              id:this.$uuid.v1(),
              checked:false,
              title:"",
              deeps:0,
              treeId:0,
              sort:this.currentSort}
            this.list.push(toDoItem);
            let context= new dbcontext('DB_Vue_FlashCard');
            // carddbcontext.open("DB_Vue_FlashCard",3).createTable("ToDos",{keyPath:'id'});
            context.open("DB_Vue_FlashCard").set("ToDos").add(toDoItem)
      },
      init:function(){
            // let result = this.$aidb.open('test',1).createTable('tablename1',{keyPath:'id'});
            // let result2 = this.$aidb.open('test',2).createTable('tablename2',{keyPath:'id'});
            // let result3 = this.$aidb.open('test',3).createTable('tablename3',{keyPath:'id'});
            // // console.log(result2)
            // this.$aidb.open('test',4).set("tablename4").add({id:1,value:"test"});
            // this.$aidb.open('_config',1).createTable('_params',{keyPath:'id'})
            this.$aidb.open('test',4).set('tablename4').get({val:"test"},2).then(function(data){
                console.log(data)
            })
            // this.$aidb.set("tablename4").add([{id:2,value:"test"},{id:3,value:"test"},{id:4,value:"test"},{id:5,value:"test"}])
        //   let result2 = this.$aidb.open('test').createTable('tablename2',{keyPath:'id'});
        //   console.log(result2)
        //   console.log(this.$aidb)

        //   let self = this;
        //   let context= new dbcontext('DB_Vue_FlashCard');
        //     // context.open("DB_Vue_FlashCard",3).createTable("ToDos",{keyPath:'id'});
        //     context.open("DB_Vue_FlashCard").set("ToDos").getAll().then(function(data){
        //         self.list = data;
        //     })
            // let result =  context.open("DB_Vue_FlashCard").hasTable("ToDos");
            // console.log(result)
      }
  },
  computed:{
      SortedTodos:function(){
          let data = this.list;
          return data.sort(function(a,b){return a.sort-b.sort});
      },
      currentSort:function(){
          return this.list.length
      },
      
  }
};
</script>

<style scoped>
.block{
    float: left;
}
.block__60{
    width: 60%;
}
.block__40{
    width: 40%;
}
.block:after{
    clear:both;
}
</style>
