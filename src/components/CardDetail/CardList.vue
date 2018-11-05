<template>
    <div class="container--template">
       <div v-if="loading">
           loading
       </div>
       <div v-if="error">
           error
       </div>
        <div v-if="cards" class='layout__viewport anim__container'
             v-finger:swipe="swipe"
        >
       
           <div class="anim__slider layout__container" 
           v-bind:class="{'anim__slider--active':isSlider,'anim__silder--reverse':!isSlider}"
           >
            <card-list-item class="layout__item"
            v-for="card in cards" :key="card.id"
            v-bind:card="card"
            v-on:frontinput.self="getInput(card,$event)"
            v-on:backinput.self="card.back=$event"
            >
            </card-list-item>
           </div>
        </div>
        <div>
            <button v-on:click="slider(-1)">left</button>
            <button v-on:click="slider(1)">right</button>
        </div>
      
    </div>
</template>
<script>
import CardListItem from './CardListItem'
import {} from '@/plugins/atween.js'
import {VueAnime} from 'vue-anime'
import {dbcontext} from '@/service/context/dbcontext-class.js'

export default {
    name:"CardList",
    components:{
        CardListItem,
        VueAnime
    },
    data(){
        return{
            loading:true,
            error:false,
            offset:0,
            isSlider:false,
            currentCardId:0,
            cards:[]
        }
    },
   
    created(){
        // this.init();
    },
    mounted(){
       this.init();
    },
    watch:{
        cards:function(target){
           
        },
        '$route': 'init'
    },
    methods:{
        swipe: function(evt) {
            switch(evt.direction){
                case 'Left':
                 if(this.currentCardId>=this.cards.length-1){
                        this.currentCtiardId = this.cards.length;
                    }else{
                       
                        this.currentCardId = this.cards[this.currentCardId+1].id
                        this.isSlider=true; 
                        let elem = document.getElementsByClassName("anim__slider")
                         
                        let cssstyle = elem.item(0).style
                        this.offset=this.offset+(-21)
                        cssstyle.transform="translateX("+this.offset+"rem)"
                        
                    }
               
                break;
                case 'Right':
                 if(this.currentCardId<=0){
                        this.currentCardId=0*1;
                    }else{
                        this.currentCardId = this.cards[this.currentCardId-1].id
                        this.isSlider=false;
                        let elem = document.getElementsByClassName("anim__slider")
                        let cssstyle = elem.item(0).style
                        this.offset= this.offset+(21)
                        cssstyle.transform="translateX("+this.offset+"rem)"
                    }
                   
                break;
                case 'Up':
                break;
                case 'Down':
                break;
                }
          console.log(evt)
        },
        initCardStore(id){
            console.log(id)
        },
        getInput:function(card,event){
            console.log(card.id)
            console.log(event)
        },
        init:function(){
            let setId = this.$route.params.id;
            let context = new dbcontext("DB_Vue_FlashCard",2);
            context.open('DB_Vue_FlashCard').set("Cards").getQuery({setId:setId}).then((data)=>{
                // console.log(data)
                this.$store.commit("initCards",data)
                this.cards =this.$store.getters.AllCards
                this.loading = false;
            }).catch(function(data){
                this.error = true;
            })
            // this.currentCardId = id;
            // this.cards = this.$store.getters.AllCards
            // console.log(this.$route.params)
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
                        this.offset=this.offset+(-21)
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
                        this.offset= this.offset+(21)
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
    height:24rem;
    
}
.layout__container{
    width: 100%; /* card width */
    height:24rem;
    display: flex;
}
.layout__viewport{
    width:100%;
    height:2rem;
    overflow: hidden;
}
.layout__item{
    margin-right: 2rem;
    /* transform: translate(-50%,0); */
    /* position: absolute; */
}
.layout__item:first-child{
    margin-left: 8rem;
}
.anim__container{
    height:100%;
    margin-bottom: 4rem;
}
.anim__slider{
    transition: all .5s;
    position:absolute;
}
.anim__slider--active{
    transform: translateX(0)
}
.anim__slider--reverse{
    transform: translateX(0)
}
</style>



