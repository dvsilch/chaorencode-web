import axios from 'axios'

class Guy {
    context: any
    constructor(context: any) {
        this.context = context
    }

    get(url: string, { data = {}, sign = false } = {}) {
        return this.request('get', url, data, sign)
    }

    put(url: string, { data = {}, sign = false } = {}) {
        return this.request('put', url, data, sign)
    }

    post(url: string, { data = {}, sign = false } = {}) {
        return this.request('post', url, data, sign)
    }

    // delete(url: string, { data = {}, sign = false } = {}) {
    //     return this.request('delete', url, data, sign)
    // }

    getWithSign(url: string, { data = {}, strict = true } = {}) {
        return this.request('get', url, data, true, strict)
    }

    putWithSign(url: string, { data = {}, strict = true } = {}) {
        return this.request('put', url, data, true, strict)
    }

    postWithSign(url: string, { data = {}, strict = true } = {}) {
        return this.request('post', url, data, true, strict)
    }

    deleteWithSign(url: string, { data = {}, strict = true } = {}) {
        return this.request('delete', url, data, true, strict)
    }

    request(
        method: string,
        url: string,
        data: any,
        sign: boolean,
        strict = false,
    ) {
        // console.log(this.context.store)
        // console.log(this.context.store.state)
        // sign === false && strict      true 的时候 ! 为 false  就报错
        // 不签名 却 又强制时就报错
        // 签名 又 不强制  不报
        // 签名 又 强制 不报
        // 不签名 又 不强制 不报
        console.assert(
            !(sign === false && strict),
            'strict cant not be true when sign is false',
        )

        if (sign && this.context.store.state.loginState.logined === false) {
            if (strict) {
                this.context.redirect('/login')
                return new Promise((resolve) => {
                    resolve({ response: null, code: 470 })
                })
            } else {
                sign = false
            }
        }
        // console.log(process)
        url = process.env.baseUrl + url
        if (data == null) {
            data = {}
        }

        let isFile = false
        for (const key in data) {
            console.assert(data[key] !== null, `${key} must not be none`)
            if (data[key] === null) {
                return new Promise((resolve, reject) => {
                    resolve({
                        status: 0,
                        error: 'must not be none',
                    })
                })
            }
            if (
                process.client &&
                (data[key] instanceof File || data[key] instanceof Blob)
            ) {
                isFile = true
            }
        }

        if (sign) {
            data.__id__ = this.context.store.state.loginState.userId
            data.__key__ = this.context.store.state.loginState.key
        }

        data = data && typeof data === 'object' ? data : {}
        const config: any = {
            url,
            method,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            },
        }
        // console.log(typeof data['file'])
        // post请求时需要设定Content-Type
        if (method === 'post' || method === 'put' || method === 'delete') {
            if (isFile) {
                config.headers['Content-Type'] = 'multipart/form-data'
                const temp = new FormData()
                for (const idex in data) {
                    temp.append(idex, data[idex])
                }
                data = temp
            }
            config.data = data
        } else if (method === 'get') {
            config.params = data
        }
        // console.log(config)
        return new Promise((resolve, reject) => {
            axios(config)
                .then(function (response: any) {
                    resolve({
                        response,
                        code: response.data.code || response.status,
                        status: response.status,
                        data: response.data,
                    })
                })
                .catch((error: any) => {
                    if (error.response) {
                        if (error.response.status === 470) {
                            if (error.response.data.code === 1401) {
                                this.context.store.commit('logout')
                            }
                            resolve({
                                response: error.response,
                                code:
                                    error.response.data.code ||
                                    error.response.status,
                                status: error.response.status,
                                data: error.response.data,
                            })
                        } else {
                            resolve({
                                response: error.response,
                                code: error.response.status,
                                status: error.response.status,
                            })
                        }
                    } else {
                        // reject( Error({ error }))
                        // reject(error)
                        // console.log(error.code)
                        resolve({
                            status: -1,
                            error,
                        })
                    }
                })
        })
    }
}

export default (context: any, inject: any) => {
    const guy = new Guy(context)
    inject('guy', guy)
}
