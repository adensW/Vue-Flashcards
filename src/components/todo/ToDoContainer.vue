<template>
  <div class="a-row">
    <a-card v-show="false" class="a-col-12 a-col-lg-12 a-col-md-14 a-col-sm-16 a-col-xs-18">
      <div class="">
        <to-do-detail :item="Detail"></to-do-detail>
      </div>
    </a-card>
    <a-card class="a-col-22 a-col-offset-1 a-col-lg-22 a-col-md-22 a-col-sm-22 a-col-xs-22">
      
        <to-do :todos="SortedTodos"
              @refresh='refresh'
        ></to-do>
    
    </a-card>
   
  </div>
</template>

<script>
import ToDo from "./ToDo";
import ToDoDetail from "./ToDoDetail";
import { mapGetters } from "vuex";
export default {
  name: "ToDoContainer",
  components: {
    ToDo,
    ToDoDetail
  },
  data() {
    return {
      list: [],
      detail: {}
    };
  },
  created() {
    this.init();
  },
  mounted() {},
  methods: {
    refresh:function(id){
      let a =this.list.findIndex(function(value){
        return value.id==id;
      })
      this.list.splice(a,1)
    },
    init: function() {
      this.$aidb
        .open("DB_Vue_FlashCard")
        .getQuery("ToDos",{"parentId":0})
        .then(result => {
          if (!result || result.length == 0) {
            let uid= this.$uuid.v1();
            let item = {
              id: uid,
              checked: false,
              title: "",
              deeps: 0,
              sort: this.currentSort,
              isFold:false,
              parentId:0,
              childrenNum:0,
            };
            let ditem = {
              id: this.$uuid.v1(),
              content: "",
              title: item.title,
              ToDoId: item.id
            };
            this.$store.dispatch("addToDo", item);
            this.$store.dispatch("addContent", ditem);
            this.list = this.$store.getters.AllToDos;
          } else {
            this.$store.dispatch("initToDos", result);
            this.list = this.$store.getters.AllToDos;
            this.$aidb
              .open("DB_Vue_FlashCard")
              .get("ToDoContent", { ToDoId: this.SortedTodos[0].id })
              .then(result => {
                if (result) {
                  this.$store.dispatch("setDetail", result);
                } else {
                  this.$store.dispatch("addContent", {
                    id: this.$uuid.v1(),
                    title: this.SortedTodos[0].title,
                    content: "",
                    ToDoId: this.SortedTodos[0].id
                  });
                }
              });
          }
        });
    }
  },
  watch: {
    CurrentDetail: function(value) {
      this.detail = value;
    }
  },
  computed: {
    ...mapGetters(["CurrentDetail"]),
    Detail: function() {
      return this.detail;
    },
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
</style>
