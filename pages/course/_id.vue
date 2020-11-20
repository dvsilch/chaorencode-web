<template>
    <div class="container">
        <header class="header">
            <el-row class="hidden-sm-and-down">
                <el-col :span="14">
                    <h1>{{ course.name }}</h1>
                </el-col>
                <el-col :span="10">
                    <el-image class="image" :src="course.image_url" fit="cover"
                /></el-col>
            </el-row>
            <el-row class="hidden-md-and-up">
                <el-col>
                    <el-image class="image" :src="course.image_url" fit="cover"
                /></el-col>
                <el-col>
                    <h1>{{ course.name }}</h1>
                </el-col>
            </el-row>
        </header>
        <Divider />
        <section class="section">
            <el-row :gutter="34">
                <el-col class="course" :span="18" :xs="24">
                    <viewer
                        :initial-value="course.intro"
                        :options="editorOptions"
                    />
                    <!-- <div id="viewer"></div> -->
                </el-col>
                <el-col class="lessons" :span="6" :xs="24">
                    <h3 class="label">课程目录</h3>
                    <nuxt-link
                        v-for="lesson in lessons"
                        :key="lesson.id"
                        class="hover title"
                        :to="{ name: 'lesson-id', params: { id: lesson.id } }"
                    >
                        {{ lesson.title }}
                    </nuxt-link>
                </el-col>
            </el-row>
        </section>
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
.header
    padding 20px 15px 140px 15px
.section
    padding 20px 15px 10px 15px
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
        padding 4px 10px
// .lessons:hover
//     color $first-color
</style>
