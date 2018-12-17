<template>
    <div class="bg-white">
      <div>
        <input class="borderline" v-model="title">
      </div>
      <div>
        <textarea v-model="content"></textarea>
      </div>
    </div>
</template>

<script>
export default {
  name: "ToDoDetail",
  props:['item'],
  data() {
    return {
      tododetail:this.item,
    };
  },
  computed:{
    title:{
      get:function(){
        return this.tododetail.title;
      },
      set: function (newValue) {
        this.tododetail.title = newValue;
        this.update();
      }
    },
    content:{
      get:function(){
        return this.tododetail.content;
      },
      set: function (newValue) {
        this.tododetail.content = newValue;
        this.update();
        // this.$store.dispatch("updateDetail",this.detail)
      }
    }
    
  },
  mounted:function() {
    this.tododetail = this.item;
  },
  watch:{
    item:function(newValue){
      this.tododetail = newValue
     
    }
  },
  methods: {
    update:function(){
      this.$store.dispatch("updateDetail",this.tododetail)
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
</style>
