export default async ({ store, app }) => {
    if (store.state.loginState.logined) {
        const res = await app.$guy.getWithSign(`/userinfo`)
        if (res.status === 200) {
            store.commit('refresh', {
                username: res.data.result.username,
                avatarUrl: res.data.result.avatar_url,
                permission: res.data.result.permission,
            })
        }
    }
}
