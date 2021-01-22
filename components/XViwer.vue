<template>
    <!-- <div id="editor" height="500px" preview-style="tab" class="bottom15" /> -->
    <div>
        <div v-if="server" class="loading">{{ initialValue }}</div>
        <client-only>
            <viewer
                :initial-value="$common.formatContent(initialValue)"
                :options="editorOptions"
            />
        </client-only>
    </div>
</template>

<script>
import Vue from 'vue'

import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight'
import hljs from 'highlight.js'

import '@toast-ui/editor/dist/toastui-editor-viewer.css'
import 'highlight.js/styles/github.css'

// import python from 'highlight.js/lib/languages/python'

// Step 3. Register languages
// hljs.registerLanguage('python', python)

export default {
    name: 'XViwer',
    props: {
        initialValue: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            server: true,
            editorOptions: { plugins: [[codeSyntaxHighlight, { hljs }]] },
        }
    },
    // watch: {
    //     value(val) {
    //         if (val !== this.content) {
    //             this.$refs.editor.invoke('setMarkdown', this.value)
    //             this.content = val
    //         }
    //     },
    // },
    mounted() {
        this.server = false
        this.initViwer()
    },
    methods: {
        initViwer() {
            const { Viewer } = require('@toast-ui/vue-editor')
            Vue.component('Viewer', Viewer)
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.loading
    position relative

.loading:before
    position absolute
    content ''
    background-color white
    z-index 999
    left 0
    top 0
    right 0
    bottom 0
</style>
