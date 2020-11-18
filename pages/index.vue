<template>
    <div class="container">
        <el-carousel :interval="5000" arrow="always">
            <el-carousel-item v-for="item in 4" :key="item">
                <h3>{{ item }}</h3>
            </el-carousel-item>
        </el-carousel>
        <el-row type="flex" justify="space-around">
            <el-col :span="4" class="item">
                <img class="icon" src="/icon/book.svg" fit="cover" />
                <p>教科书式的教程</p>
                <p class="intro">
                    教科书式书写的课文，保证了全面又循序渐进有学必有练，有练必有答。
                </p>
            </el-col>
            <el-col :span="4" class="item">
                <img class="icon" src="/icon/video.svg" fit="cover" />
                <p>视频讲解</p>
                <p class="intro">
                    有学必有练，有练必有答。有学必有练，有练必有答。有学必有练，有练必有答。
                </p>
            </el-col>
            <el-col :span="4" class="item">
                <img class="icon" src="/icon/test.svg" fit="cover" />
                <p>练习与解答</p>
                <p class="intro">
                    有学必有练，有练必有答。有学必有练，有练必有答。
                </p>
            </el-col>
        </el-row>
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
                        <p>{{ course.name }}</p>
                    </el-row>
                </nuxt-link>
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
    max-width 1024px
    margin 0 auto
    .item
        text-align center
        .icon
            width 80px
        .intro
            font-size 14px
    .course
        border-radius 10px
        padding 10px
        .image
            width 200px
            height 100px
    .course:hover
        background $hover-color
</style>
