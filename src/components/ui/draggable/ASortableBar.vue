<template>
<div class='sortable-bar'>
    <div class='sortable-handle a-col-1' @mouseover="ishover=true" @mouseleave="ishover=false">
        <a-icon :rotate="90" v-show='ishover'>drag_handle</a-icon>
    </div>
    <div class='sortable-content a-col-23'>
        <slot></slot>
    </div>
</div>
</template>

<script>
export default {
    name:"ASortableBar",
    data(){
        return{
            ishover:false,
        }
    },
    methods:{
        hovering(){
            this.ishover = true;
        }
    }
}
</script>

<style lang='less'>
.sortable-bar{
    height: 36px;
    .sortable-content{
        position: relative;
    }
    .sortable-handle{
        height: 32px;
        vertical-align: middle;
        text-align: center;
        i{
            height: 36px;
            line-height: 36px;
            cursor: pointer;
        }
    }
    &:selection{
        background: transparent;
    }
}

.sortable-bar--drag{
    width: 80%;
   
}
</style>
