<template>
    <div class='aden-container'>
        <div class='flip-wrap' v-for="card in cards" :key="card.id">
            <div class='flip'>
            <div class='card front'>
                {{card.front}}
            </div>
            <div class='card back'> 
                {{card.back}}
            </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name:'AdenCard',
    data(){
        return {
            cards:[{"id":"","front":"","back":""}]
        }
    },
    mounted(){
        this.GetData();
    },
    methods:{
        GetData(){
            this.$http.get('./data/testCard.json').then(response=>{
                this.cards= response.data.cards;
            })
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
.flip-wrap:hover .flip{
    transform:rotateY(180deg);
}

</style>

