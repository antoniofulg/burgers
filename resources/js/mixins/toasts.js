export default {
    methods: {
        dangerToast(title, body) {
            this.$bvToast.toast(`${body}`, {
                title: `${title}`,
                toaster: 'b-toaster-top-right',
                solid: true,
                appendToast: false,
                variant: 'danger'
            })
        },
        infoToast(title, body) {
            this.$bvToast.toast(`${body}`, {
                title: `${title}`,
                toaster: 'b-toaster-top-right',
                solid: true,
                appendToast: false,
                variant: 'info'
            })
        },
        successToast(title, body) {
            this.$bvToast.toast(`${body}`, {
                title: `${title}`,
                toaster: 'b-toaster-top-right',
                solid: true,
                appendToast: false,
                variant: 'success'
            })
        },
        warningToast(title, body) {
            this.$bvToast.toast(`${body}`, {
                title: `${title}`,
                toaster: 'b-toaster-top-right',
                solid: true,
                appendToast: false,
                variant: 'warning'
            })
        }
    },

    mounted () {
        this.message ? this.infoToast('Informação!', this.message) : null
    },

    props: ['message'],
}