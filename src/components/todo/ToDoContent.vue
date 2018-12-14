<template>
    <div>
        {{toDoContent}}
    </div>
</template>

<script>
export default {
  name: "ToDoContent",
  props:['content'],
  data() {
    return {
      toDoContent:this.content,
    };
  },
  mounted() {},
  methods: {}
};
</script>

<style>
</style>
