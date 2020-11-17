// import { Store } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
// import * as Cookies from 'js-cookie'

export default ({ store, app }) => {
    createPersistedState({
        storage: {
            getItem: (key) => {
                return app.$cookiz.get(key, { parseJSON: false })
            },
            // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
            setItem: (key, value) => {
                app.$cookiz.set(key, value)
                // app.$cookiz.set(key, value, { expires: 3, secure: false })
            },
            // removeItem: key => Cookies.remove(key)
            removeItem: (key) => app.$cookiz.remove(key)
        }
    })(store)
}
