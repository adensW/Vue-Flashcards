<template>
    <div class='box'>
        <div class='card front'>
            {{cards[0].front}}
        </div>
        
        <div class='card back'> 
            {{cards[0].front}}
        </div>
    </div>
    
</template>

<script>

export default {
    name:'AdenCard',
    data(){
        return {
            cards:[null]
        }
    },
    mounted(){
        this.GetData();
    },
    methods:{
        GetData(){
            this.$http.get('./data/testCard.json').then(response=>{
                this.cards= response.data.cards;
            }).catch(response=>{

                // console.log("error");
            })
        }
    }
   
}
</script>
<style scoped>
.box{
    display: inline-block;
    width:20rem;
    height:20rem;
    background-color: aquamarine;
}
</style>

