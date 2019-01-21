<template>
    <div class="draggable-bar" :style="borderstyle" @mouseenter="showbar">
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
            ishide:false,
            Timer:1000,
            currentTime:new Date()
        }
    },
    mounted:function(){
         setTimeout(()=>{
             console.log(1)
                    this.ishide = true;
                },this.Timer)
    },
    components:{
       
    },
    watch:{
        ishide:function(val){
            console.log(val)
            if(!val){
                setTimeout(()=>{
                    this.ishide = true
                },this.Timer)
            }
        }
    },
    computed:{
        
        borderstyle(){
            return {
                top:`${this.startY}px`,
                left:`${this.startX}px`,
                'border':this.ishide?`4px solid transparent`:`4px solid darkred`,
                'border-left-style': this.ishide?`solid`:`dotted`,
            }
        },
        hidebar(){
            return this.ishide; 
        }
    },
    methods:{
        showbar(){
            this.ishide = false;    
        },
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
