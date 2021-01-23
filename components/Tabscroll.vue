<template>
    <scrollactive :offset="80" class="nav-tab">
        <a
            v-for="anchor in anchors"
            :key="anchor.id"
            :href="'#' + anchor.id"
            class="scrollactive-item tab-item hover"
            >{{ anchor.name }}</a
        >
    </scrollactive>
</template>

<script>
import scrollactive from 'vue-scrollactive/src/scrollactive.vue'

export default {
    name: 'TabScroll',
    components: { scrollactive },
    props: {
        anchors: {
            type: Array,
            default() {
                return []
            },
        },
    },
}
</script>
<style lang="stylus" scoped>
.nav-tab
    padding 5px 0
    position sticky
    top 0
    background $background
    display flex
    z-index 999
    margin-left -10px
    box-shadow rgba(0, 0, 0, .1) 0px 1px 0px

    // 超出范围时显示滚动条
    @media only screen and (max-width 767px)
        overflow-x auto
        white-space nowrap
        padding 15px 0

    @media only screen and (max-width 500px)
        margin-left -8px

    .tab-item
        padding 4px 10px
        position relative
        font-size 22px
        line-height 1.4
        margin-right 20px

        @media only screen and (max-width 500px)
            padding 3px 8px
            font-size 18px
            margin-right 14px

    .tab-item::before
        transition all 600ms ease
        content ''
        position absolute
        height 3px
        width 0
        background $first-color
        bottom -2px
        margin 0 auto
        left 0
        right 0

    .is-active.tab-item::before
        width 50%
</style>
