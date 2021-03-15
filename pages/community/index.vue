<template>
    <div class="container maxwidth">
        <el-row :gutter="60">
            <el-col v-loading="geting" :span="16">
                <el-row type="flex">
                    <el-col style="flex: 1"></el-col>
                    <div class="button" @click="createPost()">发布新内容</div>
                </el-row>
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
                            <h3 class="title">
                                {{ post.title }}
                            </h3>
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
            geting: false,
        }
    },
    // mounted() {
    //     this.refreshData()
    // },
    methods: {
        async refreshData(): Promise<void> {
            this.geting = true
            await this.originRefreshData()
            this.geting = false
        },
        async originRefreshData(): Promise<void> {
            const res = await this.$guy.get(`/community`, {
                data: { page: this.page, limit: this.limit },
            })
            if (res.status === 200) {
                this.posts = res.data.result
                // console.log(this.posts)
            }
        },
        handlePageChange(page: number): void {
            this.page = page
            this.refreshData()
        },
        createPost(): void {
            if (this.$store.state.loginState.logined) {
                this.$router.push({ name: 'community-create' })
            } else {
                this.$alert('请先登录')
            }
        },
    },
}
</script>

<style lang="stylus" scoped>
.button
    display inline-block
    cursor pointer
    background $first-color
    color white
    border-radius 3px
    padding 5px 10px
    // height 38px
    line-height 28px

.post
    padding 20px

    &:not(:last-child)
        border-bottom 1px solid $divider-color

    .post-part
        &:not(:last-child)
            padding-bottom 10px

        .title
            color $primary-color
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
