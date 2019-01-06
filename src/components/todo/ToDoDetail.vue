<template>
    <div class="bg-white">
      <div>
        <input class="borderline" :value="title" @input="title_input" />
        <button @click="preview = !preview">
          <span v-if="preview">edit</span>
          <span v-if="!preview">preview</span>
          </button>
      </div>
      <div id="editor" >
        <textarea ref="myarea"
          v-show="!preview" v-model="content" @input="content_input" @blur="preview=true"></textarea>
        <div class="preview-container" v-show="preview" v-html="compiledMarkdown" @click="text_input"></div>
      </div>
    </div>
</template>

<script>
import _ from 'lodash'
import marked from 'marked'
export default {
  name: "ToDoDetail",
  props:['item'],
  data() {
    return {
      tododetail:this.item,
      preview:false
    };
  },
  computed:{
    title:{
      get:function(){
        return this.tododetail.title;
      },
      set: function (newValue) {
        this.tododetail.title = newValue;
      }
    },
    content:{
      get:function(){
        return this.tododetail.content;
      },
      set: function (newValue) {
        this.tododetail.content = newValue;
      }
    },
    compiledMarkdown: function () {
      return marked(this.tododetail.content||"" , { sanitize: true })
    }
  },
  mounted:function() {
    this.tododetail = this.item;
  },
  watch:{
    item:function(newValue){
      this.tododetail = newValue
    },
    preview:function(val){
      if(val){

      }else{
        this.$refs.myarea.focus();
      }
    }
  },
  methods: {
    title_input:_.debounce(function(e){
      this.title = e.target.value;
      this.update();
    },300),
    content_input:_.debounce(function(e){
      this.content = e.target.value;
      this.update();
    },300),
    update:function(){
      this.$store.dispatch("updateDetail",this.tododetail)
    },
    text_input:function(){
      this.preview = false;
    }
    
  }
};
</script>
<style scoped>
.borderline{
  border-bottom:1px solid gray;
}
.bg-white{
  background-color: ivory;
}
input,textarea{
  width: 100%;
}
textarea{
  height:70vh;
}
.preview-container{
  height:70vh;
}
</style>
