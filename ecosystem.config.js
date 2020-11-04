export const apps = [
    {
        name: 'chaorencode-web',
        exec_mode: 'cluster',
        instances: 'max',
        script: './node_modules/nuxt/bin/nuxt.js',
        args: 'start'
    }
]
