<template>
  <div>loading...</div>
</template>

<script>
export default {
    name:'loading',
    data(){
        return {
        }
    },
    watch:{
      
    },
    mounted(){
        this.init()
    },
    methods:{
        init:function(){
            this.$aidb.initialize().then(()=>{
                this.$aidb.open("aidb_default").get('aidb_params',{database:"DB_Vue_FlashCard"})
                            .then((result)=>{
                                if(!result){
                                    this.seedData()
                                }else{
                                    this.redirect()
                                }
                            })
            })
          
        },
        seedData:function(){
        // this.$aidb.initialize();
            this.$aidb.open("DB_Vue_FlashCard").createTable("Cards",{keyPath: 'id'},{key:"SetId",unique:false})
            this.$aidb.open("DB_Vue_FlashCard").createTable("ToDos",{keyPath: 'id'})
            this.$aidb.open("DB_Vue_FlashCard").createTable("ToDoContent",{keyPath: 'id'},{key:"ToDoId",unique:true})
            this.$aidb.open("DB_Vue_FlashCard").createTable("Sets",{keyPath: 'id'})
            this.$aidb.execude().then(()=>{
                this.redirect();
            })
        },
        redirect:function(){
            this.$aidb.open('DB_Vue_FlashCard').getAll("Sets")
                .then((data)=>{
                    this.$store.commit("initSets",data)
                    this.$router.push({ path: '/index' })
                }).catch(function(data){
                    this.$router.push({ path: '/error' })
            });
        }
        
    }
}
</script>

<style>
</style>
