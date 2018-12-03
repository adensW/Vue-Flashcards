<template>
    <div>
      <input v-model="item.title">
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

</style>
