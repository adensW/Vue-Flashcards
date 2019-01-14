<template>
    <i class="a-icons" @click="$emit('click')"  :style="rotateDeg">
        <slot></slot>
    </i>
</template>

<script>
export default {
    name:"AIcon",
    props:{
        rotate:{
            type:[String,Number],
            default:'0'
        },
        flip:{
            type:Boolean,
            default:false,
        }
    },
    data(){
        return {

        }
    },
    computed:{
        rotateDeg(){
            let style = {
            }
            if(this.flip){
                return {transform:`rotateY(180deg)`}
            }else{
                return {
                    transform:`rotate(${this.rotate}deg)`
                }
            }
           
        }
    }
}
</script>
<style lang="less" scoped>
.a-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  width: 24px;
  min-width: 24px;
  height: 24px;
  font-size: 24px;  /* Preferred icon size */
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: 'liga';
  overflow: hidden;
}
</style>
