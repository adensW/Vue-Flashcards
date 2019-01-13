<template>
<div class='sortable-bar'>
    <!-- <div class='sortable-mask'>
    </div> -->
    <div class='sortable-content'>
        <slot></slot>
    </div>
    </div>
</template>

<script>
export default {
    name:"ASortableBar",

}
</script>

<style lang='less'>
.sortable-bar{
    height: 32px;
    width: 100%;
    border:4px solid darkred;
    border-left-style: dotted;
    // display: inline-block;
    // pointer-events: none;
    z-index: -1;
    .sortable-mask{
        background-color: aquamarine;
        height: 32px;
        position: absolute;
        width:100% ;
        pointer-events: none;
    }
    &:selection{
        background: transparent;
    }
}
</style>
