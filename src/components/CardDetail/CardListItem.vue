<template>
    <div class="container--template">
        <div class='flip__wrap'
            v-bind:class="{'flip__wrap--flip':flip}" 
            >
                <div class='flip__container'>
                    <div class='flipcard flipcard--front'>
                        <textarea class="flipcard__textarea"
                            v-model="card_front"
                            v-on:input="$emit('input',$event.target.value)"
                         >
                         </textarea>
                    </div>
                    <div class='flipcard flipcard--back'> 
                        <textarea class="flipcard__textarea"
                            v-model="card_back"
                         >
                         </textarea>
                    </div>
                </div>
            </div>
    </div>
</template>
<script>
export default {
    name:"CardListItem",
    props:['id','front','back','comment'],
    data(){
        return{
            flip:false,
            card_id:"",
            card_front:"",
            card_back:"",
            card_commnet:"",
        }
    },
    mounted(){
        this.initCard();
    },
    methods:{
        initCard(){
            this.card_front=this.front;
            
        }
    }    
}
</script>
<style scoped>
.flip__wrap{
    width:200px;
    height:200px;
    margin:0 auto;
    perspective:800px;
}
.flip__container{
    height:100%;
    width:100%;
    
}
.flipcard{
    width:100%;
    height:100%;
    position: absolute;/*让背面和正面重叠*/
}
.flipcard--front{
    z-index: 2;
    background-color: aquamarine;
}
.flipcard--back{
    transform: rotateY(180deg);
    background-color: burlywood;
}
.flipcard__textarea{
    width:100%;
    height:100%;
}
</style>
