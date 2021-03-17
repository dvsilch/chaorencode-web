export const state = () => ({
    loginState: {
        logined: false,
        key: null,
        userId: null,
        avatarUrl: null,
        username: null,
        permission: null,
    },
    isLoginDialogShow: false,
})

export const mutations = {
    login(state, { key, userId, username, avatarUrl, permission }) {
        // 保持登录状态
        state.loginState.key = key
        state.loginState.userId = userId
        state.loginState.username = username
        state.loginState.avatarUrl = avatarUrl
        state.loginState.permission = permission
        state.loginState.logined = true
    },
    logout(state) {
        // 清除
        state.loginState.key = null
        state.loginState.userId = null
        state.loginState.username = null
        state.loginState.avatarUrl = null
        state.loginState.permission = null
        state.loginState.logined = false
    },
    refresh(state, { username, avatarUrl, permission }) {
        // 刷新用户信息
        state.loginState.username = username
        state.loginState.avatarUrl = avatarUrl
        state.loginState.permission = permission
    },
}
