<template>
    <button class='a-btn' @click="$emit('click')">
        {{fab}}
        <slot></slot>
    </button>
</template>

<script>
export default {
    name:"ABtn",
    props:['fab']
}
</script>

<style>

</style>
