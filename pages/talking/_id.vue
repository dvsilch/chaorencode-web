<template>
    <div class="container">
        <el-image
            v-if="talking.thumbnail_url"
            class="image"
            fit="cover"
            :src="
                $common.formatImgUrl({
                    url: talking.thumbnail_url,
                    width: 690,
                    height: 390,
                })
            "
        />
        <h2 class="title">{{ talking.title }}</h2>
        <viewer
            class="content"
            :initial-value="talking.content"
            :options="editorOptions"
        />
    </div>
</template>

<script lang="ts">
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

export default {
    async asyncData({ app, route }) {
        let talkingResult = app.$guy.get(`/talkings/${route.params.id}`)

        talkingResult = await talkingResult

        let talking = {}
        if (talkingResult.status === 200) {
            talking = talkingResult.data
        }

        return {
            talking,
        }
    },
    data() {
        return {
            editorOptions: { plugins: [[codeSyntaxHighlight, { hljs }]] },
        }
    },
}
</script>

<style lang="stylus" scoped>
.container
    max-width 690px
    margin 0 auto
    padding 0 25px
    padding-top 20px
    .image
        width 100%
        height 388px
        margin-bottom 20px
        @media only screen and (max-width: 767px)
            height 338px
    .title
        font-weight 700
        margin-bottom 10px
</style>
