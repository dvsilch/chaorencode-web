<template>
    <div class="container">
        <el-carousel
            class="carousels"
            height="600px"
            :interval="5000"
            arrow="hover"
            indicator-position="none"
        >
            <el-carousel-item v-for="item in 4" :key="item">
                <el-image class="carousel" src="/building.jpg" fit="cover" />
            </el-carousel-item>
        </el-carousel>
        <div class="intros">
            <h2>学编程，从这里开始</h2>
            <el-row type="flex" justify="space-around">
                <el-col :span="4" class="intro">
                    <el-image class="icon" src="/icon/book.svg" fit="contain" />
                    <p class="title">教科书式的教程</p>
                    <p class="detail">
                        教科书式书写的课文，保证了全面又循序渐进有学必有练，有练必有答。
                    </p>
                </el-col>
                <el-col :span="4" class="intro">
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
                <el-col :span="4" class="intro">
                    <el-image class="icon" src="/icon/test.svg" fit="contain" />
                    <p class="title">练习与解答</p>
                    <p class="detail">
                        有学必有练，有练必有答。有学必有练，有练必有答。
                    </p>
                </el-col>
            </el-row>
        </div>
        <div class="courses">
            <h2>开启你的编程学习之旅</h2>
            <el-row>
                <el-col
                    v-for="course in courses"
                    :key="course.id"
                    class="course"
                    :span="12"
                >
                    <nuxt-link
                        :to="{ name: 'course-id', params: { id: course.id } }"
                    >
                        <el-row type="flex">
                            <el-image
                                class="image"
                                :src="course.image_url"
                                fit="cover"
                            />
                            <p class="title">{{ course.name }}</p>
                        </el-row>
                    </nuxt-link>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    async asyncData({ app }) {
        let coursesResult = app.$guy.get('/courses')

        coursesResult = await coursesResult
        let courses = []
        if (coursesResult.status === 200) {
            courses = coursesResult.data.result
        }

        return {
            courses,
        }
    },
})
</script>

<style lang="stylus" scoped>
.container
    .carousels, .intros, .courses
        margin-bottom 200px
    // .carousels
    .courses
        text-align center
        .course
            border-radius 4px
            padding 10px
            .image
                width 200px
                height 100px
                margin-right 30px
            .title
                font-size 24px
    .course:hover
        background $hover-color
    .intros
        text-align center
        .intro
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
</style>
