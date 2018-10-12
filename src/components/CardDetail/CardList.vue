<template>
    <div class="container--template">
        <div class='AClayout'>
            <card-list-item 
                v-bind:flip="flip"
                v-bind:card="cards"

                v-on:frontinput="cards.front=$event"
                v-on:backinput="cards.back=$event"
            >
            </card-list-item>
        </div>
        <button v-on:click="flip=!flip">flip</button>
    </div>
</template>
<script>
import CardListItem from './CardListItem'
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
    methods:{

    }
}
</script>
<style scoped>

</style>

