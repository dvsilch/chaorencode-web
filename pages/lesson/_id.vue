<template>
    <div class="container maxwidth">
        <header class="header">
            <h1 class="title">{{ lesson.title }}</h1>
        </header>
        <Tabscroll class="tab hidden-sm-and-down" :anchors="anchors" />
        <Tabscroll class="tab hidden-md-and-up" :anchors="anchorsWithLessons" />
        <section class="section">
            <el-row :gutter="34">
                <!-- :class="videoState === 'play' ? 'video-play' : ''" -->
                <el-col class="lesson" :md="18" :span="24">
                    <VideoPlayer
                        id="video"
                        class="video"
                        :options="videoOptions"
                    />
                    <Divider id="content" :gap="60" />
                    <Viewer
                        class="content"
                        :initial-value="lesson.content"
                        :options="editorOptions"
                    />
                    <Divider id="exercise" :gap="60" />

                    <Viewer
                        class="exercise"
                        :initial-value="lesson.exercise"
                        :options="editorOptions"
                    />

                    <Divider id="explain" :gap="60" />
                    <Viewer
                        class="explain"
                        :initial-value="lesson.explain"
                        :options="editorOptions"
                    />
                    <Divider
                        id="lessons"
                        class="image hidden-md-and-up"
                        :gap="60"
                    />
                </el-col>
                <el-col class="lessons" :md="6" :span="24">
                    <nuxt-link
                        :to="{
                            name: 'course-id',
                            params: { id: lesson.course_id },
                        }"
                    >
                        <el-image
                            class="image hidden-sm-and-down"
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
        let lessonResult = app.$guy.get(`/course/lessons/${route.params.id}`)

        lessonResult = await lessonResult

        let lesson = {}
        let anchors = []
        if (lessonResult.status === 200) {
            lesson = lessonResult.data
            // console.log(lesson.video_url)
            if (lesson.video_url !== null) {
                anchors.push({ id: 'video', name: '视频' })
            }
        }

        anchors = anchors.concat([
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

        const anchorsWithLessons = anchors.concat([
            { id: 'lessons', name: '目录' },
        ])
        return {
            lesson,
            lessons,
            anchors,
            anchorsWithLessons,
            videoState: 'pause',
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
            autoplay: false,
            controls: true,
            sources: [
                {
                    src: this.lesson.video_url,
                    type: 'application/x-mpegURL',
                },
            ],
        }
    },
    methods: {
        // videoChange(event) {
        //     this.videoState = event.type
        //     console.log(this.videoState)
        // },
    },
})
</script>

<style lang="stylus" scoped>
.container
    padding-top 40px
    .header
        .title
            margin-bottom 30px
    .tab
        box-shadow rgba(0, 0, 0, 0.1) 0px 1px 0px
    .section
        padding-top 20px

    @media only screen and (max-width: 991px)
        .vjs-playing
            position sticky
            top 50px
            z-index 999

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
