<template>
    <div>
        <div class="mask"></div>
    </div>
</template>
<script>
export default {
    name:"AdenMask",
    data(){
        return {
            count:0
        }
    }
}
</script>
<style scoped>

.mask{
    width: 100%;
    height:1920px;
    background-color: rgba(0, 0, 0, 0.158);
    float: left;
    z-index: 1000;
}
</style>
 