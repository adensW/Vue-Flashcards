<template>
    <ul>
        <slot></slot>
    </ul>
</template>
<script>
import AListItem from "./AListItem"
export default {
    name:"AListItem",
    components:{
        AListItem
    },
    props:{
        items:Array
    }
    
}
</script>

<style>

</style>
