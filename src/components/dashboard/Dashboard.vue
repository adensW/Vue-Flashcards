<template>
    <div class='container--tempalte'>
        <div v-if="loading">
            loading
        </div>
         <div v-if="error">
            error
        </div>
        <div v-if="sets" class='container--flex'>
            <div v-for="set in sets" 
            :key="set.id"
            class='flex__item'
            >
            <router-link :to="{name:'card',params:{id:set.id}}">
            <div class='folder shadow--2 shadow__hoverable'>
                <i><input value="123"  @input.capture="name_input" class='folder__name'/></i>
            </div>
            </router-link>
            </div>
            <div class='flex__item'>
                <div class='folder--outline shadow--2 shadow__hoverable'>
                    <i><v-btn outline fab color='#1f7cda' @click="add"><v-icon dark>add</v-icon></v-btn></i>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import debounce from 'lodash.debounce'
export default {
    name:'Dashboad',
    data(){
        return{
            error:false,
            loading:true,
            sets:[
            ]
        }
    },
    created(){
        this.init();
    },
    mounted(){
    },
    methods:{
        init:function(){
            this.$aidb.open('DB_Vue_FlashCard').getAll("Sets").then((data)=>{
                this.$store.commit("initSets",data)
                this.sets =this.$store.getters.AllSets
                this.loading = false;
            })
        },
        add:function(){
            let item = {
                id:this.$uuid.v1(),
                name:""}
            this.$store.dispatch("addSet",item);
        },
        name_input:debounce(function(e){
            console.log(e.target.value)
        })
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
    z-index: 1;
    position: relative;
    top: 1rem;
    left: 0;
    /* color: rgba(255, 192, 203, 0.685); */
    background: #eee;
    width: 9rem;
    height: 6.5rem;
    box-sizing: border-box;
    border: 8px solid #82befa;
    border-top-width: 2rem;
    border-radius: 0 3.25px 3.25px;
    transition: border-top-width 0.3s, transform ;
    transform-origin: 0% 100%;
    cursor: pointer;
}
.folder--outline{
    background-color: #bbd9f7;
    border: 1px dashed  #1f7cda;
    position: relative;
    width:9rem;
    height:6.5rem;
    border-radius: 0 3.25px 3.25px;
    cursor: pointer;
    text-align: center;
}
.folder--outline:before{
    background: #bbd9f7;
    content: " ";
}
.folder:before,
.folder:after {
  content: '';
  background: #82befa;
}
.folder--outline:before,
.folder:before,
.folder:after,
.folder i {
  position: absolute;
}
.folder--outline:before{
     z-index: 0;
    width: 4rem;
    height: 0.8rem;
    bottom:6.3rem;
    left: -1px;
    border: 1px dashed #1f7cda;
    border-bottom: none;
    border-radius: 3.25px 3.25px 0 0;
}
.folder:before {
    z-index: 0;
    width: 4rem;
    height: 0.8rem;
    bottom:5.5rem;
    left: -8px;
    border-radius: 3.25px 3.25px 0 0;
}
@media screen and (min-width: 800px) {
    .folder:before {
    
    height: 0.6rem;
    bottom:6rem;
    }
}
.folder i,
.folder:after {
    z-index: 1;
    width: 9rem;
    height: 6rem;
    line-height: 6rem;
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
  z-index: 2;
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
.folder--muti::after{
    content: " ";
    float: left;
    background-color: black;

}
</style>
