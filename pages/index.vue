<template>
    <div class="container maxwidth">
        <el-row type="flex">
            <div class="carousels">
                <div class="aspect-carousels">
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
                                    :src="carousel.carousel_url"
                                    fit="cover"
                                />
                            </a>
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>
            <div class="talkings">
                <nuxt-link
                    v-for="item in talkings"
                    :key="item.id"
                    class="item hover"
                    :to="{ name: 'talking-id', params: { id: item.id } }"
                >
                    <div class="detail">
                        <h2 class="title">{{ item.title }}</h2>
                        <p class="shortcut">{{ item.shortcut }}</p>
                    </div>
                </nuxt-link>
            </div>
        </el-row>
        <Divider :gap="80" />
        <div class="block">
            <h2>学编程，从这里开始</h2>
            <el-row class="intros" type="flex" justify="space-around">
                <el-col :md="4" :span="24" class="intro">
                    <el-image class="icon" src="/icon/book.svg" fit="contain" />
                    <p class="title">教科书式的教程</p>
                    <p class="detail">
                        教科书式书写的课文，保证了全面又循序渐进有学必有练，有练必有答。
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
                        有学必有练，有练必有答。有学必有练，有练必有答。有学必有练，有练必有答。
                    </p>
                </el-col>
                <el-col :md="4" :span="24" class="intro">
                    <el-image class="icon" src="/icon/test.svg" fit="contain" />
                    <h3 class="title">练习与解答</h3>
                    <p class="detail">
                        有学必有练，有练必有答。有学必有练，有练必有答。
                    </p>
                </el-col>
            </el-row>
        </div>
        <Divider :gap="60" />
        <div class="block">
            <h2>开启你的编程学习之旅</h2>
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
                        class="aspect"
                        :to="{ name: 'course-id', params: { id: course.id } }"
                    >
                        <div class="course">
                            <el-image
                                class="image"
                                :src="course.image_url"
                                fit="cover"
                            />
                            <div class="info">
                                <h3 class="title">{{ course.name }}</h3>
                                <p class="lang">python</p>
                            </div>
                        </div>
                    </nuxt-link>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    async asyncData({ app }) {
        const page = 1
        const limit = 10
        let talkingResult = app.$guy.get('/talkings', { data: { page, limit } })
        let carouselsResult = app.$guy.get('/carousels')
        let coursesResult = app.$guy.get('/courses')

        carouselsResult = await carouselsResult
        coursesResult = await coursesResult
        talkingResult = await talkingResult

        let talkings = []
        if (talkingResult.status === 200) {
            talkings = talkingResult.data.result
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
    padding-top 40px
    h2
        margin-bottom 40px

    .carousels
        width 680px
        .aspect-carousels
            position relative
            padding-bottom 56.2%
            .block
                position absolute
                width 100%
                height 100%
                .carousel
                    height 100%
                    width 100%
                    border-radius 6px
    .talkings
        padding-left 26px
        flex 1
        .item
            padding 15px
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
    .courses
        margin -24px
        // .col:hover
        //     background $hover-color
        //     border-radius 4px
        .col
            padding 24px
        @media only screen and (max-width: 991px)
            margin -12px
            .col
                padding 12px
        @media only screen and (max-width: 767px)
            margin -6px
            .col
                padding 6px
        .aspect
            position relative
            padding-bottom 100%

            .course
                position absolute
                height 100%
                width 100%
                left 0
                top 0
                border-radius 4px
                background rgb(249, 245, 241)
                .image
                    width 100%
                    height 40%
                    border-top-left-radius 4px
                    border-top-right-radius 4px
                .info
                    padding 12px
                    .title
                        font-size 24px
                    @media only screen and (max-width: 991px)
                        padding 8px
                        font-size 20px
                    @media only screen and (max-width: 767px)
                        padding 6px
                        font-size 16px
                .lang
                    left 12px
                    bottom 12px
                    position absolute
                    display block
                    color $weak-color
                    font-size 16px
                    @media only screen and (max-width: 991px)
                        font-size 14px
                        left 8px
                        bottom 8px
                    @media only screen and (max-width: 767px)
                        font-size 12px
                        left 6px
                        bottom 6px
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
            //     width 80px
            // .icon2
            //     width 90px
            // .icon3
            //     width 70px
            .title
                font-size 20px
                font-weight 700
                margin-bottom 10px
            .detail
                font-size 14px
                color rgba(0, 0, 0, 0.55)
        @media only screen and (max-width: 991px)
            .intro:not(:last-child)
                margin-bottom 40px
</style>
