<template>
    <div class='column'>
        <div class="borderline">
          <span v-for="i in todo.deeps" :key="i">&nbsp;</span>
          <button v-on:click="deepsDown">L</button><button v-on:click="deepsUp">R</button>
          <input v-model="title" v-on:click="$emit('selectToDO',id)"  placeholder="input something">
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
      set: function (newValue) {
        this.todo.title = newValue;
        this.update();
      }
    }
  },
  mounted() {},
  methods: {
    deepsDown:function(){
      this.todo.deeps = this.todo.deeps-1<0?0:this.todo.deeps-1
      this.update()
    },
     deepsUp:function(){
      this.todo.deeps = this.todo.deeps+1
      this.update()
    },
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
