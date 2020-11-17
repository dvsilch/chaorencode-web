export const state = () => ({
    loginState: {
        logined: false,
        key: null,
        userId: null,
        avatarUrl: null,
        username: null,
        noteAmount: 0,
        permission: null,
    },
    right: {
        component: null,
        data: null,
    },
})

export const mutations = {
    info(state, { username, avatarUrl, permission, noteAmount }) {
        state.loginState.username = username
        state.loginState.avatarUrl = avatarUrl
        state.loginState.permission = permission
        state.loginState.noteAmount = noteAmount
    },
    login(state, { key, userId }) {
        // 保持登录状态
        state.loginState.key = key
        state.loginState.userId = userId
        state.loginState.logined = true
    },
    logout(state) {
        // 清除
        state.loginState.key = null
        state.loginState.userId = null
        state.loginState.username = null
        state.loginState.avatarUrl = null
        state.loginState.noteAmount = 0
        state.loginState.permission = null
        state.loginState.logined = false
    },
    right(state, { component, data }) {
        state.right.component = component
        state.right.data = data
    },
    closeRight(state) {
        state.right.component = null
        state.right.data = null
    },
}
