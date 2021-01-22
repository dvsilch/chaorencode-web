<template>
    <div class="container maxwidth">
        <BackTop />
        <header class="header">
            <h1 class="title">{{ lesson.title }}</h1>
        </header>
        <Tabscroll class="tab hidden-sm-and-down" :anchors="anchors" />
        <Tabscroll class="tab hidden-md-and-up" :anchors="anchorsWithLessons" />
        <section class="section">
            <el-row :gutter="34">
                <!-- :class="videoState === 'play' ? 'video-play' : ''" -->
                <el-col class="lesson" :md="18" :span="24">
                    <template v-if="lesson.video_url">
                        <VideoPlayer
                            id="video"
                            class="video"
                            :options="videoOptions"
                        />
                        <Divider :gap="80" />
                    </template>
                    <template v-if="lesson.content">
                        <h3 id="content" class="label">课文</h3>
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
                        <h3 id="exercise" class="label">实战</h3>

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
                        <!-- <Divider class="image hidden-md-and-up" :gap="80" /> -->
                        <Divider :gap="80" />
                    </template>
                    <div class="lessons hidden-md-and-up">
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
                                />
                            </Aspect>
                        </nuxt-link>
                        <h3 class="label">课程目录</h3>
                        <nuxt-link
                            v-for="les in lessons"
                            :key="les.id"
                            class="hover title"
                            :class="{ ing: $route.params.id == les.id }"
                            :to="{
                                name: 'lesson-id',
                                params: { id: les.id },
                            }"
                        >
                            {{ les.title }}
                        </nuxt-link>
                    </div>
                    <Divider class="hidden-md-and-up" :gap="80" />
                    <!-- <Divider :gap="80" class="hidden-md-and-up" /> -->
                    <h3 id="comments" class="label">评论</h3>
                    <Comment
                        ref="clear"
                        :comments="comments"
                        :amount="commentsAmount"
                        @post-comment="postComment($event)"
                        @handle-page-change="getComment($event)"
                    />
                </el-col>
                <el-col class="lessons hidden-sm-and-down" :sm="6">
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
                            />
                        </Aspect>
                    </nuxt-link>
                    <h3 class="label">课程目录</h3>
                    <nuxt-link
                        v-for="les in lessons"
                        :key="les.id"
                        class="hover title"
                        :class="{ ing: $route.params.id == les.id }"
                        :to="{ name: 'lesson-id', params: { id: les.id } }"
                    >
                        {{ les.title }}
                    </nuxt-link>
                </el-col>
            </el-row>
        </section>
    </div>
</template>

<script>
export default {
    async asyncData({ app, route }) {
        let lessonResult = app.$guy.get(`/course/lessons/${route.params.id}`)
        let commentsResult = app.$guy.get(
            `/lessons/${route.params.id}/comments`,
        )

        commentsResult = await commentsResult
        lessonResult = await lessonResult

        let lesson = { title: '', video_url: '' }
        let comments = []
        let commentsAmount
        let lessonsResult
        const anchors = []
        let lessons = []
        if (lessonResult.status === 200) {
            lesson = lessonResult.data
            // console.log(lesson.course_id)
            if (lesson.video_url) {
                anchors.push({ id: 'video', name: '视频' })
            }
            if (lesson.content) {
                anchors.push({ id: 'content', name: '课文' })
            }
            if (lesson.exercise) {
                anchors.push({ id: 'exercise', name: '实战' })
            }
            if (lesson.explain) {
                anchors.push({ id: 'explain', name: '解析' })
            }
            lessonsResult = app.$guy.get(`/courses/${lesson.course_id}/lessons`)
            lessonsResult = await lessonsResult

            if (lessonsResult.status === 200) {
                lessons = lessonsResult.data.result
            }
        }

        const anchorsWithLessons = anchors.concat([
            { id: 'lessons', name: '目录' },
            { id: 'comments', name: '评论' },
        ])

        if (commentsResult.status === 200) {
            comments = commentsResult.data.result
            commentsAmount = commentsResult.data.amount
            // console.log(commentsAmount)
            // console.log(comments)
            anchors.push({ id: 'comments', name: '评论' })
        }
        return {
            lesson,
            lessons,
            anchors,
            anchorsWithLessons,
            videoState: 'pause',
            comments,
            commentsAmount,
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
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    property: 'og:description',
                    content: this.lesson.shortcut + '...',
                },
                {
                    hid: 'image',
                    property: 'og:image',
                    content: this.lesson.thumbnail_url,
                },
            ],
        }
    },
    mounted() {
        console.log(this.lesson.content)
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
        async getComment(params) {
            if (params.page <= Math.ceil(this.commentsAmount / 10)) {
                const commentsResult = await this.$guy.get(
                    `/lessons/${this.$route.params.id}/comments`,
                    { data: { page: params.page, limit: params.limit } },
                )

                if (commentsResult.status === 200) {
                    if (params.isLazyLoad) {
                        this.comments.push(...commentsResult.data.result)
                    } else {
                        this.comments = commentsResult.data.result
                    }
                    this.commentsAmount = commentsResult.data.amount
                }
            } else {
                this.$alert('没有更多')
            }
        },
        async postComment(params) {
            // console.log(comment)
            if (!params.comment.content) {
                this.$alert('请输入内容')
                return
            }

            if (!params.comment.username) {
                this.$alert('请输入用户名')
                return
            }

            const {
                code,
            } = await this.$guy.post(
                `/lessons/${this.$route.params.id}/comments`,
                { data: params.comment },
            )

            if (code === 200) {
                this.$alert('发布成功')
                if (params.isLazyLoad) {
                    console.log('isLazy')
                } else {
                    this.$refs.clear.refresh(
                        Math.ceil((this.commentsAmount + 1) / 10), // 发送评论后自动跳转至最后一页
                    )
                }
            }
        },
    },
}
</script>

<style lang="stylus" scoped>
.container
    .tab
        box-shadow rgba(0, 0, 0, .1) 0px 1px 0px

    .section
        padding-top 20px

    @media only screen and (max-width 991px)
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

    // @media only screen and (min-width 768px)
    // [divider]:last-child
    // display none
    .button
        display inline-block
        cursor pointer
        background $first-color
        color white
        border-radius 3px
        padding 5px 10px

    .lessons
        position static

        .course-box
            margin-bottom 20px

        .image
            border-radius 4px
            cursor pointer

        .title
            display block
            padding 4px 10px
            margin 0 -10px
            font-size 16px

        .ing
            background-color $hover-color

        @media only screen and (min-width 992px)
            .label
                margin-bottom 10px

.label
    margin-bottom 20px
    color $first-color

.lessons
    position sticky
    top 68.8px

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

    @media only screen and (min-width 992px)
        .label
            margin-bottom 10px

.whole-comments
    padding 20px 0

    .single-comment
        // padding 40px 20px 20px
        padding 20px 0

        .comment-username
            font-size 14px

        .comment-index
            font-size 12px
            color rgb(190, 190, 190)

        .comment-publish-time
            padding-top 5px
            font-size 12px
            color rgb(190, 190, 190)

        .comment-content
            padding 20px
            // text-indent 2em

    .single-comment:not(:last-child)
        border-bottom 1px solid rgb(229, 228, 226)

.no-comments
    padding 40px 0
    text-align center
    color rgb(190, 190, 190)
    font-size 20px

// .comment-input
.comment-info
    display flex
    justify-content flex-end
    padding-top 20px

    .input
        width 200px
        margin-right 10px

    .button
        display inline-block
        cursor pointer
        background $first-color
        color white
        border-radius 3px
        padding 5px 10px
        // height 38px
        line-height 28px
</style>
