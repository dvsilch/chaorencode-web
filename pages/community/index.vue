<template>
    <div class="container maxwidth">
        <el-row :gutter="60">
            <el-col :span="16">
                <nuxt-link
                    v-for="post in posts"
                    :key="post.id"
                    :to="{
                        name: 'community-post-id',
                        params: { id: post.id },
                    }"
                    class="post hover"
                >
                    <el-row
                        type="flex"
                        align="middle"
                        :gutter="20"
                        class="post-part"
                    >
                        <el-col :span="2">
                            <p class="amount">
                                {{ post.cate }}
                            </p>
                        </el-col>
                        <el-col>
                            <h2 class="title">
                                {{ post.title }}
                            </h2>
                        </el-col>
                    </el-row>
                    <el-row
                        type="flex"
                        align="middle"
                        :gutter="20"
                        class="post-part"
                    >
                        <el-col :span="2">
                            <p class="amount">{{ post.thumb_count }} 点赞</p>
                            <p class="amount">{{ post.comment_count }} 评论</p>
                            <p class="amount">{{ post.view_count }} 浏览</p>
                        </el-col>
                        <el-col class="shortcut">
                            {{ post.shortcut }}
                        </el-col>
                    </el-row>
                    <el-row type="flex" align="middle" class="post-part">
                        <el-col :span="15"></el-col>
                        <el-col :span="9">
                            <el-row type="flex" align="middle" class="info">
                                <el-col :span="18">
                                    <el-row
                                        type="flex"
                                        align="middle"
                                        justify="end"
                                    >
                                        <el-image
                                            :src="post.avatar_url"
                                            fit="cover"
                                            class="avatar right15"
                                        />
                                        <p>
                                            {{ post.publisher }}
                                        </p>
                                    </el-row>
                                </el-col>
                                <el-col class="detail" :span="6">
                                    <p>
                                        {{
                                            $common.beautifulTime(
                                                post.publish_time,
                                            )
                                        }}
                                    </p>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </nuxt-link>
            </el-col>
            <el-col :span="8">每日热榜</el-col>
        </el-row>
        <div class="block">
            <div class="pagin">
                <el-pagination
                    class="inner"
                    background
                    :page-size="limit"
                    :pager-count="5"
                    layout="total, prev, pager, next, jumper"
                    :total="amount"
                    @current-change="handlePageChange"
                />
            </div>
        </div>
        <el-row type="flex">
            <el-select v-model="cate" clearable placeholder="分类">
                <el-option
                    v-for="item in cateOptions"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value"
                />
            </el-select>
            <el-input v-model="title" placeholder="标题" class="bottom15" />
        </el-row>
        <XEditor v-model="content" :height="500" class="bottom15" />
        <el-button @click="handleCreatePost()">发布</el-button>
    </div>
</template>

<script lang="ts">
export default {
    async asyncData({ app }) {
        let posts = []
        let amount = 0
        let page = 1
        const limit = 10
        const res = await app.$guy.get(`/community`)
        if (res.status === 200) {
            posts = res.data.result
            amount = res.data.amount
            // console.log(posts)
            page += 1
        }
        return {
            posts,
            amount,
            page,
            limit,
        }
    },
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
            ],
        }
    },
    // mounted() {
    //     this.refreshData()
    // },
    methods: {
        async refreshData() {
            const res = await this.$guy.get(`/community`)
            if (res.status === 200) {
                this.posts = res.data.result
                // console.log(this.posts)
            }
        },
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
                this.refreshData()
            } else {
                this.$message({
                    type: 'error',
                    message: '网络错误，请重试',
                })
            }
        },
        handlePageChange(page: number): void {
            this.page = page
            this.refreshData()
        },
    },
}
</script>

<style lang="stylus" scoped>
.post
    padding 20px

    &:not(:last-child)
        border-bottom 1px solid $divider-color

    .post-part
        &:not(:last-child)
            padding-bottom 10px

        .title
            color $first-color
            font-weight 700
            margin-bottom 0
            overflow hidden
            text-overflow ellipsis
            display -webkit-box
            -webkit-line-clamp 2
            -webkit-box-orient vertical

        .shortcut
            // color $weak-color
            overflow hidden
            text-overflow ellipsis
            display -webkit-box
            -webkit-line-clamp 2
            -webkit-box-orient vertical

        .amount
            text-align right
            font-size 12px
            color $weak-color

        .avatar
            border-radius 50%
            width 24px
            height 24px
            margin 0 5px

        .info
            font-size 14px
            color $weak-color

            .detail
                text-align right

.block
    height 32px

    .pagin
        float left /* 自适应内容宽度 */
        position relative
        left 50%

        .inner
            position relative
            left -50%
</style>
