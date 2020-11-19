<template>
    <div class="container">
        <header class="header">
            <p class="title">{{ lesson.title }}</p>
        </header>
        <Tabscroll :options="tabs" />
        <el-row :gutter="34">
            <el-col class="lesson" :md="18" :span="24">
                <VideoPlayer id="video" class="video" :options="videoOptions" />
                <Viewer
                    id="content"
                    class="content"
                    style="margin-bottom: 300px"
                    :initial-value="lesson.content"
                    :options="editorOptions"
                />

                <Viewer
                    id="exercise"
                    class="exercise"
                    style="margin-bottom: 300px"
                    :initial-value="lesson.exercise"
                    :options="editorOptions"
                />

                <Viewer
                    id="explain"
                    class="explain"
                    style="margin-bottom: 300px"
                    :initial-value="lesson.explain"
                    :options="editorOptions"
                />
            </el-col>
            <el-col id="lessons" class="lessons" :md="6" :span="24">
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
        let tabs = []
        if (lessonResult.status === 200) {
            lesson = lessonResult.data
            // console.log(lesson.video_url)
            if (lesson.video_url !== null) {
                tabs.push({ id: 'video', name: '视频' })
            }
        }

        tabs = tabs.concat([
            { id: 'content', name: '内容' },
            { id: 'exercise', name: '练习' },
            { id: 'explain', name: '答案' },
        ])

        let lessonsResult = app.$guy.get(`/courses/${lesson.course_id}/lessons`)
        lessonsResult = await lessonsResult

        let lessons = []
        if (lessonsResult.status === 200) {
            lessons = lessonsResult.data.result
        }
        return {
            lesson,
            lessons,
            tabs,
        }
    },
    data() {
        return {
            editorOptions: { plugins: [[codeSyntaxHighlight, { hljs }]] },
            videoOptions: null,
        }
    },
    mounted() {
        this.videoOptions = {
            autoplay: true,
            controls: true,
            sources: [
                {
                    src: this.lesson.video_url,
                    type: 'application/x-mpegURL',
                },
            ],
        }
    },
})
</script>

<style lang="stylus" scoped>
.header
    height 300px
    .title
        font-size 28px
        font-weight 600
.lesson
    .title
        font-size 26px
        margin-bottom 30px

    // .nav-tab
    //     position sticky
    //     top 0
    //     background $background
    //     .tab-item
    //         position relative
    //         font-size 22px
    //         line-height 1.4
    //     .tab-item::before
    //         transition all 400ms ease
    //         content ''
    //         position absolute
    //         height 3px
    //         width 0
    //         background $first-color
    //         bottom -2px
    //         left 0
    //     .is-active.tab-item::before
    //             width 80%

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
