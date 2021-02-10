<template>
    <div class="box maxwidth">
        <el-image class="gzh" src="/gzh.jpg" fit="contain" />
        <span>关注公众号并回复：</span>
        <span>红包{{ $route.query.behelp }}</span>
    </div>
</template>

<script lang="ts">
export default {
    layout: 'none',
    async asyncData({ app }) {
        const page = 1
        const limit = 3
        let talkingResult = app.$guy.get('/talkings', { data: { page, limit } })
        let carouselsResult = app.$guy.get('/carousels')
        let coursesResult = app.$guy.get('/courses')

        carouselsResult = await carouselsResult
        coursesResult = await coursesResult
        talkingResult = await talkingResult

        let talkings = []
        if (talkingResult.status === 200) {
            talkings = talkingResult.data.result
            // talkings = talkings.concat(talkings)
            // talkings = talkings.concat(talkings)
            // talkings = talkings.slice(0, 3)
        }

        let carousels = []
        if (carouselsResult.status === 200) {
            carousels = carouselsResult.data.result
        }

        let courses = []
        if (coursesResult.status === 200) {
            courses = coursesResult.data.result
        }

        return {
            courses,
            carousels,
            talkings,
        }
    },
    head() {
        return {
            title: '超人编程',
        }
    },
}
</script>

<style lang="stylus" scoped>
// .box
</style>
