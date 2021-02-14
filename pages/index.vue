<template>
    <div class="container maxwidth">
        <el-row type="flex">
            <div class="carousels">
                <!-- <div class="aspect-carousels"> -->
                <Aspect class="header" :x="16" :y="9">
                    <el-carousel
                        class="block"
                        height="100%"
                        :interval="5000"
                        arrow="never"
                    >
                        <el-carousel-item
                            v-for="carousel in carousels"
                            :key="carousel.id"
                        >
                            <a
                                :href="carousel.jump_url"
                                target="_blank"
                                style="height: 100%"
                            >
                                <el-image
                                    class="carousel"
                                    :src="
                                        $common.formatImgUrl({
                                            url: carousel.carousel_url,
                                            width: 700,
                                            height: 400,
                                        })
                                    "
                                    fit="cover"
                                />
                            </a>
                        </el-carousel-item>
                    </el-carousel>
                </Aspect>
                <!-- </div> -->
            </div>
            <div class="talkings hidden-xs-only">
                <h4 class="label">阅读更多，聪明更多</h4>
                <nuxt-link
                    v-for="(item, index) in talkings"
                    :key="item.id"
                    target="_blank"
                    class="item hover"
                    :class="{ 'hidden-sm-and-down': index >= 2 }"
                    :to="{ name: 'talking-id', params: { id: item.id } }"
                >
                    <el-row type="flex">
                        <div class="detail">
                            <h2 class="title">{{ item.title }}</h2>
                            <!-- <p class="shortcut hidden-sm-and-down">
                            {{ item.shortcut }}
                        </p> -->
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
            </div>
        </el-row>
        <Divider class="hidden-sm-and-up" :gap="60" />
        <div class="hidden-sm-and-up">
            <h2>阅读更多，聪明更多</h2>
            <div class="talkings-bottom">
                <div v-for="item in talkings" :key="item.id" class="item hover">
                    <nuxt-link
                        target="_blank"
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
                </div>
            </div>
        </div>
        <Divider :gap="60" />
        <div class="block">
            <h2>🎉开启你的编程学习之旅</h2>
            <el-row class="courses">
                <el-col
                    v-for="course in courses"
                    :key="course.id"
                    class="col hover"
                    :span="12"
                    :sm="8"
                    :md="6"
                >
                    <nuxt-link
                        target="_blank"
                        :to="{ name: 'course-id', params: { id: course.id } }"
                    >
                        <Aspect :x="1" :y="1">
                            <div class="course">
                                <el-image
                                    class="image"
                                    :src="
                                        $common.formatImgUrl({
                                            url: course.image_url,
                                            width: 278,
                                            height: 156,
                                        })
                                    "
                                    fit="cover"
                                />
                                <div class="info">
                                    <h3 class="title">{{ course.name }}</h3>
                                    <p class="lang">{{ course.language }}</p>
                                </div>
                            </div>
                        </Aspect>
                    </nuxt-link>
                </el-col>
            </el-row>
        </div>
        <Divider :gap="60" />
        <div class="block">
            <h2>✨学编程，从这里开始</h2>
            <el-row class="intros" type="flex" justify="space-around">
                <el-col :md="4" :span="24" class="intro">
                    <el-image class="icon" src="/icon/book.svg" fit="contain" />
                    <p class="title">教科书式的教程</p>
                    <p class="detail">
                        参考教科书的结构书写的教程，保证了全面又循序渐进。
                    </p>
                </el-col>
                <el-col :md="4" :span="24" class="intro">
                    <el-image
                        class="icon"
                        src="/icon/video.svg"
                        fit="contain"
                    />
                    <p class="title">视频讲解</p>
                    <p class="detail">
                        回归课堂之上，让老师帮我们提炼重点，讲解疑难点。
                    </p>
                </el-col>
                <el-col :md="4" :span="24" class="intro">
                    <el-image class="icon" src="/icon/test.svg" fit="contain" />
                    <h3 class="title">实战与解析</h3>
                    <p class="detail">
                        有学必有练，有练必有答。通过课后的实战巩固我们的知识点，用实战代替记忆。
                    </p>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    async asyncData({ app }) {
        const page = 1
        const limit = 3
        let talkingResult = app.$guy.get('/talkings', { data: { page, limit } })
        let carouselsResult = app.$guy.get('/carousels')
        let coursesResult = app.$guy.get('/courses')

        carouselsResult = await carouselsResult
        coursesResult = await coursesResult
        talkingResult = await talkingResult

        let talkings = []
        if (talkingResult.status === 200) {
            talkings = talkingResult.data.result
            // talkings = talkings.concat(talkings)
            // talkings = talkings.concat(talkings)
            // talkings = talkings.slice(0, 3)
        }

        let carousels = []
        if (carouselsResult.status === 200) {
            carousels = carouselsResult.data.result
        }

        let courses = []
        if (coursesResult.status === 200) {
            courses = coursesResult.data.result
        }

        return {
            courses,
            carousels,
            talkings,
        }
    },
}
</script>

