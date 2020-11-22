<template>
    <div class="container">
        <el-row v-for="item in tests" :key="item.id" class="item" type="flex">
            <el-image class="thumbnail" :src="item.thumbnail_url" />
            <div class="detail">
                <h2 class="title">{{ item.title }}</h2>
                <p>{{ item.shortcut }}</p>
            </div>
        </el-row>
    </div>
</template>

<script lang="ts">
export default {
    async asyncData({ app }) {
        let carouselsResult = app.$guy.get('/carousels')
        let coursesResult = app.$guy.get('/courses')

        carouselsResult = await carouselsResult
        coursesResult = await coursesResult

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
            tests: [
                {
                    id: 0,
                    title: 'python与vscode的安装与调试。',
                    time: 0,
                    shortcut:
                        '你说太阳圆不圆我说是的你说太阳圆不圆我说是的你说太阳圆不圆我说是的你说太阳圆不圆我说是的',
                    thumbnail_url: '23123123123',
                },
                {
                    id: -1,
                    title: 'python与vscode的安装与调试。',
                    time: 0,
                    shortcut:
                        '你说太阳圆不圆我说是的你说太阳圆不圆我说是的你说太阳圆不圆我说是的你说太阳圆不圆我说是的',
                    thumbnail_url: '23123123123',
                },
                {
                    id: 1,
                    title: 'python与vscode的安装与调试。',
                    time: 0,
                    shortcut:
                        '你说太阳圆不圆我说是的你说太阳圆不圆我说是的你说太阳圆不圆我说是的你说太阳圆不圆我说是的',
                    thumbnail_url: '23123123123',
                },
                {
                    id: 2,
                    title: 'python与vscode的安装与调试。',
                    time: 0,
                    shortcut:
                        '你说太阳圆不圆我说是的你说太阳圆不圆我说是的你说太阳圆不圆我说是的你说太阳圆不圆我说是的',
                    thumbnail_url: '23123123123',
                },
                {
                    id: 3,
                    title: 'python与vscode的安装与调试。',
                    time: 0,
                    shortcut:
                        '你说太阳圆不圆我说是的你说太阳圆不圆我说是的你说太阳圆不圆我说是的你说太阳圆不圆我说是的',
                    thumbnail_url: '23123123123',
                },
                {
                    id: 4,
                    title: 'python与vscode的安装与调试。',
                    time: 0,
                    shortcut:
                        '你说太阳圆不圆我说是的你说太阳圆不圆我说是的你说太阳圆不圆我说是的你说太阳圆不圆我说是的',
                    thumbnail_url: '23123123123',
                },
                // {
                //     id: 5,
                //     title: 'python与vscode的安装与调试。',
                //     time: 0,
                //     shortcut:
                //         '你说太阳圆不圆我说是的你说太阳圆不圆我说是的你说太阳圆不圆我说是的你说太阳圆不圆我说是的',
                //     thumbnail_url: '23123123123',
                // },
                // {
                //     id: 6,
                //     title: 'python与vscode的安装与调试。',
                //     time: 0,
                //     shortcut:
                //         '你说太阳圆不圆我说是的你说太阳圆不圆我说是的你说太阳圆不圆我说是的你说太阳圆不圆我说是的',
                //     thumbnail_url: '23123123123',
                // },
                // {
                //     id: 7,
                //     title: 'python与vscode的安装与调试。',
                //     time: 0,
                //     shortcut:
                //         '你说太阳圆不圆我说是的你说太阳圆不圆我说是的你说太阳圆不圆我说是的你说太阳圆不圆我说是的',
                //     thumbnail_url: '23123123123',
                // },
                // {
                //     id: 8,
                //     title: 'python与vscode的安装与调试。',
                //     time: 0,
                //     shortcut:
                //         '你说太阳圆不圆我说是的你说太阳圆不圆我说是的你说太阳圆不圆我说是的你说太阳圆不圆我说是的',
                //     thumbnail_url: '23123123123',
                // },
                // {
                //     id: 9,
                //     title: 'python与vscode的安装与调试。',
                //     time: 0,
                //     shortcut:
                //         '你说太阳圆不圆我说是的你说太阳圆不圆我说是的你说太阳圆不圆我说是的你说太阳圆不圆我说是的',
                //     thumbnail_url: '23123123123',
                // },
                // {
                //     id: 10,
                //     title: 'python与vscode的安装与调试。',
                //     time: 0,
                //     shortcut:
                //         '你说太阳圆不圆我说是的你说太阳圆不圆我说是的你说太阳圆不圆我说是的你说太阳圆不圆我说是的',
                //     thumbnail_url: '23123123123',
                // },
            ],
        }
    },
    mounted() {
        window.onmousewheel = function () {
            console.log('onmousewheel')
            const scrollT =
                document.body.scrollTop || document.documentElement.scrollTop // 兼容处理
            const currtTop = document.documentElement.clientHeight + scrollT
            console.log(document.body.scrollHeight)
            console.log(document.documentElement.clientHeight)
            if (currtTop >= document.body.scrollHeight) {
                console.log('End')
            }
        }
    },
    methods: {
        load() {
            this.tests.push({
                id: 0,
                title: 'python与vscode的安装与调试。',
                time: 0,
                shortcut:
                    '你说太阳圆不圆我说是的你说太阳圆不圆我说是的你说太阳圆不圆我说是的你说太阳圆不圆我说是的',
                thumbnail_url: '23123123123',
            })
        },
    },
}
</script>

<style lang="stylus" scoped>
.container
    max-width 960px
    margin 0 auto
    padding 0 15px
    padding-top 100px
    .infinite-list-wrapper
        height 100vh
    .item
        margin-bottom 60px
        .thumbnail
            width 300px
            height 160px
            margin-right 20px
            border-radius 4px
        .detail
            flex 1
            .title
                margin-bottom 10px
</style>
