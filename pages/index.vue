<template>
    <div class="container">
        <el-carousel class="carousels" :interval="5000" arrow="always">
            <el-carousel-item v-for="item in 4" :key="item">
                <h3>{{ item }}</h3>
            </el-carousel-item>
        </el-carousel>
        <el-row class="courses">
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
        <el-row class="intros" type="flex" justify="space-around">
            <el-col :span="4" class="intro">
                <img class="icon" src="/icon/book.svg" fit="cover" />
                <p class="title">教科书式的教程</p>
                <p class="detail">
                    教科书式书写的课文，保证了全面又循序渐进有学必有练，有练必有答。
                </p>
            </el-col>
            <el-col :span="4" class="intro">
                <img class="icon" src="/icon/video.svg" fit="cover" />
                <p class="title">视频讲解</p>
                <p class="detail">
                    有学必有练，有练必有答。有学必有练，有练必有答。有学必有练，有练必有答。
                </p>
            </el-col>
            <el-col :span="4" class="intro">
                <img class="icon" src="/icon/test.svg" fit="cover" />
                <p class="title">练习与解答</p>
                <p class="detail">
                    有学必有练，有练必有答。有学必有练，有练必有答。
                </p>
            </el-col>
        </el-row>
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
    .carousels
        margin-bottom 100px
    .courses
        margin-bottom 100px
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
                width 80px
                margin-bottom 20px
            .title
                font-size 24px
            .detail
                font-size 14px
                font-weight 300
                color #999
</style>
