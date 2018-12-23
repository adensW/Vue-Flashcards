<template>
    <div class="mask" v-if="toggle"></div>    
</template>

<script>
export default {
    name:"AMask",
    props:{
        toggle:
        { 
            type:Boolean,
            default:false
        }
    }
}
</script>

<style>
.mask{
  height:100vh;
  width:100vw;
  z-index:9998;
  background-color:rgba(100, 100, 100, 0.4);
  position: fixed;
  /* pointer-events: none; */
}
</style>
