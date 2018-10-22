<template>
    <div class="container--template">
        <div class='layout__viewport'>
            <div class='layout__container anim__container'>
            <transition name='anim__slider' mode='out-in'>
                <card-list-item class="layout__item anim__slider"
                v-if='isSlider'
                v-bind:flip="flip"
                v-bind:card="cards"

                v-on:frontinput="cards.front=$event"
                v-on:backinput="cards.back=$event"
                >
                </card-list-item>
            </transition>
            <transition name='anim__slider--next' mode="out-in">
                <card-list-item 
                class="layout__item layout__item--current anim__slider"
                v-bind:flip="flip"
                v-bind:card="cards"
                v-if='!isSlider'
                v-on:frontinput="cards.front=$event"
                v-on:backinput="cards.back=$event"
                >
                </card-list-item>
               
            </transition>
             
            </div>
           
        </div>
        <button v-on:click="flip=!flip">flip</button>
        <button v-on:click="slider(-1)">left</button>
        <button v-on:click="slider(1)">right</button>
    </div>
</template>
<script>
import CardListItem from './CardListItem'
import {} from '@/plugins/atween.js'
import {VueAnime} from 'vue-anime'
export default {
    name:"CardList",
    components:{
        CardListItem,
        VueAnime
    },
    data(){
        return{
            "uuid":"",
            flip:false,
            isSlider:false,
            "cards":
            {
                id:"0",
                front:"tetsetsmoremroemoreasesttestmoermoeasdasdasdasdaasdasd"+
                    "setssdssdasdadsadasdasdaasdasdasdsadasdasdasdasd"+
                    "asdasdasdsgsdfgdjytjsdfgcvbtsrtadfdfSeregdfg",
                back:"backbackbackbackbackbackbackbackbackbackbackbackbackback"+
                    "backbackbackbackbackbackbackbackbackbackbackback"+
                    "backbackbackbackbackbackbackbackbackbackback",
                comment:"commentcommentcommentcommentcommentcommentcommentcomment"+
                    "commentcommentcommentcommentcommentcommentcommentcomment"+
                    "commentcommentcommentcommentcommentcomment"
            }
        }
    },
    mounted(){
        // atween();
        this.init();
    },
    methods:{
        init:function(){
            console.log(this.anime)
            let target = document.getElementsByClassName('anim__slider');
           
            // console.log(aTween(target,{'transform':'-50%'}).animate())
        },
        slider:function(dir){
            if(typeof dir!='undefined'){
                let cardElemList = document.getElementsByClassName("anim__slider");
                if(dir===-1){
                    // for (let index = 0; index < cardElemList.length; index++) {
                    //     const element = cardElemList[index];
                    //     // anime({
                    //     //     target:element,
                    //     //     translateX:'-50%'
                    //     // });
                    // }
                    
                    // console.log(cardElemList);   
                    this.isSlider=true; 
                }
                else{
                    console.log(1);
                     this.isSlider=false;
                }
            }
        }
    }
}
</script>
<style scoped>
.layout__container{
    width: 100%; /* card width */
    height:70vh;
}
.layout__viewport{
    width:100%;
    height:70vh;
    overflow: hidden;
}
.layout__item{
    margin-right: 10%;
    transform: translate(-50%,0);
    /* position: absolute; */
}
.anim__container{
    height:100%;
}
.anim__slider{
    transition: all .5s;
    position:absolute;
}
.anim__slider-enter-active{
    transition: all .5s;
}
.anim__slider{
    transform: translateX(50%)
}
.layout__item--next-leave-active{
    transition: all .5s;
  transform: translateX(50%);
}
</style>

