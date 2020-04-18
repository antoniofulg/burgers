export default {
    computed: {
        endpoint() {},

        headers() {
            return {
                "headers": {
                    "authorization": `Bearer ${this.$store.getters.getToken}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json",
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
        async insertItem() {
            try {
                const response = await axios.post(`${this.endpoint}`, this.payload(), this.headers)
                console.log(response)
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
            } catch (error) {
                console.log(error.response)
                this.dangerToast('Ação não concluída!', 'Não foi possível resposta do servidor!')
            }
        },

        payload() {}
    }
}