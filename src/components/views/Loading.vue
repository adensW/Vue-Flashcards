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
        this.redirect()
    },
    methods:{
        redirect:function(){
            this.$aidb.open("aidb_default").get('aidb_params',{database:"DB_Vue_FlashCard"})
            .then((result)=>{
                if(!result){
                    this.seedData().then(()=>{
                        this.$aidb.open('DB_Vue_FlashCard').getAll("Sets").then((data)=>{
                        this.$store.commit("initSets",data)
                        this.$router.push({ path: '/index' })
                        }).catch(function(data){
                            this.$router.push({ path: '/error' })
                        });
                    });
                    
                }
            })
           
        },
        seedData:function(){
        // this.$aidb.initialize();
            this.$aidb.open("DB_Vue_FlashCard").createTable("Cards",{keyPath: 'id'},{key:"SetId",unique:false})
            this.$aidb.open("DB_Vue_FlashCard").createTable("ToDos",{keyPath: 'id'})
            this.$aidb.open("DB_Vue_FlashCard").createTable("ToDoContent",{keyPath: 'id'},{key:"ToDoId",unique:true})
            this.$aidb.open("DB_Vue_FlashCard").createTable("Sets",{keyPath: 'id'})
            return this.$aidb.execude()
        }
    }
}
</script>

<style>
</style>
