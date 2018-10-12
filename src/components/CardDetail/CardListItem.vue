<template>
    <div class="container--template">
        <div class='flip__wrap'
            v-bind:class="{'flip__wrap--flip':flip}" 
            >
                <div class='flip__container flipcard--animflip'
                
                 >
                    <div class='flipcard flipcard--front'>
                        <textarea class="flipcard__textarea front"
                            
                            id='textarea-front'
                            v-if='!flip'
                            v-model="data_card.front"
                            v-on:input="$emit('frontinput',$event.target.value)"
                            v-bind="{'readonly':flip}"
                             v-on:click.stop='focus'
                         >
                         </textarea>
                    </div>
                    <div class='flipcard flipcard--back'> 
                        <textarea class="flipcard__textarea back"
                            id='textarea-back'
                            v-if='flip'
                            v-model="data_card.back"
                            v-on:input="$emit('backinput',$event.target.value)"
                            v-bind="{'readonly':!flip}"
                             v-on:click.stop='focus'
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
    props:['card','flip'],
    data(){
        return{
            is_focus:false,
            data_card:
            {
                id:"",
                front:"",
                back:"",
                comment:""
            }
        }
    },
    mounted(){
        this.initCard();
    },
    methods:{
        initCard(){
            this.data_card=this.card;
        },
        focus:function(event){
            let back = document.getElementById('textarea-back');
            let front = document.getElementById('textarea-front');
           
                if(this.flip){
                    back.focus();
                    this.is_focus=true;
                    // console.log(this.is_focus)
                }else{
                    front.focus();
                    this.is_focus=true;
                    // console.log(this.is_focus)
                }
            
        },
        lostfocus:function(event){
            if(event.target.id==='textarea-front'&&this.flip==false){
                this.is_focus=false;
            }else if(event.target.id==='textarea-back'&&this.flip==true){
                 this.is_focus=false;
            }
            console.log(this.is_focus)
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
    position: absolute;/*让背面和正面重叠*/
   
}
.flipcard--animflip{
    /*backface-visibility:hidden;背对屏幕时隐藏*/
     
    transition: all 1s ease; /*为翻牌添加过渡效果*/
    transform-style: preserve-3d; /*子元素将保留其 3D 位置。*/   
}
.flipcard--front{
    z-index: 2;
    background-color: aquamarine;
}
.flipcard--back{
    z-index:1;
    transform: rotateY(180deg);
    background-color: burlywood;
}
.flipcard__textarea{
    width:100%;
    height:100%;
}
@keyframes anim-flip {
    0% {transform:rotateY(0deg);}
   

    100% {transform:rotateY(180deg);}
}
</style>
