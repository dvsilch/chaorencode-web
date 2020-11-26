<template>
    <div class="container maxwidth">
        <header class="header">
            <el-row class="hidden-sm-and-down">
                <el-col :span="14">
                    <h1>{{ course.name }}</h1>
                </el-col>
                <el-col :span="10">
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
                /></el-col>
            </el-row>
            <el-row class="hidden-md-and-up">
                <el-col>
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
                /></el-col>
                <el-col>
                    <h1>{{ course.name }}</h1>
                </el-col>
            </el-row>
        </header>
        <Divider />
        <section class="section">
            <el-row>
                <el-col
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
                </el-col>
                <el-col class="right" :span="6" :xs="24">
                    <div class="lessons">
                        <h3 class="label">课程目录</h3>
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
        }
    },
}
</script>

<style lang="stylus" scoped>
.container
    padding-top 40px
    .header
        padding-bottom 100px
        .hidden-md-and-up
            .image
                margin-bottom 20px
    .section
        padding-top 20px
    .course
        .label
            font-size 30px
        .image
            height 300px
            width 100%
    .right
        padding-left 10px
        .lessons
            .label
                margin-bottom 10px
            .title
                display block
                padding 4px 10px
                margin 0 -10px
// .lessons:hover
//     color $first-color
</style>
