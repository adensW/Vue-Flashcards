<template>
    <div class="container--template">
        <div class='AClayout'>
            <card-list-item 
                v-bind:front="cards.front"
                v-on:input="cards.front=$event"
            >
            </card-list-item>
        </div>
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
            "cards":
            {
                "id":"",
                "front":"tetsetsmoremroemoreasesttestmoermoeasdasdasdasdaasdasd"+
                    "setssdssdasdadsadasdasdaasdasdasdsadasdasdasdasd"+
                    "asdasdasdsgsdfgdjytjsdfgcvbtsrtadfdfSeregdfg",
                "back":"",
                "comment":""
            }
        }
    },
    methods:{

    }
}
</script>
<style scoped>

</style>

