<template>
  <div>
    <div class="block block__60">
      <to-do-content></to-do-content>
    </div>
    <div class="block block__40">
      <to-do v-bind:todos="SortedTodos"></to-do>
    </div>
  </div>
</template>

<script>
import ToDo from "./ToDo";
import ToDoContent from "./ToDoContent";
export default {
  name: "ToDoContainer",
  components: {
    ToDo,
    ToDoContent
  },
  data() {
    return {
      list: []
    };
  },
  created() {
    this.init();
  },
  mounted() {},
  methods: {
    update: function(val) {
      this.$aidb.open("DB_Vue_FlashCard").put("ToDos",val).execude()
    },
    add: function() {
      let toDoItem = {
        id: this.$uuid.v1(),
        checked: false,
        title: "",
        deeps: 0,
        treeId: 0,
        sort: this.currentSort
      };
      this.list.push(toDoItem);
      this.$aidb.open("DB_Vue_FlashCard").add("ToDos",toDoItem);
    },
    init: function() {
      this.$aidb.open("DB_Vue_FlashCard").getAll("ToDos").then((result)=> {
        this.list = result
      });
    },
    seedData:function(){
        this.$aidb.initialize();
        this.$aidb.open("DB_Vue_FlashCard").createTable("Cards",{keyPath: 'id'})
        this.$aidb.open("DB_Vue_FlashCard").createTable("ToDos",{keyPath: 'id'})
        this.$aidb.open("DB_Vue_FlashCard").createTable("Sets",{keyPath: 'id'})
        this.$aidb.execude()
    }
  },
  computed: {
    SortedTodos: function() {
      let data = this.list;
      return data.sort(function(a, b) {
        return a.sort - b.sort;
      });
    },
    currentSort: function() {
      return this.list.length;
    }
  }
};
</script>

<style scoped>
.block {
  float: left;
}
.block__60 {
  width: 60%;
}
.block__40 {
  width: 40%;
}
.block:after {
  clear: both;
}
</style>
