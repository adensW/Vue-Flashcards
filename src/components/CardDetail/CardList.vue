<template>
    <div class="container--template">
        <div class='layout__viewport'>
            <div class='layout__container anim__container'>
                <vue-anime :animate="{
                    translateX:'-20'
                }" :playing='true'>
                <card-list-item class="layout__item anim__slider"
                v-bind:flip="flip"
                v-bind:card="cards"

                v-on:frontinput="cards.front=$event"
                v-on:backinput="cards.back=$event"
            >
            </card-list-item>
                </vue-anime>
                <vue-anime :animate="{
                    translateX:'0'
                }" :playing='true'>
            <card-list-item 
                class="layout__item layout__item--current anim__slider"
                v-bind:flip="flip"
                v-bind:card="cards"

                v-on:frontinput="cards.front=$event"
                v-on:backinput="cards.back=$event"
            >
           
            </card-list-item></vue-anime>
             <vue-anime :animate="{
                    translateX:'20'
                }" :playing='true'>
            <card-list-item
                class="layout__item anim__slider"
                v-bind:flip="flip"
                v-bind:card="cards"

                v-on:frontinput="cards.front=$event"
                v-on:backinput="cards.back=$event"
            ></card-list-item>

             </vue-anime>
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
                    for (let index = 0; index < cardElemList.length; index++) {
                        const element = cardElemList[index];
                        // anime({
                        //     target:element,
                        //     translateX:'-50%'
                        // });
                    }
                    
                    console.log(cardElemList);    
                }
                else{
                    console.log(1);
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
    position:absolute;
}
.anim__slider--left{
    transform: translate(-50%,0)
}
.anim__slider--right{
    transform: translate(50%,0)
}
.layout__item--current{
    height:100%;
}
</style>

