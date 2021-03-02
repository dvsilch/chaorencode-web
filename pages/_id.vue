<template>
    <div class="container"></div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
    mounted() {
        alert(this.$route.params.id)
    },
})
</script>
