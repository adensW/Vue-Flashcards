<template>
    <div class="a-divider">
        <span>
        <slot></slot>
        </span>
    </div>
</template>

<script>
export default {
    name:"ADivider",
    props:{
        verticle:{
            type:Boolean,
            default:false,
        },
        dashed:{
            type: Boolean,
                default: false,
        }
    },
    components:{},
    data(){
        return{
            
        }
    },

}
</script>

<style>

</style>
