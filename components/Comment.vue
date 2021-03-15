<template>
    <div>
        <el-row type="flex">
            <el-image
                v-if="$store.state.loginState.logined"
                :src="$store.state.loginState.avatarUrl"
                class="avatar"
            />
            <el-input
                v-model="comment"
                type="textarea"
                :rows="4"
                placeholder="分享你的评论……"
                maxlength="200"
                show-word-limit
                style="flex: 1"
            />
        </el-row>
        <div class="comment-info">
            <div
                class="button"
                @click="$emit('post-comment', { comment, isPhone })"
            >
                发布
            </div>
            <div class="button" @click="clearComment()">清空</div>
        </div>
        <div class="whole-comments hidden-sm-and-down">
            <div
                v-for="(item, index) in comments"
                :key="item.id"
                class="single-comment"
            >
                <el-row type="flex">
                    <div>
                        <el-row type="flex">
                            <el-col>
                                <el-image :src="item.avatar_url" />
                            </el-col>
                            <el-col>
                                <p class="comment-username">
                                    {{ item.username }}
                                </p>
                                <p class="comment-publish-time">
                                    回复于{{
                                        $common.beautifulTime(item.publish_time)
                                    }}
                                </p>
                            </el-col>
                        </el-row>
                    </div>
                    <el-col>
                        <p class="comment-index">
                            {{ 10 * (page - 1) + index + 1 }}楼
                        </p>
                    </el-col>
                </el-row>
                <p class="comment-content">
                    {{ item.content }}
                </p>
            </div>
        </div>
        <div class="whole-comments hidden-md-and-up">
            <div
                v-for="(item, index) in comments"
                :key="item.id"
                class="single-comment"
            >
                <el-row type="flex" justify="space-between">
                    <p class="comment-username">
                        {{ item.username }}
                    </p>
                    <p class="comment-index">{{ index + 1 }}楼</p>
                </el-row>
                <p class="comment-publish-time">
                    回复于{{ $common.beautifulTime(item.publish_time) }}
                </p>
                <p class="comment-content">
                    {{ item.content }}
                </p>
            </div>
        </div>
        <p v-if="amount === 0" class="no-comments">暂无评论</p>
        <div v-else class="pagin hidden-sm-and-down">
            <el-pagination
                class="inner"
                background
                :page-size="10"
                :pager-count="5"
                layout="total, prev, pager, next, jumper"
                :total="amount"
                :current-page.sync="page"
                @current-change="handlePageChange"
            />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        comments: {
            type: Array,
            default: () => [],
        },
        amount: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            comment: '',
            page: 1,
            limit: 10,
            isPhone: false,
        }
    },
    mounted() {
        const _this = this
        const clientWidth = document.documentElement.clientWidth // 获取客户端宽度
        _this.isPhone = clientWidth < 992

        if (_this.isPhone) {
            window.onscroll = function () {
                // 变量scrollTop是滚动条滚动时，距离顶部的距离
                const scrollTop =
                    document.documentElement.scrollTop ||
                    document.body.scrollTop

                // 变量windowHeight是可视区的高度
                const windowHeight =
                    document.documentElement.clientHeight ||
                    document.body.clientHeight

                // 变量scrollHeight是滚动条的总高度
                const scrollHeight =
                    document.documentElement.scrollHeight ||
                    document.body.scrollHeight

                // 滚动条到底部的条件，200为footer的高度
                if (scrollTop + windowHeight === scrollHeight) {
                    // 到了这个就可以进行业务逻辑加载后台数据了
                    _this.page++
                    _this.$emit('handle-page-change', {
                        page: _this.page,
                        limit: _this.limit,
                        isPhone: _this.isPhone,
                    })
                }
            }
        }
    },
    methods: {
        refresh(currentPage) {
            this.clearComment()
            this.page = currentPage
            this.handlePageChange(currentPage)
        },
        handlePageChange(page) {
            // console.log(page)
            this.$emit('handle-page-change', {
                page,
                limit: this.limit,
                isPhone: this.isPhone,
            })
        },
        clearComment() {
            this.comment = ''
        },
    },
}
</script>

<style lang="stylus" scoped>
.avatar
    border-radius 50%
    width 50px
    height 50px
    margin-right 10px

.comment-info
    display flex
    justify-content flex-end
    padding-top 20px

    .input
        width 200px
        margin-right 10px

    .button
        display inline-block
        cursor pointer
        background $first-color
        color white
        border-radius 3px
        padding 5px 10px
        // height 38px
        line-height 28px

    *:not(:last-child)
        margin-right 10px

.whole-comments
    padding 20px 0

    .single-comment
        // padding 40px 20px 20px
        padding 20px 0

        .comment-username
            font-size 14px

        .comment-index
            font-size 12px
            color rgb(190, 190, 190)
            text-align right

        .comment-publish-time
            padding-top 5px
            font-size 12px
            color rgb(190, 190, 190)

        .comment-content
            padding 20px
            // text-indent 2em

    .single-comment:not(:last-child)
        border-bottom 1px solid rgb(229, 228, 226)

.loading
    height 50px

.no-comments
    padding 40px 0
    text-align center
    color rgb(190, 190, 190)
    font-size 20px

.pagin
    float left /* 自适应内容宽度 */
    position relative
    left 50%

    .inner
        position relative
        left -50%
</style>
