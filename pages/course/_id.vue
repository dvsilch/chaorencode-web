<template>
    <div class="container maxwidth">
        <BackTop />
        <header class="header">
            <el-row class="block hidden-sm-and-down">
                <el-col class="ops" :span="14">
                    <h1 class="title">{{ course.name }}</h1>
                    <Button @click="startLearning">开始学习</Button>
                </el-col>
                <el-col :span="10">
                    <Aspect class="header" :x="16" :y="9">
                        <el-image
                            class="image"
                            :src="
                                $common.formatImgUrl({
                                    url: course.image_url,
                                    width: 520,
                                    height: 310,
                                })
                            "
                            fit="cover"
                        />
                    </Aspect>
                </el-col>
            </el-row>
            <el-row class="hidden-md-and-up">
                <el-col>
                    <Aspect class="header" :x="16" :y="9">
                        <el-image
                            class="image"
                            :src="
                                $common.formatImgUrl({
                                    url: course.image_url,
                                    width: 925,
                                    height: 450,
                                })
                            "
                            fit="cover"
                        />
                    </Aspect>
                </el-col>
                <el-col>
                    <h1 class="title">{{ course.name }}</h1>
                </el-col>
            </el-row>
        </header>
        <Divider class="hidden-xs-only" />
        <Tabscroll
            class="tab hidden-sm-and-up"
            :anchors="[
                { id: 'introduction', name: '介绍' },
                { id: 'lessons', name: '目录' },
            ]"
        />
        <section class="section">
            <el-row>
                <el-col
                    id="introduction"
                    class="course"
                    :span="18"
                    :xs="24"
                    style="min-height: 1px"
                >
                    <!-- <viewer
                        :initial-value="course.intro"
                        :options="editorOptions"
                    /> -->
                    <XViwer class="content" :initial-value="course.intro" />
                    <!-- <div id="viewer"></div> -->
                    <Divider class="hidden-sm-and-up" :gap="80" />
                </el-col>
                <el-col class="right" :span="6" :xs="24">
                    <div class="lessons">
                        <h3 id="lessons" class="label">课程目录</h3>
                        <nuxt-link
                            v-for="lesson in lessons"
                            :key="lesson.id"
                            class="hover title"
                            :to="{
                                name: 'lesson-id',
                                params: { id: lesson.id },
                            }"
                        >
                            {{ lesson.title }}
                        </nuxt-link>
                    </div>
                </el-col>
            </el-row>
        </section>
    </div>
</template>

<script lang="ts">
export default {
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
        return {}
    },
    head() {
        return {
            title: this.course.name + ' - 超人编程',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    property: 'og:description',
                    content: this.course.shortcut + '...',
                },
                {
                    hid: 'image',
                    property: 'og:image',
                    content: this.course.image_url,
                },
            ],
        }
    },
    methods: {
        startLearning() {
            this.$message({
                message: '功能仍在实现，祝你学习顺利~',
                type: 'success',
            })
        },
    },
}
</script>

<style lang="stylus" scoped>
.container
    padding-top 40px

    .header
        padding-bottom 40px

        @media only screen and (max-width 767px)
            padding-bottom 10px

        .block
            display flex
            align-content stretch
            .ops
                display flex
                flex-direction column
                justify-content space-between
                align-items flex-start

        .title
            margin 10px 0

        .image
            border-radius 6px

    .section
        padding-top 20px

    .course
        @media only screen and (min-width 768px)
            padding-right 15px

        .label
            font-size 30px

    .right
        .lessons
            // margin -10px
            .label
                margin-bottom 2px
                color $first-color

            // @media only screen and (min-width 992px)
            //     .label
            //         margin-bottom 10px

            .title
                display block
                padding 4px 10px
                margin 0 -10px
                font-size 14px
</style>
