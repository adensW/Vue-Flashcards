<template>
    <div class='column'>
        <div class="borderline">
          <span v-for="i in todo.deeps" :key="i">&nbsp;&nbsp;&nbsp;</span>
          <button v-on:click="$emit('deepsDown',id)">&laquo;</button><button v-on:click="$emit('deepsUp',id)">&raquo;</button>
          <input :value="title" @input="input" v-on:click="$emit('selectToDO',id)"  placeholder="input something">
        </div>
    </div>
</template>
<script>
export default {
  name: "ToDoItem",
  props:['item'],
  data() {
    return {
      todo:this.item,
    };
  },
  computed:{
    id:{
      get:function(){
        return this.todo.id;
      }
    },
    title:{
      // getter
      get: function () {
        return this.todo.title;
      },
      // setter
      set:function(value){
        this.todo.title =value;
      }
    }
  },
  mounted() {},
  methods: {
    self:function(){
      return this._;
    },
    input:self.debounce(function(e){

    }),
      
    update:function(){
        this.$aidb.open("DB_Vue_FlashCard").put("ToDos",this.todo).execude()
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
