<template>
    <button class='a-btn' :class="classes"  @click="$emit('click')">
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
        outlined:{
            type:Boolean,
            default:false,
        },
        text:{
            type:Boolean,
            default:false,
        },
        color:{
            type:String,
            default:'transparent'
        },
    },
    computed:{
        classes(){
           return [this.fab?`a-btn--fab`:'',
           this.outlined?`a-btn--outlined`:'',
           this.text?`a-btn--text`:'',
           ];
        }
    }
}
</script>

<style>

</style>
