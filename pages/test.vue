<template>
    <div class="box maxwidth">
        <a
            href="https://open.weixin.qq.com/sns/explorer_broker?appid=wx1d233f097b746a03&redirect_uri=https%3a%2f%2fchaorencode.com%2f&response_type=code&scope=snsapi_userinfo&state=STATE_685333#wechat_redirect"
            >AAA</a
        >
        <!-- wx1d233f097b746a03 -->
    </div>
</template>

<script lang="ts">
export default {
    layout: 'none',
    head() {
        return {
            title: '超人编程',
        }
    },
    methods: {
        open() {
            const el = document.createElement('textarea')
            el.value = `助力${this.$route.query.behelp}`
            document.body.appendChild(el)
            el.select()
            document.execCommand('copy')
            document.body.removeChild(el)

            window.location.href =
                'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU3ODIyMjc1MA==#wechat_redirect'
        },
    },
}
</script>

<style lang="stylus" scoped>
.box
    display flex
    flex-direction column
    align-items center
    margin-top 20vh
    .gzh
        width 180px
        height 180px
        border-radius 90px
        border 14px solid #d5dfe8
        margin-bottom 10px
    .info
        margin-bottom 10px
        .red
            color red
</style>
