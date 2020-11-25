let router

function fillZero(i) {
    return i < 10 ? '0' + i : i
}

function timestampToTime(timestamp) {
    const date = new Date(timestamp * 1000) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
    const Y = date.getFullYear() + '-'
    const M = fillZero(date.getMonth() + 1) + '-'
    const D = fillZero(date.getDate()) + ' '
    const h = fillZero(date.getHours()) + ':'
    const m = fillZero(date.getMinutes()) + ':'
    const s = fillZero(date.getSeconds())
    return Y + M + D + h + m + s
    // return Y + M + D
}
const minute = 60
const hour = minute * 60
const day = hour * 24

function beautifulTime(timestamp) {
    const gap = new Date().valueOf() / 1000 - timestamp
    if (gap < minute * 5) return '刚刚'
    if (gap < hour) return Math.floor(gap / minute) + '分钟前'
    if (gap < day) return Math.floor(gap / hour) + '小时前'
    let result = timestampToTime(timestamp).substring(0, 11)
    if (new Date().getFullYear().toString() === result.substring(0, 4)) {
        result = result.substring(5)
    }
    return result
}

function resolve(to) {
    return router.resolve(to).href
}

function formatImgUrl({ url, width = 1024, height = 1024, quality = 90 }) {
    return `${url}?imageView2/1/w/${width}/h/${height}/interlace/1/q/${quality}|imageslim`
}

export default ({ app }, inject) => {
    router = app.router
    inject('common', {
        beautifulTime,
        timestampToTime,
        formatImgUrl,
        resolve,
    })
}
