<template>
    <!-- <client-only> -->
    <div>
        <video
            ref="videoPlayer"
            class="video-js vjs-16-9 vjs-big-play-centered"
            controls
            preload="auto"
            playsinline
            webkit-playsinline
        >
            <p class="vjs-no-js">
                To view this video please enable JavaScript, and consider
                upgrading to a web browser that
                <a
                    href="https://videojs.com/html5-video-support/"
                    target="_blank"
                    >supports HTML5 video</a
                >
            </p>
        </video>
    </div>
    <!-- </client-only> -->
</template>

<script>
import videojs from 'video.js'
import 'video.js/dist/video-js.min.css'

export default {
    name: 'VideoPlayer',
    props: {
        options: {
            type: Object,
            default() {
                return {}
            },
        },
    },
    data() {
        return {
            player: null,
        }
    },
    watch: {
        options(_) {
            if (this.player) {
                this.player.dispose()
            }
            this.player = videojs(
                this.$refs.videoPlayer,
                this.options,
                function onPlayerReady() {
                    console.log('onPlayerReady', this)
                },
            )
        },
    },
    beforeDestroy() {
        if (this.player) {
            this.player.dispose()
        }
    },
}
</script>
