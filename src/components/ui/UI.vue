<template>
    <div>
        <div class='ui--small '>
            <div class='circle__outer'>

            </div>
            <div class="circle__inner"></div>

        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.ui--small{
    display:block;
    width:50px;
    height:50px;
    vertical-align: middle;
    text-align: center;
    vertical-align: middle;
}
.circle__outer{
   /* float: left; */
    width:24px;
    height:24px;
    border-radius:50%;
    border: 8px solid rgb(255, 100, 0);
    /* background-color: aliceblue; */
    z-index: 10;
}
.circle__outer:hover{

    border: 8px solid rgb(255, 100, 0);

}

.circle__inner{
    width:12px;
    height:12px;
    border-radius: 50%;
    background-color: rgb(255, 100, 0);
   
    position: relative;
    top: -16px;
    left: 6px;
}
/* .circle__inner:hover{
    background-color: #fff;
} */
@keyframes circle2torus {
    0%{
        width:25px;
        height:25px;
        border-radius:50%;
        background-color:rgb(255, 100, 0);
    }
    50%{
         width:26px;
        height:26px;
        border: 10px solid rgb(255, 100, 0);
        border-radius:50%;
    }
    100%{
        width:30px;
        height:30px;
        border: 5px solid rgb(255, 100, 0);
        border-radius:50%;
    }
}
.circle:hover{
    animation: circle2torus 0.5s;
    animation-fill-mode: forwards;

}
.torus{
    border: 10px solid rgb(255, 100, 0);
    border-radius:50%;
}
</style>
