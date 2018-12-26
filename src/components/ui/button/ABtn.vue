<template>
    <button class='a-btn' :class="{'a-btn--fab':isFab}"  @click="$emit('click')">
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
        isFab:function(){
            if(!this.fab){
                return false;
            }else{
                return true
            }
            
        }
    }
}
</script>

<style>

</style>
