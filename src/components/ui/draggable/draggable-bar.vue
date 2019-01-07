<template>
    <div class="draggable-bar">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name:"draggable-bar",
    props:{},
    data(){
        return{

        }
    },
    components:{

    }
}
</script>

<style>
.draggable-bar{
    border:4px solid darkred;
    border-left-style: dotted;
}
</style>
