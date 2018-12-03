<template>
    <div>
        <div class='ui--small '>
            <div class='circle'></div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.ui--small{
    display:inline-block;
    width:50px;
    height:50px;
    vertical-align: middle;
    text-align: center;
    vertical-align: middle;
}
.circle{
    width:26px;
    height:26px;
    border-radius:50%;
    border: 12.5px solid rgb(255, 100, 0);

}
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
