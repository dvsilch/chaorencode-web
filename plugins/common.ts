const minute = 60
const hour = minute * 60
const day = hour * 24

class Common {
    context: any

    constructor(context: any) {
        this.context = context
    }

    fillZero(i) {
        return i < 10 ? '0' + i : i
    }

    timestampToTime(timestamp) {
        const date = new Date(timestamp * 1000) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
        const Y = date.getFullYear() + '-'
        const M = this.fillZero(date.getMonth() + 1) + '-'
        const D = this.fillZero(date.getDate()) + ' '
        const h = this.fillZero(date.getHours()) + ':'
        const m = this.fillZero(date.getMinutes()) + ':'
        const s = this.fillZero(date.getSeconds())
        return Y + M + D + h + m + s
        // return Y + M + D
    }

    beautifulTime(timestamp) {
        const gap = new Date().valueOf() / 1000 - timestamp
        if (gap < minute * 5) return '刚刚'
        if (gap < hour) return Math.floor(gap / minute) + '分钟前'
        if (gap < day) return Math.floor(gap / hour) + '小时前'
        let result = this.timestampToTime(timestamp).substring(0, 11)
        if (new Date().getFullYear().toString() === result.substring(0, 4)) {
            result = result.substring(5)
        }
        return result
    }

    formatImgUrl({ url, width = 1024, height = 1024 }) {
        let result = `${url}?imageView2/3/w/${Math.round(width)}/h/${Math.round(
            height,
        )}/interlace/1`

        if (this.context.$manager.supportWebp) {
            result += '/format/webp'
        } else if (url.substring(-4) === 'webp'){
            result += '/format/png'
        }
        return result
    }

    formatContent(content) {
        return content.replace(
            /\((https:\/\/qiniu\.chaorencode.com\/.*?)\)/g,
            (_, url) => {
                return (
                    '(' +
                    this.formatImgUrl({
                        url,
                        width: 1024,
                        height: 1024,
                    }) +
                    ')'
                )
            },
        )
    }
}
export default (context, inject) => {
    const common = new Common(context)
    inject('common', common)
}
