const resolve = require('path').resolve

export default {
    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        title: '超人编程 - 学编程，来超人',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content:
                    'width=device-width, height=device-height, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0',
            },
            {
                hid: 'description',
                name: 'description',
                property: 'og:description',
                content: '学编程，来超人，超人编程是质量最高的编程学习网站。',
            },
            {
                hid: 'keywords',
                name: 'keywords',
                content:
                    '学编程,学python来超人,编程学习,在线编程,python,在线python,c#,java,教育,代码,程序,少儿编程,职业编程,大学生编程',
            },
        ],
        link: [
            {
                rel: 'shortcut icon',
                type: 'image/x-icon',
                href: '/favicon.ico',
            },
            {
                rel: 'stylesheet',
                href:
                    'https://fonts.googleapis.com/css?family=Noto+Sans+SC:100,200,300,400,500,700,800,900',
            },
        ],
        // link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },

    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: ['element-ui/lib/theme-chalk/index.css', 'assets/global.styl'],

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: [
        '@/plugins/element-ui',
        // '@/plugins/scrollactive',
        '@/plugins/guy',
        '@/plugins/common',
        '@/plugins/manager',
        '@/plugins/local-storage',
        {
            src: '@/plugins/iconfont.js',
            mode: 'client',
        },
        // {
        //     src: '@/plugins/viewer',
        //     mode: 'client',
        // },
    ],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [
        // https://go.nuxtjs.dev/typescript
        '@nuxt/typescript-build',
        [
            'nuxt-stylus-resources-loader',
            resolve(__dirname, 'assets/variables.styl'),
        ],
    ],

    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        ['cookie-universal-nuxt', { alias: 'cookiz' }],
    ],

    // Axios module configuration (https://go.nuxtjs.dev/config-axios)
    axios: {},

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {
        extractCSS: { ignoreOrder: true },
        transpile: [/^element-ui/],
    },
    env: {
        baseUrl:
            process.env.NODE_ENV === 'production'
                ? 'https://chaorencode.com/api/app'
                : 'http://127.0.0.1:9000/api/app',
        // 'https://chaorencode.com/api/app',
    },
}
