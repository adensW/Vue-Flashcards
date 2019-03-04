<template>
<div>
    <!-- <div>
        <date-reminder></date-reminder>
    </div>
    <div class='draggable-container'>
        <a-draggable-bar ref="0" data-val="0">
            <div>test</div>
        </a-draggable-bar>
        <a-draggable-bar ref="1" data-val="1">
            <div>test1</div>
        </a-draggable-bar>
        <a-draggable-bar ref="2" data-val="2">
            <div>test2</div>
        </a-draggable-bar>
        <a-draggable-bar ref="3" data-val="3">
            <div>test3</div>
        </a-draggable-bar>
    </div>
    <div class='sortable-container'>
        <a-sortable-bar>
            <div>1111</div>
        </a-sortable-bar> 
        <a-sortable-bar>
            <div>2222</div>
        </a-sortable-bar> 
        <a-sortable-bar>
            <div>3333</div>
        </a-sortable-bar> 
        <a-sortable-bar>
            <div>4444</div>
        </a-sortable-bar>
    </div>
    <div class='dropable-container'>
        <a-dropable-bar>
            <div class=''>111</div>
        </a-dropable-bar>
        <a-dropable-bar>
            <div class=''>222</div>
        </a-dropable-bar>
        <a-dropable-bar>
            <div class=''>333</div>
        </a-dropable-bar>
        <a-dropable-bar>
            <div class=''>444</div>
        </a-dropable-bar>
    </div>
    <div class='dropable-container'>
        <div class="drop-container dropzone">
        </div>
        <div class="drop-container dropzone">
        </div>
        <div class="drop-container dropzone">
        </div>
        <div class="drop-container dropzone">
        </div>
        <div class="drop-container dropzone">
        </div>
        <div class="drop-container dropzone">
        </div>
    </div>
    <a-clock></a-clock> -->
    <controller-panel :id="1"></controller-panel>
    </div>

</template>

<script>
import { Draggable } from '@shopify/draggable';
import { Sortable } from '@shopify/draggable';
import { Droppable } from '@shopify/draggable';
import DateReminder from '@/components/public/DateReminder.vue'
import ControllerPanel from '@/components/public/ControllerPanel.vue'
export default {
    name:"library",
    components:{
        DateReminder,
        ControllerPanel
    },
    data(){
        return{

        }
    },
    mounted(){
        // this.initDraggable();
        // this.initSortable();
        this.initDropable();
    },
    methods:{
        initDraggable(){
            const draggable = new Draggable(document.querySelectorAll('.draggable-container'), {
                draggable: '.draggable-bar'
            });
            draggable.on('drag:start', (target) => {
                    let ref= target.data.source.getAttribute("data-val")
                    this.$refs[ref].dragstart()
                    });
            draggable.on('drag:move', (target) => {
                    let ref= target.data.source.getAttribute("data-val")
                    this.$refs[ref].dragmove()
                    });
            draggable.on('drag:stop', (target) => {
                    let ref= target.data.source.getAttribute("data-val")
                    this.$refs[ref].dragend()
            });
        },
        initSortable(){
            const sortable = new Sortable(document.querySelectorAll('.sortable-container'), {
                draggable: '.sortable-bar'
            });
            sortable.on('sortable:start', () => console.log('sortable:start'));
            sortable.on('sortable:sort', () => console.log('sortable:sort'));
            sortable.on('sortable:sorted', () => console.log('sortable:sorted'));
            sortable.on('sortable:stop', () => console.log('sortable:stop'));
        },
        initDropable(){
            const droppable = new Droppable(document.querySelectorAll('.dropable-container'), {
                draggable: '.dropable-bar--item',
                dropzone: '.dropzone'
                });
                droppable.on('droppable:dropped', (res) => console.log('droppable:dropped',res));
                droppable.on('droppable:returned', (res) => console.log('droppable:returned',res));
        }
    }
}
</script>

<style>
.draggable-container{
    height: 100px;
    width: 500px;
    background-color: bisque;
}
.drop-container{
    height: 100px;
    width: 500px;
    background-color: aquamarine;
}
</style>