<style lang="stylus" scoped>
.container
    h2
        margin-bottom 40px

        @media only screen and (max-width 991px)
            font-size 20px
            margin-bottom 30px

        @media only screen and (max-width 767px)
            font-size 18px
            margin-bottom 20px

    .carousels
        width 680px

        @media only screen and (max-width 991px)
            width 452px

        @media only screen and (max-width 767px)
            width 100%

        .carousel
            height 100%
            width 100%
            border-radius 6px

    .talkings
        flex 1
        word-break break-all

        @media only screen and (min-width 768px)
            padding-left 26px

        .item
            padding 14px
            margin 0 -14px

            @media only screen and (max-width 991px)
                padding 12px
                margin 0 -12px

            .thumbnail
                width 150px
                height 90px
                margin-left 20px
                border-radius 4px

                @media only screen and (max-width 1145px)
                    display none

            .detail
                height 92px
                flex 1
                display flex
                flex-direction column
                justify-content space-between

                .info
                    font-size 14px
                    color $prompt-color

                .title
                    line-height 1.4
                    margin-bottom 2px
                    overflow hidden
                    text-overflow ellipsis
                    display -webkit-box
                    -webkit-line-clamp 2
                    -webkit-box-orient vertical
                    font-size 18px
                    font-weight 700
                    // @media only screen and (max-width: 991px)
                    // font-size 22px
                    // margin-bottom 0

    .talkings-bottom
        margin -15px

        .item
            // margin-bottom 30px
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

    .courses
        margin -24px

        // .col:hover
        // background $hover-color
        // border-radius 4px
        .col
            padding 24px

        @media only screen and (max-width 991px)
            margin -16px

            .col
                padding 16px

        .course
            border-radius 4px
            background rgb(249, 245, 241) !important

            .image
                width 100%
                height 56.25%
                border-top-left-radius 4px
                border-top-right-radius 4px

            .info
                padding 12px
                padding-top 0
                display flex
                flex-direction column
                justify-content space-between
                height 43.75%

                .title
                    font-size 20px
                    overflow hidden
                    text-overflow ellipsis
                    display -webkit-box
                    -webkit-line-clamp 2
                    -webkit-box-orient vertical

                    @media only screen and (max-width 620px)
                        font-size 16px

                .lang
                    color $weak-color
                    font-size 16px

                    @media only screen and (max-width 991px)
                        font-size 14px

                    @media only screen and (max-width 767px)
                        font-size 12px

    .course:hover
        background $hover-color

    .intros
        flex-wrap wrap
        background rgb(249, 245, 241)
        padding 100px 15px
        border-radius 6px

        .intro
            text-align center

            .icon
                margin-bottom 20px
                width 80px
                height 80px

            // .icon1
            // width 80px
            // .icon2
            // width 90px
            // .icon3
            // width 70px
            .title
                font-size 20px
                font-weight 700
                margin-bottom 10px

            .detail
                font-size 14px
                color rgba(0, 0, 0, .55)

        @media only screen and (max-width 991px)
            .intro:not(:last-child)
                margin-bottom 40px
</style>
