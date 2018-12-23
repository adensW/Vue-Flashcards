<template>
    <div class="a-menu" :class="{'a-menu-toggle':toggle}">
        <slot></slot>
        <div class="clearfix"></div>
    </div>
</template>

<script>
export default {
    name:"ADrawer",
    props:['drawer'],
    data(){
        return {
            toggle:this.drawer
        }
    },
    watch:{
        drawer:function(val){
            this.toggle = val;
        }
    }
}
</script>

<style scoped>
    
</style>
