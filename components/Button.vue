<template>
    <div class="box">
        <div v-show="active" class="c-bolts">
            <span class="bolt b1">⚡</span>
            <span class="bolt b2">⚡</span>
            <span class="bolt b3">⚡</span>
        </div>
        <button
            class="button"
            @click="click"
            @mousedown="onMouseDown"
            @mouseup="onMouseUp"
            @mouseover="onMouseOver"
            @mouseleave="onMouseLeave"
        >
            <div ref="eyes" class="anim-blink">
                <span class="outside-left circle">
                    <span class="inside circle"></span>
                </span>
                <span class="outside-right circle">
                    <span class="inside circle"></span>
                </span>
            </div>
            <span class="little-left circle"></span>
            <span class="little-right circle"></span>
            <div ref="btnText" class="text"><slot></slot></div>
        </button>
    </div>
</template>
<script>
import anime from 'animejs/lib/anime.min.js'
export default {
    data() {
        return {
            active: false,
        }
    },
    mounted() {
        this.playBlinkAnimation()
        // this.activeBoltAnimation()
    },
    methods: {
        playBlinkAnimation() {
            anime({
                targets: '.anim-blink',
                opacity: [1, 0],
                duration: 100,
                delay: () => {
                    return 1800 * (Math.random() * (4 - 1) + 1)
                },
                loop: true,
                easing: 'easeInOutQuad',
            })
        },
        activeBoltAnimation() {
            this.active = true
            anime({
                targets: '.c-bolts .bolt',
                opacity: [0, 1],
                rotate: [25, 0],
                translateY: [-10, 3],
                duration: 140,
                delay: (_, i) => {
                    return 140 * i
                },
                loop: true,
                direction: 'alternate',
                easing: 'linear',
            })
        },
        click() {
            this.$emit('click', event)
        },
        onMouseDown() {
            // Ironic, isn't it?
            this.activeBoltAnimation()
        },
        onMouseUp() {
            this.active = false
        },
        onMouseOver() {
            this.activeBoltAnimation()
        },
        onMouseLeave() {
            this.active = false
        },
    },
}
</script>

<style lang="stylus">
$purple = #65336e
$red = #f15c7e
$yellow = #ffdb8a
$ghostwhite = #eafee9

.box
    position relative
    display inline-block

.c-bolts
    position absolute
    top -60px
    left 0
    right 0
    text-align center
    .bolt
        display inline-block
        opacity 0
    .b1
        font-size 1.5rem
    .b2
        font-size 2rem
    .b3
        font-size 1.5rem

.button:active
    transform translateY(3px)
.button
    cursor pointer
    position relative
    padding 1rem
    overflow hidden
    transition all 100ms
    background-color $yellow
    border-width 4px
    border-radius 6px
    border-color $purple
    .circle
        border-radius 50%
    .anim-blink
        position relative
        .outside-left
            left -5px
        .outside-right
            right -5px
        .outside-left, .outside-right
            // circle p1 bg-purple width1 height2 inline-block absolute top-0 overflow-hidden
            background $purple
            width 16px
            height 20px
            display inline-block
            position absolute
            top 0
            overflow hidden
            .inside
                position absolute
                display inline-block
                background white
                height 8px
                width 8px
                left 0
                right 0
    .little-left, .little-right
        position absolute
        bottom -5px
        height 16px
        display inline-block
        width 16px
        background #f15c7e
    .little-left
        left -5px
    .little-right
        right -5px
    .text
        padding 0 2rem
        color $purple
        font-weight 700
        font-size 18px

// .inline-block
//     display inline-block
// .absolute
//     position absolute

// .bg-red {
//     background-color: $red
// }
// .bg-ghostwhite {
//     background-color: $ghostwhite
// }
// .bg-yellow {
//     background-color: $yellow
// }
// .bg-purple {
//     background-color: $purple
// }
// .border-width-3 {
//     border-width: 4px
// }
// .border-purple {
//     border-color: $purple
// }
// .rounded3 {
//     border-radius: 6px
// }
// .purple {
//     color: $purple
// }

// .width05 {
//     width: 8px
// }
// .height05 {
//     height: 8px
// }
// .width1 {
//     width: 16px
// }
// .height1 {
//     height: 16px
// }
// .height2 {
//     height: 20px
// }

// .top-neg1 {
//     top: -5px
// }
// .top-neg4 {
//     top: -60px
// }
// .bottom-neg1 {
//     bottom: -5px
// }
// .left-neg1 {
//     left: -5px
// }
// .right-neg1 {
//     right: -5px
// }

// .y1-active:active {
//     transform: translateY(3px)
// }
</style>
