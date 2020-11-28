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
                <el-col class="lesson" :sm="18" :span="24">
                    <template v-if="lesson.video_url">
                        <VideoPlayer
                            id="video"
                            class="video"
                            :options="videoOptions"
                        />
                        <Divider :gap="80" />
                    </template>
                    <template v-if="lesson.content">
                        <h3 id="content" class="label">内容</h3>
                        <!-- <Viewer
                        class="content"
                        :initial-value="lesson.content"
                        :options="editorOptions"
                    /> -->
                        <XViwer
                            class="content"
                            :initial-value="lesson.content"
                        />
                        <Divider :gap="80" />
                    </template>
                    <template v-if="lesson.exercise">
                        <h3 id="exercise" class="label">练习</h3>

                        <!-- <Viewer
                        class="exercise"
                        :initial-value="lesson.exercise"
                        :options="editorOptions"
                    /> -->
                        <XViwer
                            class="content"
                            :initial-value="lesson.exercise"
                        />
                        <Divider :gap="80" />
                    </template>
                    <template v-if="lesson.explain">
                        <h3 id="explain" class="label">解析</h3>
                        <!-- <Viewer
                        class="explain"
                        :initial-value="lesson.explain"
                        :options="editorOptions"
                    /> -->
                        <div class="block">
                            <XViwer
                                class="content"
                                :class="{ blur: blur }"
                                :initial-value="lesson.explain"
                            />
                            <div v-if="blur" class="box">
                                <div class="button" @click="blur = false">
                                    点击查看
                                </div>
                            </div>
                        </div>
                        <Divider class="image hidden-md-and-up" :gap="80" />
                    </template>
                </el-col>
                <el-col class="lessons" :sm="6" :span="24">
                    <nuxt-link
                        class="course-box"
                        :to="{
                            name: 'course-id',
                            params: { id: lesson.course_id },
                        }"
                    >
                        <Aspect id="lessons" :x="16" :y="9">
                            <el-image
                                class="image"
                                :src="
                                    $common.formatImgUrl({
                                        url: lesson.course_image_url,
                                        width: 630,
                                        height: 360,
                                    })
                                "
                                fit="cover"
                            ></el-image>
                        </Aspect>
                    </nuxt-link>
                    <h3 class="label">课程目录</h3>
                    <nuxt-link
                        v-for="lesson in lessons"
                        :key="lesson.id"
                        class="hover title"
                        :class="{ ing: $route.params.id == lesson.id }"
                        :to="{ name: 'lesson-id', params: { id: lesson.id } }"
                    >
                        {{ lesson.title }}
                    </nuxt-link>
                </el-col>
            </el-row>
        </section>
    </div>
</template>

<script lang="ts">
export default {
    async asyncData({ app, route }) {
        let lessonResult = app.$guy.get(`/course/lessons/${route.params.id}`)

        lessonResult = await lessonResult

        let lesson
        const anchors = []
        if (lessonResult.status === 200) {
            lesson = lessonResult.data
            // console.log(lesson.video_url)
            if (lesson.video_url) {
                anchors.push({ id: 'video', name: '视频' })
            }
            if (lesson.content) {
                anchors.push({ id: 'content', name: '内容' })
            }
            if (lesson.exercise) {
                anchors.push({ id: 'exercise', name: '练习' })
            }
            if (lesson.explain) {
                anchors.push({ id: 'explain', name: '答案' })
            }
        }

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
            videoOptions: null,
            blur: true,
        }
    },
    head() {
        return {
            title: this.lesson.title + ' - 超人编程',
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
}
</script>

<style lang="stylus" scoped>
.container
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
    .block
        position relative
        .blur
            filter blur(10px)
        .box
            position absolute
            top 40%
            left 0
            right 0
            text-align center
            .button
                display inline-block
                cursor pointer
                background $first-color
                color white
                border-radius 3px
                padding 5px 10px
.lesson
    .title
        font-size 26px
        margin-bottom 30px

    @media only screen and (min-width: 768px)
        [divider]:last-child
            display none

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

.label
    margin-bottom 20px
    color $first-color

.lessons
    .course-box
        margin-bottom 20px
    .image
        border-radius 4px
        cursor pointer
    .title
        display block
        padding 4px 10px
        margin 0 -10px
    .ing
        background-color $hover-color
    @media only screen and (min-width: 992px)
        .label
            margin-bottom 10px
</style>
