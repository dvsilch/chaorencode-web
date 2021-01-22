<template>
    <!-- <div id="editor" height="500px" preview-style="tab" class="bottom15" /> -->
    <client-only>
        <Editor
            ref="editor"
            :height="`${height}px`"
            :options="editorOptions"
            preview-style="tab"
            :initial-value="value"
            class="bottom15"
            @change="onEditorChange"
        />
    </client-only>
</template>

<script>
import Vue from 'vue'
import 'codemirror/lib/codemirror.css'
import '@toast-ui/editor/dist/toastui-editor.css'

// import { Editor } from '@toast-ui/vue-editor'

export default {
    name: 'XEditor',
    props: {
        value: {
            type: String,
            default: '',
        },
        height: {
            type: Number,
            default: 500,
        },
    },
    data() {
        const that = this
        return {
            content: '',
            editorOptions: {
                linkAttribute: {
                    target: '_blank',
                    contenteditable: 'false',
                    rel: 'nofollow noopener noreferrer',
                },
                hooks: {
                    async addImageBlobHook(file, callback) {
                        const { status, data } = await that.$guy.postWithSign(
                            '/imgs',
                            {
                                data: { img: file },
                            },
                        )
                        if (status === 200) {
                            callback(data.url, 'image')
                        }
                        // callback('werwerwerwerwerwer', 'image')
                    },
                },
            },
        }
    },
    watch: {
        value(val) {
            if (val !== this.content) {
                this.$refs.editor.invoke('setMarkdown', this.value)
                this.content = val
            }
        },
    },
    mounted() {
        this.initEditor()
    },
    methods: {
        initEditor() {
            // const Editor = require('@toast-ui/editor')
            // this.editor = new Editor({
            //     el: document.querySelector('#editor'),
            //     height: '500px',
            //     initialEditType: 'markdown',
            //     previewStyle: 'tab',
            // })
            const { Editor } = require('@toast-ui/vue-editor')
            Vue.component('Editor', Editor)
        },
        onEditorChange() {
            this.content = this.$refs.editor.invoke('getMarkdown')
            // // const content = this.$refs.editor.invoke('setMarkdown', response.data.intro)
            this.$emit('input', this.content)
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped></style>
