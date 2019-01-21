<template>
    <div class='dropable-bar dropzone'>
        <div class='dropable-bar--item'>
            <slot></slot>
        </div>
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
