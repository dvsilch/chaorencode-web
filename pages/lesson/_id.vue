<template>
    <div class="container">
        <el-row :gutter="34" type="flex">
            <el-col class="lesson" :span="18">
                <p class="title">{{ lesson.title }}</p>
                <el-collapse value="content" accordion>
                    <el-collapse-item name="content">
                        <template slot="title">
                            <p class="label">正文</p>
                        </template>
                        <viewer
                            :initial-value="lesson.content"
                            :options="editorOptions"
                        />
                    </el-collapse-item>
                    <el-collapse-item name="exercise">
                        <template slot="title">
                            <p class="label">练习</p>
                        </template>
                        <viewer
                            :initial-value="lesson.exercise"
                            :options="editorOptions"
                        />
                    </el-collapse-item>
                    <el-collapse-item name="explain">
                        <template slot="title">
                            <p class="label">解答</p>
                        </template>
                        <viewer
                            :initial-value="lesson.explain"
                            :options="editorOptions"
                        />
                    </el-collapse-item>
                </el-collapse>
            </el-col>
            <el-col class="lessons" :span="6">
                <nuxt-link
                    :to="{
                        name: 'course-id',
                        params: { id: lesson.course_id },
                    }"
                >
                    <el-image
                        class="image"
                        :src="lesson.course_image_url"
                        fit="cover"
                    ></el-image>
                </nuxt-link>
                <p class="label">课程目录</p>
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
        let lessonResult = app.$guy.get(`/course/lessons/${route.params.id}`)

        lessonResult = await lessonResult

        let lesson = {}
        if (lessonResult.status === 200) {
            lesson = lessonResult.data
        }

        let lessonsResult = app.$guy.get(`/courses/${lesson.course_id}/lessons`)
        lessonsResult = await lessonsResult

        let lessons = []
        if (lessonsResult.status === 200) {
            lessons = lessonsResult.data.result
        }
        return {
            lesson,
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
.lesson
    .title
        font-size 26px
        margin-bottom 30px
    .label
        position relative
        font-size 22px
        line-height 1.4
    .label::before
        transition all 400ms ease
        content ''
        position absolute
        height 3px
        width 0
        background $first-color
        bottom -2px
        left 0
    .is-active
        .label::before
            width 80%
.lessons
    .image
        height 120px
        width 100%
        border-radius 4px
    .image:hover
        cursor pointer
    .label
        margin-bottom 10px
    .title
        display block
        margin 5px 0
        padding 4px 10px
</style>
