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
<<<<<<< HEAD
        this.message ? this.infoToast('Informação!', this.message) : null
    },

    props: ['message'],
=======
        if (this.toast) {
            if (this.toast.type === 'success') {
                this.successToast(this.toast.title, this.toast.message)
            } else if (this.toast.type === 'warning') {
                this.warningToast(this.toast.title, this.toast.message)
            } else if (this.toast.type === 'danger') {
                this.dangerToast(this.toast.title, this.toast.message)
            }
        }
    },
>>>>>>> develop
}