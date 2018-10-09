<template>
    <div class='aden-container'>
        <div class='flip-wrap'
        v-bind:class="{'flip-wrap-touch':flip}" 
        v-for="card in cards" 
        :key="card.id"
        >
            <div class='flip'>
<<<<<<< HEAD:src/components/Card/AdenCard.vue
            <div class='card front'>
                <div>
                    {{card.front}}
                </div>
            </div>
            <div class='card back' > 
                <div>
                    {{card.front}}
                </div>
            </div>
=======
                <div class='card front'>
                   {{card.front}}
                </div>
                <div class='card back'> 
                    {{card.back}}
                </div>
>>>>>>> c7998963508dd62f1d97e56fcdd0c1aa66a9a789:src/components/AdenCard.vue
            </div>
             <button v-on:click="flip=!flip">flip</button>
        </div>
         <AdenMask></AdenMask>
         <div class="aden-wrapper">
             <div class="input-field">
                <input v-model="card.front">
             </div>
             <div class="input-field">
                 <input v-model="card.back">
             </div>
             <div class="input-field">
                 <textarea v-model="card.comment"></textarea>
             </div>
         </div>

    </div>
   
</template>

<script>
// import {GetCard} from '@/service/CardStore.js'
<<<<<<< HEAD:src/components/Card/AdenCard.vue
=======
import AdenMask from './childcomponent/AdenMask'
>>>>>>> c7998963508dd62f1d97e56fcdd0c1aa66a9a789:src/components/AdenCard.vue

export default {
    name:'AdenCard',
    data(){
        return {
            flip:false,
<<<<<<< HEAD:src/components/Card/AdenCard.vue
            isInputFront:false,
            isInputBack:false,
=======
            card:{"id":"","front":"","back":"","commnet":""},
>>>>>>> c7998963508dd62f1d97e56fcdd0c1aa66a9a789:src/components/AdenCard.vue
            cards:[{"id":"","front":"","back":""}]
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
<<<<<<< HEAD:src/components/Card/AdenCard.vue
                this.cards= response.data.cards;
=======
                this.cards= response.data.cards.pop();
>>>>>>> c7998963508dd62f1d97e56fcdd0c1aa66a9a789:src/components/AdenCard.vue
            })
        },
        CardInput(){
            event.preventDefault();
        }
    }
   
}
</script>
<style scoped>
.aden-container{
    height:100%;
    width:100%;
}
.flip-wrap{
    width:210px;
    height:220px;
    margin:0 auto;
    perspective:800px;
}
.flip{
    width:210px;
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
</style>

