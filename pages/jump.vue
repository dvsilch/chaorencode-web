<template>
    <div>jump page</div>
</template>

<script>
export default {
    mounted() {
        window.location.replace(
            'http://dvsilch.free.idcfengye.com/loading?code=' +
                this.$route.query.code,
        )
    },
}
</script>

<style></style>
