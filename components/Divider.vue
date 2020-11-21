<template>
    <div class="divider" :style="`margin: ${gap}px auto`"></div>
</template>
<script>
export default {
    name: 'Divder',
    props: {
        gap: {
            type: Number,
            default: 0,
        },
    },
}
</script>
<style lang="stylus" scoped>
.divider
    height 1px
    width 100%
    background-color $divider-color
</style>
