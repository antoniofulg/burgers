export default {
    computed: {
        endpoint () {
            return `/api/ingredients/${this.id}`
        },

        headers () {
            return {
                "headers": {
                    "authorization": `Bearer ${this.$store.getters.getToken}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                }
            }
        },
    },

    created() {
        this.item ? null : this.getItem()
    },

    data() {
        return {
            updateRequest: {}
        }
    },

    methods: {
        mountedPayload(item) {},

        payload() {},

        async getItem() {
            try {
                const response = await axios.get(`${this.endpoint}`, this.headers)
                if (response.data.concluded) {
                    this.mountedPayload(response.data.item)
                } else {
                    this.warningToast('Ação não concluída!', response.data.message)
                }
            } catch (error) {   
                console.log(e)
                this.dangerToast('Ação não concluída!', 'Não foi possível resposta do servidor!')
            }
        },

        async updateItem() {
            try {
                const response = await axios.put(`${this.endpoint}`, this.payload(), this.headers)
                if (response.data.concluded) {
                    this.$router.push({
                        name: this.updateRequest.name,
                        params: {
                            toast: {
                                type: 'success',
                                title: 'Ação concluída!',
                                message: response.data.message
                            }
                        }
                    })
                } else {
                    console.log(response.data)
                    this.warningToast('Ação não concluída!', response.data.message)
                }
            } catch (error) {   
                console.log(error.response)
                this.dangerToast('Ação não concluída!', 'Não foi possível resposta do servidor!')
            }
        },
    },

    mounted() {
        if (this.item) {
            this.mountedPayload(this.item)
        }
    },

    props: ['id', 'item']
}