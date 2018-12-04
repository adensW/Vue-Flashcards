<template>
    <div>
        loading...
    </div>
</template>

<script>
import {dbcontext} from '@/service/context/dbcontext-class.js'
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
            let context = new dbcontext("DB_Vue_FlashCard",3);
            context.open('DB_Vue_FlashCard').set("Sets").getAll().then((data)=>{
            this.$store.commit("initSets",data)
            this.$router.push({ path: '/index' })
            }).catch(function(data){
                console.log(data);
                this.$router.push({ path: '/error' })
            });
            
        }
    }
}
</script>

<style>

</style>
