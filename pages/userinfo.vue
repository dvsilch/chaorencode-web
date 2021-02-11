<template>
    <div class="container maxwidth">
        <div v-if="!isChangeInfo" class="userinfo">
            <div>用户信息</div>
            <el-row type="flex" align="middle">
                <el-image
                    class="avatar"
                    :src="$store.state.loginState.avatarUrl"
                />
                <div>
                    <p>昵称</p>
                    <p>
                        {{ $store.state.loginState.username }}
                    </p>
                </div>
            </el-row>
            <p class="botton hover" @click="setMode()">修改个人信息</p>
        </div>
        <div v-else class="userinfo">
            <div>修改信息</div>
            <el-row type="flex" align="middle">
                <div>
                    <el-image :src="imgUrl" class="avatar" />
                    <p class="botton hover" @click="selectImg('append-file')">
                        修改头像
                    </p>
                </div>
                <input
                    id="append-file"
                    style="display: none"
                    type="file"
                    accept="image/png, image/jpeg"
                    @change="appendImgChange"
                />
                <div>
                    <p>昵称</p>
                    <el-input v-model="username" />
                </div>
            </el-row>
            <p class="botton hover" @click="updateUserInfo()">保存</p>
            <p class="botton hover" @click="setMode()">返回</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            imgUrl: this.$store.state.loginState.avatarUrl,
            isEditUsername: false,
            username: this.$store.state.loginState.username,
            isChangeInfo: false,
        }
    },
    methods: {
        selectImg(id) {
            document.getElementById(id).click()
        },
        appendImgChange() {
            this.file = event.target.files[0]
            event.target.value = null

            const reader = new FileReader()
            reader.readAsDataURL(this.file)
            reader.onload = (e) => {
                this.imgUrl = e.target.result
            }
        },
        editUsername() {
            this.isEditUsername = !this.isEditUsername
        },
        async updateUserInfo() {
            const data = { username: this.username }
            if (this.file != null) {
                data.user_avatar = this.file
            }
            const res = await this.$guy.putWithSign(
                `/userinfo/${this.$store.state.loginState.userId}`,
                {
                    data,
                },
            )
            if (res.status === 200) {
                this.$message()
                this.$store.state.loginState.avatarUrl = this.imgUrl
                this.$store.state.loginState.username = this.username
            }
        },
        setMode() {
            this.isChangeInfo = !this.isChangeInfo
        },
    },
}
</script>

<style lang="stylus" scoped>
.container
    .userinfo
        display flex
        flex-direction column
        align-items center

        .avatar
            border-radius 50%
            width 100px
            height 100px
            border 1px solid grey
            margin-right 30px
</style>
