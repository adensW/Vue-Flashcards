<template>
    <div class="container--template">
        <div class='layout__viewport'>
            <div class='layout__container anim__container'>
                <card-list-item class="layout__item anim__slider"
                v-bind:flip="flip"
                v-bind:card="cards"

                v-on:frontinput="cards.front=$event"
                v-on:backinput="cards.back=$event"
            >
            </card-list-item>
            <card-list-item 
                class="layout__item layout__item--current anim__slider"
                v-bind:flip="flip"
                v-bind:card="cards"

                v-on:frontinput="cards.front=$event"
                v-on:backinput="cards.back=$event"
            >
           
            </card-list-item>
            <card-list-item
                class="layout__item anim__slider"
                v-bind:flip="flip"
                v-bind:card="cards"

                v-on:frontinput="cards.front=$event"
                v-on:backinput="cards.back=$event"
            ></card-list-item>
            </div>
           
        </div>
        <button v-on:click="flip=!flip">flip</button>
        <button v-on:click="slider(-1)">left</button>
        <button v-on:click="slider(1)">right</button>
    </div>
</template>
<script>
import CardListItem from './CardListItem'
import atween from '@/plugins/atween.js'
export default {
    name:"CardList",
    components:{
        CardListItem
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
            console.log(aTween().animate())
            console.log("init")
        },
        slider:function(dir){
            if(typeof dir!='undefined'){
                let cardElemList = document.getElementsByClassName("anim__slider");
                if(dir===-1){
                    for (let index = 0; index < cardElemList.length; index++) {
                        const element = cardElemList[index];
                        element.style.transform 
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
    display: flex;
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

}
.anim__slider{
    transition: transform 0.5s linear 0s;
}
.anim__slider--left{
    transform: translate(-50%,0)
}
.anim__slider--right{
    transform: translate(50%,0)
}
.layout__item--current{
    
}
</style>

