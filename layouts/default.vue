<template>
    <div class="main">
        <div>
            <nav class="nav">
                <nuxt-link to="/">
                    <el-row type="flex" align="middle">
                        <el-image
                            class="logo right10"
                            src="/logo-mini.png"
                            fit="cover"
                        />
                        <p>超人编程</p>
                    </el-row>
                </nuxt-link>
                <el-row>
                    <p class="botton hover">话语</p>
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
    min-height 100%
    display flex
    flex-direction column
    justify-content space-between
    .nav
        display flex
        justify-content space-between
        align-items center
        max-width 1300px
        margin 0 auto
        padding 0 20px
        box-shadow rgba(0, 0, 0, 0.1) 0px 1px 0px
        height 60px
        margin-bottom 30px
        .logo
            height 40px
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
