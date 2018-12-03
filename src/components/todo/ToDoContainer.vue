<template>
<div>
        <div>
        <to-do-content></to-do-content>
    </div>
    <div>
        <to-do></to-do>
    </div>
    </div>

</template>

<script>
import ToDo from './ToDo'
import ToDoContent from './ToDoContent'
export default {
    name:"ToDoContainer",
    components:{
        ToDo,
        ToDoContent
    },
    data(){
        return{
            list:[{
                id:"1",
                value:"test",
                checked:false,
                lft:1,
                right:2,
                treeId:0
            }]
        }
    },
    mounted(){

    },
    methods:{

    }
}
</script>

<style>

</style>
