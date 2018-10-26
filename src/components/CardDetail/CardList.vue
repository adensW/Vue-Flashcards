<template>
    <div class="container--template">
       
            <div class='layout__viewport anim__container'>
           
               <div class="anim__slider layout__container" 
               v-bind:class="{'anim__slider--active':isSlider,'anim__silder--reverse':!isSlider}"
               >
                <card-list-item class="layout__item"
                v-for="card in cards" :key="card.id"
                v-bind:flipId="flipId"
                v-bind:card="card"
                v-bind:isFlip="isFlip"
                v-on:frontinput.self="getInput(card,$event)"
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
            flipId:"0",
            offset:0,
            isFlip:false,
            isSlider:false,
            currentCardId:0,
            cards:[]
        }
    },
    mounted(){
       this.init();
    },
    watch:{
        cards:function(target){
            console.log(target)
        }
    },
    methods:{
        getInput:function(card,event){
            console.log(card.id)
        },
        flipCard:function(){
            this.flipId = this.currentCardId*1;
            this.isFlip = !this.isFlip;
        },
        init:function(){
            this.currentCardId = 0*1;
            this.cards = this.$store.getters.AllCards
            
        },
        slider:function(dir){
            if(typeof dir!='undefined'){
                if(dir===-1){
                    
                    if(this.currentCardId>=this.cards.length-1){
                        this.currentCtiardId = this.cards.length;
                    }else{
                       
                        this.currentCardId = this.cards[this.currentCardId+1].id
                        this.isSlider=true; 
                        let elem = document.getElementsByClassName("anim__slider")
                         
                        let cssstyle = elem.item(0).style
                        this.offset=this.offset+(-45)
                        cssstyle.transform="translateX("+this.offset+"rem)"
                        
                    }
                }
                else{
                    if(this.currentCardId<=0){
                        this.currentCardId=0*1;
                    }else{
                        this.currentCardId = this.cards[this.currentCardId-1].id
                        this.isSlider=false;
                        let elem = document.getElementsByClassName("anim__slider")
                        let cssstyle = elem.item(0).style
                        this.offset= this.offset+(45)
                        cssstyle.transform="translateX("+this.offset+"rem)"
                    }
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
    margin-right: 10rem;
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



