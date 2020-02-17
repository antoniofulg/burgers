export default {
    methods: {
        toast(title, body, variant = 'danger', append = false) {
            this.$bvToast.toast(`${body}`, {
                title: `${title}`,
                toaster: 'b-toaster-top-center',
                solid: true,
                appendToast: append,
                variant: variant
            })
        }
    }
}