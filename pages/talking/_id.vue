<template>
    <div class="container">
        <!-- <div class="aspect">
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
        </div> -->
        <Aspect class="header" :x="16" :y="9">
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
        </Aspect>
        <h2 class="title">{{ talking.title }}</h2>
        <XViwer class="content" :initial-value="talking.content" />
    </div>
</template>

<script lang="ts">
export default {
    async asyncData({ app, route }) {
        let talkingResult = app.$guy.get(`/talkings/${route.params.id}`)

        talkingResult = await talkingResult

        let talking
        if (talkingResult.status === 200) {
            talking = talkingResult.data
        }
        return {
            talking,
        }
    },
    data() {
        return {}
    },
    head() {
        return {
            title: this.talking.title + ' - 超人编程',
        }
    },
}
</script>

<style lang="stylus" scoped>
.container
    max-width 690px
    margin 0 auto
    .header
        margin-bottom 20px
        .image
            border-radius 6px

    .title
        font-weight 700
</style>
