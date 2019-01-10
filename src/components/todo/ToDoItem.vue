<template>
    <div class='a-row borderline'>
      <div :class="deepcol">&nbsp;</div>
      <div class="hover-btn-bar" :class="buttoncol">
        <button v-on:click="$emit('deepsDown',id)">
          &lt;
          </button>
        <button v-on:click="$emit('deepsUp',id)">
          &gt;
          </button>
      </div>
      <div class="hover-blur" @hover="blur" :class="inputcol">
        <input :value="title" @input="input" @click="click"  placeholder="input something">
      </div>
    </div>
</template>
<script>
import _ from 'lodash'
export default {
  name: "ToDoItem",
  props:['item'],
  data() {
    return {
      todo:this.item,
    };
  },
  watch:{
    item:function(val){
      this.todo = val;
    }
  },
  computed:{
    deepcol(){
        let classList = [`a-col-${this.item.deeps}`];
        return classList;
    },
    buttoncol(){
        let classList = [`a-col-2`];
        return classList;
    },
    inputcol(){
        let classList = [`a-col-${24-2-this.item.deeps}`];
        return classList;
    },
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
    blur:function(){
      
    },
    input:_.debounce(function(e){
        this.title = e.target.value;
        this.update();
      },300),
    click:function(){
      this.$store.dispatch("changeDetail",this.todo)
    },
    update:function(){
        this.$store.dispatch("updateToDo",this.todo)
        // this.$aidb.open("DB_Vue_FlashCard").put("ToDos",this.todo).execude()
    }
  }
};
</script>
<style scoped>
.a-blur--hover{
  filter: blur(10px);
  pointer-events: none;
}
.a-blur--bar{
  position: absolute;
  width: 100%;
  /* pointer-events: none; */
}
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
