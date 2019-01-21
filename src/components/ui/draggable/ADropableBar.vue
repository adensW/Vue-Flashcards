<template>
    <div class='dropable-bar dropzone'>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name:"ADropableBar"
}
</script>

<style>
    .dropable-bar{
        height: 36px;
    }
</style>
