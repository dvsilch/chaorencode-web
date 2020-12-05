<template>
    <div class="backtop">
        <div class="button" :class="{ show: isShow }" @click="scrollTop">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-top"></use>
            </svg>
        </div>
    </div>
</template>
<script>
export default {
    name: 'BackTop',
    props: {
        distance: {
            type: Number,
            default: 200,
        },
    },
    data() {
        return {
            isShow: false,
        }
    },
    mounted() {
        document.body.onscroll = this.listener
    },
    destroyed() {
        document.body.onscroll = null
    },
    methods: {
        scrollTop() {
            document.documentElement.scrollTop = document.body.scrollTop = 0
        },
        listener() {
            const scrollTop =
                document.documentElement.scrollTop || document.body.scrollTop
            this.isShow = scrollTop > this.distance
        },
    },
}
</script>
<style lang="stylus" scoped>
.backtop
    position absolute
    right 25px
    @media only screen and (max-width 767px)
        right 20px
    width 40px
    height 40px
    .button
        z-index 999
        cursor pointer
        position fixed
        background $divider-color
        bottom -50px
        color white
        font-size 30px
        line-height 30px
        padding 5px
        border-radius 4px
        opacity 0
        transition all 1400ms ease
    .show
        opacity 1 !important
        bottom 10vh !important
</style>
