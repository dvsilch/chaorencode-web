<template>
    <div class="container">
        <!-- <el-image src="/building.jpg" fit="cover"></el-image> -->
        <el-row :gutter="34" type="flex">
            <el-col class="course" :span="18">
                <el-image class="image" :src="course.image_url" fit="cover" />
                <p class="label">{{ course.name }}</p>
                <viewer
                    :initial-value="course.intro"
                    :options="editorOptions"
                />
                <!-- <div id="viewer"></div> -->
            </el-col>
            <el-col class="lessons" :span="6">
                <p class="label">课程目录</p>
                <nuxt-link
                    v-for="lesson in lessons"
                    :key="lesson.id"
                    class="title"
                    :to="{ name: 'lesson-id', params: { id: lesson.id } }"
                >
                    {{ lesson.title }}
                </nuxt-link>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Vue from 'vue'

import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

import python from 'highlight.js/lib/languages/python'

// Step 3. Register languages
hljs.registerLanguage('python', python)

export default Vue.extend({
    async asyncData({ app, route }) {
        let courseResult = app.$guy.get(`/courses/${route.params.id}`)
        let lessonsResult = app.$guy.get(`/courses/${route.params.id}/lessons`)

        courseResult = await courseResult
        lessonsResult = await lessonsResult

        let course = {}
        if (courseResult.status === 200) {
            course = courseResult.data
        }

        let lessons = []
        if (lessonsResult.status === 200) {
            lessons = lessonsResult.data.result
        }

        return {
            course,
            lessons,
        }
    },
    data() {
        return {
            editorOptions: { plugins: [[codeSyntaxHighlight, { hljs }]] },
        }
    },
})
</script>

<style lang="stylus" scoped>
.course
    .label
        font-size 30px
    .image
        height 300px
        width 100%
.lessons
    .label
        margin-bottom 10px
    .title
        display block
        margin 5px 0
// .lessons:hover
//     color $first-color
</style>
