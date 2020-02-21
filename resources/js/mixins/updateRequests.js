export default {
    computed: {
        endpoint () {
            return `/api/ingredients/${this.id}`
        },

        headers () {
            return {
                "headers": {
                    "authorization": `Bearer ${this.$store.getters.getToken}`,
                    "Accept": "application/json"
                }
            }
        },
    },

    created() {
        this.item ? null : this.getItem()
    },

    data() {
        return {
            updateRequest: {
                name: 'admin.ingredients'
            }
        }
    },

    methods: {
        mountedPayload(item) {
            this.name = this.item.name;
            this.category = this.item.category;
            this.price = this.item.price;
            this.status = this.item.status;
        },

        payload() {
            return {
                name: this.name,
                category: this.category,
                price: this.price,
                status: this.status,
            }
        },

        getItem() {
            axios.get(`${this.endpoint}`,
                this.headers
            ).then(response => {
                if (response.data.concluded) {
                    this.mountedPayload(response.data.item)
                } else {
                    this.warningToast('Ação não concluída!', response.data.message)
                }
            }).catch(e => {
                console.log(e)
                this.dangerToast('Ação não concluída!', 'Não foi possível resposta do servidor!')
            })
        },

        updateItem() {
            if (!this.$v.$invalid) {
                axios.put(`${this.endpoint}`,
                    this.payload,
                    this.headers
                ).then(response => {
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
    },

    mounted() {
        if (this.item) {
            this.mountedPayload(item)
        }
    },

    props: ['id', 'item']
}