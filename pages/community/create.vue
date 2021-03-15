<template>
    <div class="container maxwidth">
        <el-row type="flex" style="margin-bottom: 10px">
            <el-select
                v-model="cate"
                clearable
                placeholder="分类"
                class="right10"
            >
                <el-option
                    v-for="item in cateOptions"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value"
                />
            </el-select>
            <el-input v-model="title" placeholder="标题" />
        </el-row>
        <XEditor v-model="content" :height="500" style="margin-bottom: 10px" />
        <el-button @click="handleCreatePost()">发布</el-button>
    </div>
</template>

<script lang="ts">
export default {
    data() {
        return {
            title: '',
            content: '',
            cate: '',
            cateOptions: [
                {
                    value: '提问',
                },
                {
                    value: '文章',
                },
                {
                    value: '讨论',
                },
            ],
        }
    },
    methods: {
        async handleCreatePost() {
            if (this.title === '') {
                this.$message({
                    type: 'error',
                    message: '请输入标题',
                })
                return
            }

            if (this.content === '') {
                this.$message({
                    type: 'error',
                    message: '请输入内容',
                })
                return
            }

            if (this.cate === '') {
                this.$message({
                    type: 'error',
                    message: '请选择分类',
                })
                return
            }

            const res = await this.$guy.postWithSign(`/community`, {
                data: {
                    title: this.title,
                    content: this.content,
                    cate: this.cate,
                },
            })

            if (res.status === 200) {
                this.$message({
                    type: 'success',
                    message: '发送成功',
                })
                this.title = ''
                this.content = ''
                this.cate = ''
                this.$router.push({ name: 'community' })
            } else {
                this.$message({
                    type: 'error',
                    message: '网络错误，请重试',
                })
            }
        },
    },
}
</script>
