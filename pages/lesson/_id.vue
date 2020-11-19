<template>
    <div class="container">
        <el-row :gutter="34" type="flex">
            <el-col class="lesson" :span="18">
                <p class="title">{{ lesson.title }}</p>
                <el-collapse value="content" accordion>
                    <el-collapse-item title="正文" name="content">
                        <viewer
                            :initial-value="lesson.content"
                            :options="editorOptions"
                        />
                    </el-collapse-item>
                    <el-collapse-item title="练习" name="exercise">
                        <viewer
                            :initial-value="lesson.exercise"
                            :options="editorOptions"
                        />
                    </el-collapse-item>
                    <el-collapse-item title="解答" name="explain">
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
        margin 30px 0
    .image
        width 200px
        height 100px
.lessons
    .image
        height 120px
        width 100%
    .image:hover
        cursor pointer
    .label
        margin-bottom 10px
    .title
        display block
        margin 5px 0
</style>
