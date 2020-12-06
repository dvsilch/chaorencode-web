<template>
    <div class="aspect" :style="`padding-bottom: ${(y / x) * 100}%`">
        <!-- <div class="box"> -->
        <!-- <slot class="box"></slot> -->
        <slot></slot>
        <!-- </div> -->
    </div>
</template>
<script>
export default {
    name: 'Aspect',
    props: {
        x: {
            type: Number,
            default: 1,
        },
        y: {
            type: Number,
            default: 1,
        },
    },
}
</script>
<style lang="stylus" scoped>
.aspect
    position relative
.aspect>:first-child
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    // .box
    //     position absolute
    //     top 0
    //     left 0
    //     width 100%
    //     height 100%
</style>
