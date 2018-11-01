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
            this.$router.push({ path: '/index' })
        }
    }
}
</script>

<style>

</style>
