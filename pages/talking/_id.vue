<template>
    <div class="container">
        <h1 class="title">{{ talking.title }}</h1>
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
    max-width 960px
    margin 0 auto
    padding 0 25px
    padding-top 100px
    .title
        margin-bottom 10px
        @media only screen and (max-width: 991px)
            font-size 18px
</style>
