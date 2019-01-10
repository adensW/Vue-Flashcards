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
            let classList = [];
           this.fab?classList.push(`a-btn--fab`):'';
           this.outlined?classList.push(`a-btn--outlined`):'';
           this.text?classList.push(`a-btn--text`):'';
           return classList;
        }
    }
}
</script>

<style>

</style>
