<template>
    <div class="container">
        <!-- <el-image src="/building.jpg" fit="cover"></el-image> -->
        <div class="course">
            <p>{{ course.name }}</p>
            <viewer :initialValue="course.intro" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    async asyncData({ app, route }) {
        let courseResult = app.$guy.get(`/courses/${route.params.id}`)

        courseResult = await courseResult
        let course = []
        if (courseResult.status === 200) {
            course = courseResult.data
        }

        return {
            course,
        }
    },
})
</script>

<style lang="stylus" scoped>
.course
    .image
        width 200px
        height 100px
</style>
