<template>
    <div>
        loading...
    </div>
</template>

<script>
export default {
    name:'loading',
    data(){
        return {
            data:this.$store.getters.AllSets
        }
    },
    watch:{
      
    },
    mounted(){
        this.redirect()
    },
    methods:{
        redirect:function(){
            this.$aidb.open('DB_Vue_FlashCard').getAll("Sets").then((data)=>{
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
