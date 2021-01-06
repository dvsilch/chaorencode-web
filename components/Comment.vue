<template>
    <div class="hidden-sm-and-down">
        <el-input
            v-model="comment.content"
            type="textarea"
            :rows="4"
            placeholder="分享你的评论……"
            maxlength="200"
            show-word-limit
            class="comment-input"
        />
        <div class="comment-info">
            <el-input
                v-model="comment.username"
                placeholder="请输入用户名……"
                class="input"
                maxlength="10"
                show-word-limit
            />
            <div class="button" @click="$emit('post-comment', comment)">
                发布
            </div>
        </div>
        <div class="whole-comments">
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
                <!-- <el-button @click="putComment(item.id)">
                                删除该条评论
                            </el-button> -->
            </div>
        </div>
        <p v-if="amount === 0" class="no-comments">暂无评论</p>
        <!-- <el-pagination
            v-else
            class="pagin"
            background
            :page-size="10"
            :pager-count="5"
            layout="total, prev, pager, next, jumper"
            :total="amount"
            @current-change="handlePageChange"
        /> -->
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
            comment: {
                content: '',
                username: '',
            },
        }
    },
    methods: {
        clearComment() {
            this.comment.content = ''
            this.comment.username = ''
        },
        handlePageChange(page) {
            // console.log(page)
            this.$emit('handle-page-change', page)
        },
    },
}
</script>

<style lang="stylus" scoped>
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

        .comment-publish-time
            padding-top 5px
            font-size 12px
            color rgb(190, 190, 190)

        .comment-content
            padding 20px
            // text-indent 2em

    .single-comment:not(:last-child)
        border-bottom 1px solid rgb(229, 228, 226)

.no-comments
    padding 40px 0
    text-align center
    color rgb(190, 190, 190)
    font-size 20px

// .comment-input
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
</style>
