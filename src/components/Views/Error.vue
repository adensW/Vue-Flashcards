<template>
    <div>
        Error<br>
        {{code}}NotFound<br>
        {{message}}<br>
    </div>
</template>

<script>
export default {
    name:'Error',
    data(){
        return{
            code:404,
            message:'error occuerd,please try later'
        }
    }
}
</script>

<style>

</style>
