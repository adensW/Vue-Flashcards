<template>
    <div class='aden-container'>
        <div class='flip-wrap'
        v-bind:class="{'flip-wrap-touch':flip}" 
        v-for="card in cards" 
        :key="card.id"
        >
            <div class='flip'>
                <div class='card front'>
                    <textarea  class="card-display" v-model="card.front"></textarea>
                </div>
                <div class='card back'> 
                    <textarea  class="card-display" v-model="card.back"></textarea>
                </div>
            </div>
             <div v-on:click="flip=!flip">flip</div>
        </div>
    </div>
</template>

<script>
// import {GetCard} from '@/service/CardStore.js'

export default {
    name:'AdenCard',
    data(){
        return {
            flip:false,
            cards:[{"id":"","front":"","back":""}]
        }
    },
    mounted(){
        this.GetData();
    },
    methods:{
        GetData(){
            // this.cards = GetCard({"index":0,"pageSize":10});
            this.$http.get('./data/testCard.json').then(response=>{
                this.cards= response.data.cards.pop();
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
    border:none;
}
</style>

