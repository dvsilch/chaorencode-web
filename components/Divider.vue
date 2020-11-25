<template>
    <div>
        <div
            class="divider hidden-sm-and-down"
            :style="`margin: ${gap}px auto`"
        ></div>
        <div
            class="divider hidden-md-and-up"
            :style="`margin: ${gap / 2}px auto`"
        ></div>
    </div>
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
