<template>
    <scrollactive class="nav-tab">
        <a
            v-for="option in options"
            :key="option.id"
            :href="'#' + option.id"
            class="scrollactive-item tab-item"
            >{{ option.name }}</a
        >
    </scrollactive>
</template>

<script>
import scrollactive from 'vue-scrollactive/src/scrollactive.vue'

export default {
    name: 'TabScroll',
    components: { scrollactive },
    props: {
        options: {
            type: Array,
            default() {
                return []
            },
        },
    },
    data() {
        return {
            player: null,
        }
    },
}
</script>
<style lang="stylus" scoped>
.nav-tab
    padding 10px 0
    position sticky
    top 0
    background $background
    display flex
    z-index 999
    .tab-item
        position relative
        font-size 22px
        line-height 1.4
        margin-right 10px
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
        width 70%
</style>
