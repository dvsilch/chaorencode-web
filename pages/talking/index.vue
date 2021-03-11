<template>
    <div class="main-box">
        <div class="talkings">
            <nuxt-link
                v-for="item in result"
                :key="item.id"
                class="item hover"
                :to="{ name: 'talking-id', params: { id: item.id } }"
            >
                <el-row type="flex">
                    <div class="detail">
                        <div>
                            <h2 class="title">{{ item.title }}</h2>
                            <p class="shortcut">{{ item.shortcut }}</p>
                        </div>
                        <div class="info">
                            <span class="right5">发布</span>
                            <span class="right15">{{
                                $common.beautifulTime(
                                    item.publish_time_timestamp,
                                )
                            }}</span>
                            <span class="right5">阅读</span>
                            <span>
                                {{ Math.floor(item.length / 300) }}分钟
                            </span>
                        </div>
                    </div>
                    <el-image
                        v-if="item.thumbnail_url"
                        class="thumbnail"
                        fit="cover"
                        :src="
                            $common.formatImgUrl({
                                url: item.thumbnail_url,
                                width: 400,
                                height: 200,
                            })
                        "
                    />
                </el-row>
            </nuxt-link>
            <i v-if="loding" class="el-icon-loading loading"></i>
            <p v-if="nomore" class="nomore">没有更多啦~~</p>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    async asyncData({ app }) {
        let page = 1
        const limit = 5
        let amount = 0
        let talkingResult = app.$guy.get('/talkings', { data: { page, limit } })

        talkingResult = await talkingResult

        let result = []
        if (talkingResult.status === 200) {
            result = talkingResult.data.result
            amount = talkingResult.data.amount
            page += 1
            // console.log(result)
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
    head() {
        return {
            title: '言语 - 超人编程',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    property: 'og:description',
                    content: '有趣的技术热点，编程知识，欢快的理论。',
                },
            ],
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
                this.result.push(...talkingResult.data.result)
                this.page += 1
            }
        },
    },
}
</script>

<style lang="stylus" scoped>
.main-box
    max-width 960px
    margin 0 auto
    padding 0 35px
    padding-top 100px

    @media only screen and (max-width 767px)
        padding-top 40px

    .talkings
        margin -25px

        @media only screen and (max-width 767px)
            margin -15px

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
            border-radius 6px
            padding 25px

            @media only screen and (max-width 767px)
                padding 15px

            .thumbnail
                width 300px
                height 168.75px
                margin-left 20px
                border-radius 4px

                @media only screen and (max-width 767px)
                    width 200px
                    height 112.5px
                    margin-left 10px

                @media only screen and (max-width 500px)
                    width 140px
                    height 78.75px
                    margin-left 10px

            .detail
                flex 1
                display flex
                flex-direction column
                justify-content space-between

                .info
                    font-size 14px
                    color $prompt-color

                    @media only screen and (max-width 767px)
                        font-size 12px

                .title
                    font-weight 700
                    line-height 1.4
                    margin-bottom 6px
                    overflow hidden
                    text-overflow ellipsis
                    display -webkit-box
                    -webkit-line-clamp 2
                    -webkit-box-orient vertical

                    @media only screen and (max-width 767px)
                        font-size 18px
                        margin-bottom 4px

                    @media only screen and (max-width 500px)
                        font-size 16px
                        margin-bottom 2px

                .shortcut
                    overflow hidden
                    text-overflow ellipsis
                    display -webkit-box
                    -webkit-line-clamp 2
                    -webkit-box-orient vertical

                    @media only screen and (max-width 767px)
                        -webkit-line-clamp 1
                        font-size 14px

                    @media only screen and (max-width 500px)
                        display none
</style>
