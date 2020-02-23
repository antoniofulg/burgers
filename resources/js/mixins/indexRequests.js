export default {
    computed: {
        endpoint () {},

        headers () {
            return {
                "headers": {
                    "Accept": "application/json",
                    "authorization": `Bearer ${this.$store.getters.getToken}`,
                    "Content-Type": "application/json",
                }
            }
        },

        itemsList () {}
    },

    created () {
        this.getItems()
    },

    data () {
        return {
            getRequest: {},

            editRequest: {},

            deleteTarget: {},
        }
    },

    methods: {
        async deleteItem(item) {
            try {
                axios.delete(`${this.endpoint}/${item.id}`, this.headers)
                if (response.data.concluded) {
                    this.successToast('Ação concluída!', response.data.message)
                    this.getItems()
                    this.deleteTarget = {}
                } else {
                    this.warningToast('Ação não concluída!', response.data.message)
                }
            } catch (error) {
                console.log(e.error)
                this.dangerToast('Ação não concluída!', 'Não foi possível resposta do servidor!')
            }
        },

        editItem(item) {
            this.$router.push({
                name: this.editRequest.name,
                params: {
                    id: item.id,
                    item
                }
            })
        },

        async getItems() {
            try {
                const response = await axios.get(`${this.endpoint}`, this.headers)
                console.log(response)
                if (response.data.concluded) {
                    this.$store.commit(this.getRequest.setItems, response.data.items)
                } else {
                    this.warningToast('Ação não concluída!', this.getRequest.errorMessage)
                }
            } catch (error) {
                console.log(error.response)
                this.dangerToast('Ação não concluída!', 'Não foi possível resposta do servidor!')
            }
        },

        payload() {},

        priceName(price) {
            return price > 0 ? `R$ ${price.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}` : 'Grátis'
        },

        statusName(status) {
            return status === 'avaliable' ? 'Disponível' : status === 'unavaliable' ? 'Indisponível' : "Desativado"
        },

        async updateStatus(item, status) {
            try {
                const response = await axios.put(`${this.endpoint}/${item.id}`, this.payload(item, status), this.headers)
                if (response.data.concluded) {
                    this.successToast('Ação concluída!', response.data.message)
                    this.getItems()
                } else {
                    this.warningToast('Ação não concluída!', response.data.message)
                }
            } catch (error) {
                console.log(error.response)
                this.dangerToast('Ação não concluída!', 'Não foi possível resposta do servidor!')
            }
        }
    }
}