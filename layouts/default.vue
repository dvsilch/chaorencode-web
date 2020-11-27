<template>
    <div class="main">
        <div>
            <nav class="nav maxwidth">
                <nuxt-link to="/">
                    <el-row type="flex" align="middle">
                        <el-image
                            class="logo right5"
                            src="/favicon.ico"
                            fit="contain"
                        />
                        <p>超人编程</p>
                    </el-row>
                </nuxt-link>
                <el-row>
                    <nuxt-link :to="{ name: 'talking' }">
                        <p class="botton hover">言语</p>
                    </nuxt-link>
                </el-row>
            </nav>
            <Nuxt />
        </div>

        <footer class="footer">
            <a
                href="http://beian.miit.gov.cn"
                target="_blank"
                rel="nofollow noopener noreferrer"
                class="beian"
                >京ICP备20010819号-5</a
            >
        </footer>
    </div>
</template>

<style lang="stylus" scoped>
.main
    min-height 100vh
    display flex
    flex-direction column
    justify-content space-between
    .nav
        display flex
        justify-content space-between
        align-items center
        box-shadow rgba(0, 0, 0, 0.1) 0px 1px 0px
        height 60px
        padding 0 20px
        // margin-bottom 20px
        font-weight 500
        .logo
            height 40px
            width 40px
        .botton
            padding 4px 10px
.footer
    display flex
    flex-direction column
    justify-content center
    width fit-content
    margin 0 auto
    min-height 200px
    .beian
        font-size 14px
        color $prompt-color
</style>
