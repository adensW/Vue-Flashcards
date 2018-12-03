<template>
    <div class='column'>
        <div class=" borderline">
           <v-icon>arrow_back</v-icon>
       
          <v-icon>arrow_forward</v-icon>
          <input v-model="item.title" placeholder="input something">
          </div>
          
    </div>
</template>

<script>
export default {
  name: "ToDoItem",
  props:['item'],
  data() {
    return {};
  },
  mounted() {},
  methods: {}
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
