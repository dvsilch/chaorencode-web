class Manager {
    context: any
    supportWebp = false
    constructor(context: any) {
        this.context = context
        this.detectWebp()
    }

    detectWebp() {
        if (this.context.app.$cookiz.get('webp') != null) {
            this.supportWebp = this.context.app.$cookiz.get('webp')
        } else if (process.server) {
            if (
                this.context.req.headers.accept &&
                this.context.req.headers.accept.includes('image/webp')
            ) {
                this.supportWebp = true
                this.context.app.$cookiz.set('webp', true)
            } else {
                this.context.app.$cookiz.set('webp', false)
            }
        }
    }
}

export default (context: any, inject: any) => {
    const manager = new Manager(context)
    inject('manager', manager)
}
