<template>
    <div>今年以过去{{PastDays}}/{{TotalDays}}:{{DatePercent}}%</div>
</template>

<script>
export default {
    Name:"DateReminder",
    data(){
        return {
           
        }
    },
    computed:{
        PastDays:function(){
            let year = new Date().getFullYear();
            let mouth = new Date().getMonth();
            let days = 0;
            for (let i =1;i<= mouth;i++) {
                days+=new Date(year,i,0).getDate();
            }
            if(mouth>2){
                days+=this.isLeapYear(year);
            }
            days+=new Date().getDate();
            return days;
        },
        TotalDays:function(){
            return 365+this.isLeapYear(new Date().getFullYear())
        },
        DatePercent:function(){
            return ((this.PastDays/this.TotalDays)*100).toFixed(4);
        }
    },
    methods:{
        isLeapYear(year){
            return (year%100==0?(year%400==0?1:0):(year%4==0?1:0));
        },
        
    }
}
</script>

<style>

</style>
