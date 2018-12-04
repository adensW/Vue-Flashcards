<template>
    <div class='column'>
        <div class=" borderline">
           <v-icon>arrow_back</v-icon>
       
          <v-icon>arrow_forward</v-icon>
          <input v-model="title"  placeholder="input something">
          </div>
          
    </div>
</template>

<script>
import { dbcontext } from "@/service/context/dbcontext-class.js";

export default {
  name: "ToDoItem",
  props:['item'],
  data() {
    return {
      todo:this.item,
    };
  },
  computed:{
    title:{
       // getter
      get: function () {
        return this.todo.title;
      },
      // setter
      set: function (newValue) {
        this.todo.title = newValue;
        this.update();
      }
    }
  },
  mounted() {},
  methods: {
    update:function(){
        let context= new dbcontext('DB_Vue_FlashCard');
            // carddbcontext.open("DB_Vue_FlashCard",3).createTable("ToDos",{keyPath:'id'});
        context.open("DB_Vue_FlashCard").set("ToDos").put(this.todo)
    }
  }
};
</script>

<style scoped>
@import '/css/size.css';
.borderline{
  border-bottom:1px solid gray;
}
.input:focus{
  outline: none;
}
:focus{
  outline: none;

}
</style>
