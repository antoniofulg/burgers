export default {
    computed: {
        endpoint() {},

        headers() {
            return {
                "headers": {
                    "authorization": `Bearer ${this.$store.getters.getToken}`,
                    "Accept": "application/json"
                }
            }
        }
    },

    data() {
        return {
            storeRequest: {}
        }
    },

    methods: {
        insertItem() {
            if (!this.$v.$invalid) {
                axios.post(`${this.endpoint}`,
                    this.payload(),
                    this.headers
                ).then(response => {
                    if (response.data.concluded) {
                        this.$router.push({
                            name: this.storeRequest.name,
                            params: {
                                toast: {
                                    type: 'success',
                                    title: 'Ação concluída!',
                                    message: response.data.message
                                }
                            }
                        })
                    } else {
                        this.warningToast('Ação não concluída!', response.data.message)
                    }
                }).catch(e => {
                    console.log(e)
                    this.dangerToast('Ação não concluída!', 'Não foi possível resposta do servidor!')
                })
            } else {
                this.$v.$touch()
            }
        },

        payload() {}
    }
}