<template>

    <div>
        <div>
            {{Year}}年{{Mouth}}月{{Day}}日
        </div>
        <div>
            {{Hours}}:{{Minutes}}:{{Seconds}}
        </div>
        <div>
            {{Week}}
        </div>
    </div>
</template>

<script>
export default {
    name:"AClock",
    components:{

    },
    prop:{

    },
    data(){
        return {
            Timer:new Date().toLocaleString(),
            Year:"0000",
            Mouth:"00",
            Day:"00",
            Week:"",
            Hours:"00",
            Minutes:"00",
            Seconds:"00",
        }
    },
    mounted(){
        this.tik()
    },
    methods:{
        tik(){
            var weekday=new Array(7);
            weekday[0]="星期日";
            weekday[1]="星期一";
            weekday[2]="星期二";
            weekday[3]="星期三";
            weekday[4]="星期四";
            weekday[5]="星期五";
            weekday[6]="星期六";
            setInterval(() => {
                this.Year = new Date().getFullYear();
                this.Mouth = new Date().getMonth()+1;
                this.Day = new Date().getDate();
                this.Week = weekday[new Date().getDay()]
                this.Hours= new Date().getHours();
                this.Minutes = new Date().getMinutes();
                this.Seconds = new Date().getSeconds();
            }, 500);
        }
    }
}
</script>

<style>

</style>
