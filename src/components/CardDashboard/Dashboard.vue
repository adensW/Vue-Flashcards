<template>
    <div class='container--tempalte'>
        <div class='container--flex'>
            <div v-for="set in sets" 
            :key="set.id"
            class='flex__item '
            >
            <router-link :to="{name:'card',params:{id:set.id}}">
            <div class='folder shadow--2 shadow__hoverable'>
                <i><div class='folder__name'>{{set.name}}</div></i>
            </div>
            </router-link>
           

                <!-- <div class='folder__bar'>
                    <div>...</div><div>+</div>                    
                </div> -->
            </div>
            <div class='flex__item '>
                <div class='folder--outline shadow--2 shadow__hoverable'>
                    <i><v-btn round fab color='pink'> <v-icon dark>add</v-icon></v-btn></i>
                </div>
                 
            </div>
           
        </div>
        
    </div>
</template>
<script>
export default {
    name:'Dashboad',
    data(){
        return{
            sets:[
                {
                    id:0,
                    name:"English",
                    type:0,
                   
                },
                {
                    id:1,
                    name:"Internet",
                    type:0,
                    
                },
                 {
                    id:2,
                    name:"MySQL",
                    type:0,
                   
                },
                {
                    id:3,
                    name:"Poem",
                    type:1,
                    
                }
            ]
            
        }
    },
    mounted(){
        this.init();
    },
    methods:{
        init:function(){
            
        }
    }
    
}
</script>
<style scoped>
.container--flex{
    display: flex;
    justify-content:left;
    flex-wrap: wrap;
}
.flex__item{
    margin-right: 4rem;
    margin-bottom: 4rem;
}
.folder{
    position: relative;
    top: 2rem;
    left: 0;
    background: #eee;
    width: 20rem;
    height: 10rem;
    box-sizing: border-box;
    border: 8px solid #82befa;
    border-top-width: 2rem;
    border-radius: 0 3.25px 3.25px;
    transition: border-top-width 0.3s, transform ;
    transform-origin: 0% 100%;
    cursor: pointer;
}
.folder--outline:before{
    background-color: transparent;
    border: 2px solid #80befa
}
.folder:before,
.folder:after {
  content: '';
  background: #82befa;
}
.folder:before,
.folder:after,
.folder i {
  position: absolute;
}
.folder:before {
    width: 6.5rem;
    height: 1rem;
    bottom: 9rem;
    left: -8px;
    border-radius: 3.25px 3.25px 0 0;
}
.folder i,
.folder:after {
  width: 20rem;
  height: 9rem;
  line-height: 10rem;
  text-align: center;
  bottom: -8px;
  left: -8px;
  transition: transform 0.2s, background 0.2s;
  transform-origin: 0% 100%;
}
.folder:after {
  background: #63a7eb;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 3.25px;
}
.folder i {
  z-index: 1;
  
  color: #437eba;
  font-size: 2rem;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.25);
}
.folder:hover {
  border-top-width: 8px;
}
.folder:hover:after,
.folder:hover i {
  transform: scaleY(0.85) skewX(-15deg);
}
.folder:hover:after {
  background: #5f9fe0;
}

.shadow__hoverable{
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
}
.shadow__hoverable:hover{
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}
.shadow--1{
     box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
}
.shadow--2{
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}
.shadow--3{
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
}
.shadow--4{
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}
.shadow--5{
    box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
}
.folder--muti{
    /* background-color: burlywood; */
}
.folder--muti::after{
    content: " ";
    float: left;
    background-color: black;

}
</style>
