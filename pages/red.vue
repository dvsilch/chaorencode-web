<template>
    <div class="box maxwidth">
        <el-image class="gzh" src="/logo.png" fit="contain" />
        <div class="info">
            <span>关注公众号超人编程并发消息：</span>
            <span class="red">助力{{ $route.query.behelp }}</span>
        </div>
        <p class="prompt">切记要发消息才能助力成功</p>
        <el-button type="primary" @click="open">一键复制并打开公众号</el-button>
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
        .red
            color red
            font-weight 700
    .prompt
        color blue
        font-size 14px
        margin-bottom 20px
</style>
