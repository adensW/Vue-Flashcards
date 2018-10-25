<template>
    <div class="container--template">
       
            <div class='layout__viewport anim__container'>
           
               <div class="anim__slider layout__container" v-bind:class="{'anim__slider--active':isSlider,'anim__silder--reverse':!isSlider}">
                <card-list-item class="layout__item"
                v-for="card in cards" :key="card.id"
                v-bind:flipId="flipId"
                v-bind:card="card"
                v-bind:isFlip="isFlip"
                v-on:frontinput.self="card.front=$event"
                v-on:backinput.self="card.back=$event"
                >
                </card-list-item>
                </div>
           
        </div>
        <div>
            <button v-on:click="flipCard()">flip</button>
            <button v-on:click="slider(-1)">left</button>
            <button v-on:click="slider(1)">right</button>
        </div>
      
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
            flipId:"0",
            isFlip:false,
            isSlider:false,
            currentCardId:0,
            cards:[
            {
                id:0,
                front:"tetsetsmoremroemoreasesttestmoermoeasdasdasdasdaasdasd"+
                    "setssdssdasdadsadasdasdaasdasdasdsadasdasdasdasd"+
                    "asdasdasdsgsdfgdjytjsdfgcvbtsrtadfdfSeregdfg",
                back:"backbackbackbackbackbackbackbackbackbackbackbackbackback"+
                    "backbackbackbackbackbackbackbackbackbackbackback"+
                    "backbackbackbackbackbackbackbackbackbackback",
                comment:"commentcommentcommentcommentcommentcommentcommentcomment"+
                    "commentcommentcommentcommentcommentcommentcommentcomment"+
                    "commentcommentcommentcommentcommentcomment"
            },{
                id:1,
                front:"1",
                back:"2",
                comment:"3"
            }]
        }
    },
    mounted(){
       this.init();
    },
    methods:{
        flipCard:function(){
            this.flipId = this.currentCardId;
            this.isFlip = !this.isFlip;
        },
        init:function(){
            this.currentCardId = 0;
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
                    this.currentCardId = this.cards[this.currentCardId].id+1
                    this.isSlider=true; 
                }
                else{
                        this.currentCardId = this.cards[this.currentCardId].id-1
                        this.isSlider=false;
                }
            }
        }
    }
}
</script>
<style scoped>
.container--template{
    display:block;
    height:80vh;
    
}
.layout__container{
    width: 100%; /* card width */
    height:70vh;
    display: flex;
}
.layout__viewport{
    width:100%;
    height:600px;
    overflow: hidden;
}
.layout__item{
    margin-right: 10%;
    /* transform: translate(-50%,0); */
    /* position: absolute; */
}
.anim__container{
    height:100%;
}
.anim__slider{
    transition: all .5s;
    position:absolute;
}
.anim__slider--active{
    transform: translateX(-50%)
}
.anim__slider--reverse{
    transform: translateX(50%)
}
</style>

