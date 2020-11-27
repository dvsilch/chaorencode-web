<template>
    <scrollactive :offset="50" class="nav-tab">
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
    .tab-item
        padding 4px 10px
        position relative
        font-size 22px
        line-height 1.4
        margin-right 20px
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
