<template>
<div>
   <div class="a-bar--float" v-if="isblur">
     
        <a-btn text v-on:click="deepsDown">
        <a-icon>arrow_back_ios</a-icon>  
        </a-btn>
        <a-btn text v-on:click="deepsUp">
          <a-icon flip>arrow_back_ios</a-icon>
        </a-btn>
        <a-btn text v-on:click="focus">
          <a-icon>clear</a-icon>
        </a-btn>
    </div>
    <div class='a-row borderline'>
      <div :class="deepcol">&nbsp;</div>
      <div @mousedown="blur" @mouseup="clearcount" :class="inputcol">
        <input type="checkbox" :checked="ischecked" @change="$emit('toDoChange',id)">
        <input :value="title" @input="input" @click="click" :readonly="isblur" placeholder="input something">
      </div>
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
      isblur:false,
      loop:function(){},
    };
  },
  watch:{
    item:function(val){
      this.todo = val;
    }
  },
  computed:{
    deepcol(){
        let classList = [`a-col-${this.item.deeps}`,
        `a-col-lg-${this.item.deeps}` ,
        `a-col-md-${this.item.deeps}`,
         `a-col-sm-${this.item.deeps}`,
          `a-col-xs-${this.item.deeps}`];
        return classList;
    },
    buttoncol(){
        let classList = [`a-col-2`,
         `a-col-lg-2` ,
        `a-col-md-2`,
         `a-col-sm-2`,
          `a-col-xs-2`
        ];
        return classList;
    },
    inputcol(){
        let classList = [`a-col-${24-2-this.item.deeps}`,
         `a-col-lg-${24-2-this.item.deeps}` ,
        `a-col-md-${24-2-this.item.deeps}`,
         `a-col-sm-${24-2-this.item.deeps}`,
          `a-col-xs-${24-2-this.item.deeps}`];
        if(this.isblur){
          classList.push(`a-blur--hover`)
        }
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
    },
    ischecked:function(){
      return this.todo.checked;
    }
  },
  mounted() {},
  methods: {
    clearcount:function(){
      clearTimeout(this.loop);
    },
    focus:function(){
      clearTimeout(this.loop);
      this.isblur = false;
    },
    blur:function(){
      clearTimeout(this.loop);
      this.setloop()
    },
    setloop:function(){
      
      this.loop=setTimeout(()=>{
        console.log("blur start")
        this.isblur = true;
    },1000);
    
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
    },
    deepsDown:function(){
      this.$emit('deepsDown',this.id);
      this.isblur = false;

    },
    deepsUp:function(){
      this.$emit('deepsUp',this.id)
      this.isblur = false;
    }
  }
};
</script>
<style scoped>
.a-blur--hover{
  filter: blur(2px);
  pointer-events: none;
}
.a-bar--float{
  position: absolute;
  width: 100%;
  pointer-events: all;
  z-index: 999;
}
.borderline{
  border-bottom:1px solid gray;
  height:36px;
  line-height: 36px;
}
.input:focus{
  outline: none;
}
:focus{
  outline: none;
}
</style>
