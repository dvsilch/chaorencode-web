<template>
    <div class="container">
        <nuxt-link
            v-for="item in result"
            :key="item.id"
            class="item hover"
            :to="{ name: 'talking-id', params: { id: item.id } }"
        >
            <el-row type="flex">
                <el-image
                    v-if="item.thumbnail_url"
                    class="thumbnail"
                    :src="item.thumbnail_url"
                />
                <div class="detail">
                    <h2 class="title">{{ item.title }}</h2>
                    <p class="shortcut">{{ item.shortcut }}</p>
                </div>
            </el-row>
        </nuxt-link>
        <i v-if="loding" class="el-icon-loading loading"></i>
        <p v-if="nomore" class="nomore">没有更多啦~~</p>
    </div>
</template>

<script lang="ts">
export default {
    async asyncData({ app }) {
        let page = 1
        const limit = 10
        let amount = 0
        let talkingResult = app.$guy.get('/talkings', { data: { page, limit } })

        talkingResult = await talkingResult

        let result = []
        if (talkingResult.status === 200) {
            result = talkingResult.data.result
            amount = talkingResult.data.amount
            page += 1
        }

        return {
            page,
            limit,
            result,
            amount,
        }
    },
    data() {
        return {
            loding: false,
        }
    },
    computed: {
        nomore() {
            return this.amount === this.result.length
        },
    },
    mounted() {
        if (document.addEventListener) {
            document.addEventListener('DOMMouseScroll', this.listener, false)
        }
        window.onmousewheel = this.listener
    },
    methods: {
        listener() {
            // console.log('onmousewheel')
            const scrollT =
                document.body.scrollTop || document.documentElement.scrollTop // 兼容处理
            const currtTop = document.documentElement.clientHeight + scrollT
            // console.log(currtTop)
            // console.log(document.body.scrollHeight)
            // console.log(document.documentElement.clientHeight)
            if (currtTop >= document.body.scrollHeight) {
                // console.log('End')
                this.load()
            }
        },
        async load() {
            if (this.loading || this.nomore) return

            this.loding = true
            let talkingResult = this.$guy.get('/talkings', {
                data: { page: this.page, limit: this.limit },
            })
            talkingResult = await talkingResult
            this.loding = false

            if (talkingResult.status === 200) {
                this.result.push(talkingResult.data.result)
                this.page += 1
            }
        },
    },
}
</script>

<style lang="stylus" scoped>
.container
    max-width 960px
    margin 0 auto
    padding 0 25px
    padding-top 100px
    .loading, .nomore
        display block
        font-size 36px
        text-align center
        margin 60px auto
        color $weak-color
    .nomore
        font-size 14px
    .loading
        font-size 36px
    .item
        // margin-bottom 30px
        padding 15px
        .thumbnail
            width 300px
            height 168.75px
            margin-right 20px
            border-radius 4px
            @media only screen and (max-width: 767px)
                width 180px
                height 112.5px
                margin-right 14px
        .detail
            flex 1
            .title
                line-height 1.4
                margin-bottom 6px
                overflow hidden
                text-overflow ellipsis
                display -webkit-box
                -webkit-line-clamp 1
                -webkit-box-orient vertical
                @media only screen and (max-width: 767px)
                    font-size 18px
                    margin-bottom 4px
            .shortcut
                overflow hidden
                text-overflow ellipsis
                display -webkit-box
                -webkit-line-clamp 3
                -webkit-box-orient vertical
                @media only screen and (max-width: 767px)
                    -webkit-line-clamp 2
</style>
