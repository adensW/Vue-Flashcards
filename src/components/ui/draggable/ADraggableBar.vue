<template>
    <div class="draggable-bar" :style="position">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name:"ADraggableBar",
    props:{},
    data(){
        return{
            startX:100,
            startY:100,
            offsetX:0,
            offsetY:0,
            index:0,
        }
    },
    components:{

    },
    computed:{
        position(){
            return {
                top:`${this.startY}px`,
                left:`${this.startX}px`,
            }
        }
    },
    methods:{
        dragstart(event){
            event = event || window.event;
            event.preventDefault();
            this.offsetX = event.detail.data.clientX-this.startX;
            this.offsetY = event.detail.data.clientY-this.startY;
            
        },
        dragmove(){
        },
        dragend(event){
            event = event || window.event;
            this.startX = event.detail.data.clientX-this.offsetX;
            this.startY= event.detail.data.clientY-this.offsetY;
             
        }
    }
}
</script>

<style lang="less">
.draggable-bar{
    border:4px solid darkred;
    border-left-style: dotted;
    display: inline-block;
    position: absolute;
    &>*{
    // pointer-events: none;
    user-select:none;
    }
    &:selection{
        background: transparent;
    }
}
</style>
