<template>
    <div class="container">
        <!-- <el-image src="/building.jpg" fit="cover"></el-image> -->
        <nuxt-link
            :to="{ name: 'course-id', params: { id: course.id } }"
            v-for="course in courses"
            :key="course.id"
            class="course"
        >
            <p>{{ course.name }}</p>
            <el-image class="image" :src="course.image_url" fit="cover" />
        </nuxt-link>
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
    .course
        .image
            width 200px
            height 100px
</style>
