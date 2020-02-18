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
    }
}