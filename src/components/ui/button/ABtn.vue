<template>
    <button class='a-btn' @click="$emit('click')">
        {{fabs}}
        <slot></slot>
    </button>
</template>

<script>
export default {
    name:"ABtn",
    props:{
        fab:{
            type:Boolean,
            default:false,
        },
        color:{
            type:String,
            default:'transparent'
        },
    },
    computed:{
        fabs:function(){
            if(!this.fab){
                return `nonefab`
            }else{
                return `fab`
            }
            
        }
    }
}
</script>

<style>

</style>
