<template>
    <div class="container">
        <!-- <el-image src="/building.jpg" fit="cover"></el-image> -->
        <div class="course">
            <p>{{ course.name }}</p>
            <viewer :initial-value="course.intro" :options="editorOptions" />
            <!-- <div id="viewer"></div> -->
            <p>课程目录</p>
            <nuxt-link
                v-for="lesson in lessons"
                :key="lesson.id"
                :to="{ name: 'lesson-id', params: { id: lesson.id } }"
            >
                {{ lesson.title }}
            </nuxt-link>
        </div>
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
    .image
        width 200px
        height 100px
</style>
