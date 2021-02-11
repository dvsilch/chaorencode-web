<template>
    <div>登录成功</div>
</template>

<script>
export default {
    layout: 'login',
    mounted() {
        if (this.$route.query.code) {
            window.parent.postMessage(
                this.$route.query.code,
                `${parent.window.location.href}`,
            )
        }
    },
}
</script>
