<template>
    <div class="container--template">
        <div class='flip__wrap'
             v-bind:class="{'flip__wrap--flip':flip}" >
            <div class='flip__container flipcard--animflip'>
                <div class='flipcard flipcard--front'
                        v-bind:class="{'flipcard__pointevent':flip}">
                        <textarea class="flipcard__textarea front"
                            v-bind:id="frontID"
                            v-if='!flip'
                            v-model="data_card.front"
                            @input.self="front_input"
                            v-bind="{'readonly':flip}"
                            v-on:click.stop='focus'>
                         </textarea>
                          <div class="flipcard__displayarea"
                             v-if='flip'>
                            {{data_card.front}}
                         </div>
                </div>
                <div class='flipcard flipcard--back'
                        v-bind:class="{'flipcard__pointevent':!flip}"> 
                        <textarea class="flipcard__textarea back"
                            v-bind:id="backID"
                            v-if='flip'
                            v-model="data_card.back"
                            @input.self="back_input"
                            v-bind="{'readonly':!flip}"
                             v-on:click.stop='focus'>
                         </textarea>
                         <div class='flipcard__displayarea'
                             v-if='!flip'>
                            {{data_card.back}}
                         </div>
                </div>
            </div>
        </div>
        <div class='card__foot' >
             <button class='a-btn' @click='flip=!flip'>flip</button> 
        </div>
    </div>
</template>
<script>
import _ from 'lodash.debounce'
export default {
    name:"CardListItem",
    props:['card'],
    data(){
        return{
            is_focus:false,
            frontID:"",
            backID:"",
            data_card:
            {
                id:"",
                front:"",
                back:"",
                comment:""
            },
            pointevents:{
                'pointer-events': 'none'
            },
            flip:false
        }
    },
    mounted(){
        this.initCard();
    },
    methods:{
        initCard(){
            this.data_card=this.card;
            this.frontID = "textarea-front-"+this.card.id;
            this.backID = "textarea-back-"+this.card.id;
        },
        focus:function(event){
            event.target.focus();
            this.is_focus=true;
        },
        front_input:_(function(e){
            this.data_card.front = e.target.value;
            this.update();
        },300),
        back_input:_(function(e){
             this.data_card.back = e.target.value;
             this.update();
        },300),
        update:function(){
            this.$store.dispatch('updateCard',this.data_card)
        }
    }    
}
</script>
<style scoped>
.flipcard__pointevent{
    pointer-events: none;
}
.flip__wrap{
    width: 100%; 
    height:90%; 
    /* width: 60vw; 
    height:70vh; */
    margin:0 auto;
    perspective:800px;
}
.flip__wrap--flip .flipcard--animflip{
    transform:rotateY(180deg);
}
.flip__container{
    height:100%;
    width:100%;
}
.flipcard{
    width:100%;
    height:100%;
}
.flipcard--animflip{
    /*backface-visibility:hidden;背对屏幕时隐藏*/
    transition: all 1s ease; /*为翻牌添加过渡效果*/
    transform-style: preserve-3d; /*子元素将保留其 3D 位置。*/   
}
.flipcard--front{
    z-index: 2;
    position: absolute;/*让背面和正面重叠*/
    background-color: aquamarine;
}
.flipcard--back{
    position: absolute;/*让背面和正面重叠*/
    transform: rotateY(180deg);
    background-color: aquamarine;
}
.flipcard__textarea{
    width:100%;
    height:100%;
}
.flipcard__displayarea{
    overflow-wrap: break-word;
}
@keyframes anim-flip {
    0% {transform:rotateY(0deg);}
    100% {transform:rotateY(180deg);}
}
</style>
