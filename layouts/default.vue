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
                <el-row type="flex" align="middle">
                    <nuxt-link to="/community">
                        <p class="botton hover">社区</p>
                    </nuxt-link>
                    <el-divider direction="vertical" />
                    <nuxt-link :to="{ name: 'talking' }">
                        <p class="botton hover">言语</p>
                    </nuxt-link>
                    <el-divider v-if="!isPhone" direction="vertical" />
                    <el-popover
                        v-if="!isPhone && $store.state.loginState.logined"
                        placement="bottom"
                        width="10"
                        trigger="hover"
                    >
                        <el-row align="middle">
                            <nuxt-link class="setting hover" to="/userinfo">
                                <i class="el-icon-user right5" />
                                我的主页
                            </nuxt-link>
                            <p class="setting hover" @click="wechatLogout()">
                                <i class="el-icon-switch-button right5" />
                                退出登录
                            </p>
                        </el-row>
                        <el-image
                            slot="reference"
                            class="avatar hover"
                            :src="$store.state.loginState.avatarUrl"
                            fit="contain"
                        />
                    </el-popover>
                    <p
                        v-if="!$store.state.loginState.logined && !isPhone"
                        class="botton hover"
                        @click="wechatLogin()"
                    >
                        登录
                    </p>
                </el-row>
                <el-dialog
                    id="dialog"
                    :visible.sync="$store.state.isLoginDialogShow"
                    width="30%"
                    center
                >
                    <div id="login" />
                </el-dialog>
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

<script>
export default {
    data() {
        return {
            APPID: 'wx1d233f097b746a03',
            REDIRECT_URI:
                process.env.NODE_ENV === 'production'
                    ? 'https%3A%2F%2Fchaorencode.com%2Floading'
                    : 'https%3A%2F%2Fchaorencode.com%2Fjump',
            isPhone: false,
        }
    },
    mounted() {
        // 判断是否为手机
        if (document.documentElement.clientWidth < 992) {
            this.isPhone = true
        }

        // 监听两个事件：
        // 登录前打开对话框扫码
        // 扫码成功后关闭对话框
        window.addEventListener('message', (event) => {
            const code = event.data
            if (code === 'setLogin') {
                this.wechatLogin()
            } else if (typeof code !== 'object' && code !== '') {
                // vue/nuxt自带监听一个事件传回一个对象，所以当传回的是对象时不执行login()
                this.login(code)
            }
        })
    },
    methods: {
        setVisible() {
            this.$store.state.isLoginDialogShow = !this.$store.state
                .isLoginDialogShow
        },
        wechatLogin() {
            // 暂不支持手机端登录
            if (this.isPhone) {
                this.$message({
                    type: 'error',
                    message: '暂不支持手机登录',
                })
                return
            }
            this.setVisible()
            setTimeout(
                () =>
                    // eslint-disable-next-line
                    new WxLogin({
                        self_redirect: true,
                        id: 'login',
                        appid: this.APPID,
                        scope: 'snsapi_login',
                        redirect_uri: this.REDIRECT_URI,
                        state: '',
                        style: '',
                        href: '',
                        lang: 'zh-CN',
                    }),
                0,
            )
        },
        wechatLogout() {
            this.$confirm('是否退出登录？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                    this.$store.commit('logout')
                    this.$message({
                        type: 'success',
                        message: '退出登录成功',
                    })
                })
                .catch(() => {})
        },
        async login(code) {
            const res = await this.$guy.post(`/wechat/code`, {
                data: {
                    code,
                },
            })
            if (res.status === 200) {
                this.setVisible()
                // console.log(res.data)
                this.$store.commit('login', {
                    key: res.data.key,
                    userId: res.data.user_id,
                    username: res.data.username,
                    avatarUrl: res.data.avatar_url,
                    permission: res.data.permission,
                })
            }
        },
    },
}
</script>

<style lang="stylus" scoped>
#login
    width 300px
    margin auto

.main
    min-height 100vh
    display flex
    flex-direction column
    justify-content space-between

    .nav
        display flex
        justify-content space-between
        align-items center
        box-shadow rgba(0, 0, 0, .1) 0px 1px 0px
        height 60px
        padding 0 20px
        // margin-bottom 20px
        font-weight 500

        .logo
            height 40px
            width 40px

        .botton
            padding 4px 10px

        .avatar
            border-radius 50%
            width 50px
            height 50px
            padding 5px

.setting
    padding 10px 0
    text-align center

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
