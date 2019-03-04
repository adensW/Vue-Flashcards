<template>
    <div>
        <div v-for="obj in ObjEntries" :key="obj.id">
            <label>{{obj.key}}</label>
            <input @input="input" :id="obj.id" :value="obj.value"/>
        </div>
    </div>
</template>

<script>
import _ from "lodash";
export default {
name:"ControllerPanel",
props:["id","status"],
data(){
    return {
        componentId:this.id||this.status.id||"",
        componentStatus:this.status||[
            {"id":"1","key":"id","value":"","type":"id"},
            {"id":"2","key":"left","value":"0","type":"number"},
            {"id":"3","key":"top","value":"0","type":"number"},
            {"id":"4","key":"width","value":"100","type":"number"},
            {"id":"5","key":"height","value":"100","type":"number"},
            {"id":"6","key":"backgroundColor","value":"#fff","type":"color"},
            {"id":"7","key":"borderColor","value":"#fff","type":"color"},
            {"id":"8","key":"borderWidth","value":"0","type":"number"},
            ],
        selfWidth:100,
        selHeight:100,
    }
},
watch:{
    id:function(val){
        this.componentId = val
    },
    status:function(val){
        this.componentStatus = val
    },
},
computed:{
    ObjEntries:{
        get:function(){
            return this.componentStatus
        },
        
    }
},
methods:{
    input:_.debounce(function(e) {
        let sta= this.componentStatus.find(elem=>{
            return elem.id==e.target.id
        })
        sta.value = e.data
        }, 500),
    }
}
</script>

<style>

</style>
