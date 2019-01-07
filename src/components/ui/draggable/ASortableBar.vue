<template>
    <div class='sortable-bar'>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name:"ASortableBar",

}
</script>

<style lang='less'>
.sortable-bar{
    border:4px solid darkred;
    border-left-style: dotted;
    display: inline-block;
    
    &:selection{
        background: transparent;
    }
}
</style>
