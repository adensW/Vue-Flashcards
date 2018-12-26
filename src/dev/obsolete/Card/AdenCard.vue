<template>
<div>
    <div class='aden-slider-wrap'>
        <div class='aden-container aden-slider-container'>
            <div class='aden-slider aden-slider__leftpart'
            v-bind:class="{'aden-slider-anim':silderLeft}">
                <div class='card'>
                  
                </div>
            </div>
            <div class='aden-slider flip-wrap'
            v-bind:class="{'flip-wrap-touch':flip}" 
            >
                <div class='flip'>
                    <div class='card front'>
                    {{cards[1].front}}
                    </div>
                    <div class='card back'> 
                    {{cards[1].back}}
                    </div>
                </div>
                
            </div>
            <div class='aden-slider aden-slider__rightpart'>
                <div class='card'>
                    
                </div>
            </div>
        </div>
   
   </div>
   <button v-on:click="flip=!flip">flip</button>
   <button v-on:click="silderLeft=!silderLeft">prev</button>
   <button v-on:click="silderRight=!silderRight">next</button>
</div>
</template>

<script>
import {GetCard} from '@/service/CardStore.js'
import AdenMask from './childcomponent/AdenMask'

export default {
    name:'AdenCard',
    data(){

        return {
            flip:false,
            silderLeft:false,
            silderRight:false,
            card:{"id":"","front":"","back":"","commnet":""},
            cards:[{"id":"","front":"","back":""},{},{}]
        }
    },
    components:{
        AdenMask
    },
    mounted(){
        this.GetData();
    },
    methods:{
        GetData(){
            // this.cards = GetCard({"index":0,"pageSize":10});
            this.$http.get('./data/testCard.json').then(response=>{
                this.cards= response.data.cards;
                
            })
            GetCard({})
        },
        CardInput(){
            event.preventDefault();
        },
        prev(){

        },
        next(){

        }
    }
   
}
</script>
<style scoped>

.aden-container{
    height:100%;
    width:100%;
}
.aden-slider-container{
    position: absolute;
    left: 0; top: 0;
    width: 100%; /* 横向排列 5张图片 宽度应为主容器5倍 */
    height: 100%;
    font-size: 0;
}
.aden-slider-wrap{
    position: relative;
    width: 630px;
    height: 220px;
    margin: 100px auto;
    overflow: hidden;
    vertical-align: middle;
    
}
.aden-slider{
    float: left;
    height:100%;
    margin: 0px 0px 0px 0px; 
    text-align:center;
  
}
.aden-slider__leftpart{
    width: 160px;
}
.aden-slider__rightpart{
    width:160px;
    float: right;
}
.aden-slider-anim{
      animation:anim-slider-left 0.2s linear infinite;
}
.flip-wrap{
    width:210px;
    height:220px;
    margin:0 auto;
    perspective:800px;
}
.flip{
    width:100%;
    height:220px;
    backface-visibility:hidden;/*背对屏幕时隐藏*/
    transition: all 1s ease; /*为翻牌添加过渡效果*/
    transform-style: preserve-3d; /*子元素将保留其 3D 位置。*/   
}

.card{
    width:100%;
    height:100%;
    position: absolute;/*让背面和正面重叠*/
    left:50%;
    margin-left:-105px;
}
.front{
    z-index: 2;
    background-color: aquamarine;
}
.back{
    transform: rotateY(180deg);
    background-color: burlywood;
}
.flip-wrap-touch .flip{
    transform:rotateY(180deg);
}
.card-display{
    width:100%;
    height:100%;
    border:none;
}
.hidden{
    display:none;
}
@keyframes anim-slider-left {
    0% {transform: translate(0,0);}
   

    100% {transform: translate(-100%,0);} /* 复位到第一张图片 */
}
</style>

