<template>
    <div class="container maxwidth">
        <div class="block">
            <div class="detail">
                <h1>
                    {{ post.title }}
                </h1>
                <el-row type="flex" align="middle">
                    <el-image
                        :src="post.avatar_url"
                        fit="cover"
                        class="avatar right15"
                    />
                    <el-col style="flex: 1">
                        <p>
                            {{ post.publisher }}
                        </p>
                        <p>
                            {{ $common.beautifulTime(post.publish_time) }}
                        </p>
                    </el-col>
                    <!-- <span class="floor">#1</span> -->
                </el-row>
                <XViwer :initial-value="post.content" class="content" />
            </div>
            <div
                v-for="(comment, index) in comments"
                :key="comment.id"
                class="detail"
            >
                <el-row type="flex" align="middle">
                    <el-image
                        :src="comment.avatar_url"
                        fit="cover"
                        class="avatar right15"
                    />
                    <el-col style="flex: 1">
                        <p>
                            {{ comment.publisher }}
                        </p>
                        <p>
                            {{ $common.beautifulTime(comment.publish_time) }}
                        </p>
                    </el-col>
                    <span class="floor">#{{ index + 1 }}</span>
                </el-row>
                <XViwer :initial-value="comment.content" class="content" />
            </div>
        </div>
        <XEditor v-model="newComment" :height="500" class="bottom15" />
        <el-button @click="createComment()">发表评论</el-button>
    </div>
</template>

<script>
export default {
    async asyncData({ app, route }) {
        let comments = []
        let amount = 0
        let post = {}
        let page = 1
        const limit = 10
        let postRes = app.$guy.get(`/community/${route.params.id}`)
        let commentRes = app.$guy.get(`/community/${route.params.id}/comments`)

        postRes = await postRes
        commentRes = await commentRes

        if (postRes.status === 200) {
            post = postRes.data.result
            // console.log(post)
        }
        if (commentRes.status === 200) {
            comments = commentRes.data.result
            amount = commentRes.data.amount
            // console.log(comments)
            page += 1
        }

        return {
            post,
            comments,
            amount,
            page,
            limit,
        }
    },
    data() {
        return {
            newComment: '',
        }
    },
    mounted() {
        // console.log(this.post)
    },
    methods: {
        async refreshPost() {
            const postRes = await this.$guy.get(
                `/community/${this.$route.params.id}`,
            )
            if (postRes.status === 200) {
                this.post = postRes.data.result
                // console.log(this.post)
            }
        },
        async refreshComment() {
            const commentRes = await this.$guy.get(
                `/community/${this.$route.params.id}/comments`,
                {
                    data: {
                        page: this.page,
                        limit: this.limit,
                    },
                },
            )

            if (commentRes.status === 200) {
                this.comments = commentRes.data.result
                this.amount = commentRes.data.amount
                // console.log(this.comments)
            }
        },
        async createComment() {
            if (this.newComment === '') {
                this.$message({
                    type: 'error',
                    message: '请输入评论',
                })
                return
            }

            const res = await this.$guy.postWithSign(
                `/community/${this.$route.params.id}/comments`,
                {
                    data: { comment: this.newComment },
                },
            )

            if (res.code === 470) {
                this.$message({
                    type: 'error',
                    message: '请先登录',
                })
            } else if (res.status === 200) {
                this.$message({
                    type: 'success',
                    message: '发布成功',
                })
                this.refreshComment()
                this.newComment = ''
            } else {
                this.$message({
                    type: 'error',
                    message: '发布失败，请重试',
                })
            }
        },
    },
}
</script>

<style lang="stylus" scoped>
.container
    padding 30px 60px

    .block
        padding 30px

        .detail
            padding 30px 0 10px

            &:first-child
                padding-top 0

            &:not(:last-child)
                border-bottom 1px solid $divider-color

            .avatar
                border-radius 50%
                width 60px
                height 60px
                border 1px solid $divider-color

            .floor
                color $weak-color

            .content
                padding 20px 0 20px 75px
</style>
