export default {
    data () {
        return {
            getRequest: {
                setItems: 'setIngredients',
                errorMessage: 'Não foi possível obter os ingredientes'
            },

            editRequest: {
                name: 'admin.ingredients.update'
            }
        }
    },

    computed: {
        endpoint () {},

        headers () {
            return {
                "headers": {
                    "authorization": `Bearer ${this.$store.getters.getToken}`,
                    "Accept": "application/json"
                }
            }
        }
    },

    methods: {
        deleteItem(item) {
            axios.delete(`${this.endpoint}/${item.id}`, this.headers)
            .then(response => {
                if (response.data.concluded) {
                    this.successToast('Ação concluída!', response.data.message)
                    this.getItems()
                    this.deleteTarget = {}
                } else {
                    this.warningToast('Ação não concluída!', response.data.message)
                }
            }).catch(e => {
                console.log(e)
            })
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

        getItems() {
            axios.get(`${this.endpoint}`, this.headers)
            .then(response => {
                if (response.data.concluded) {
                    this.$store.commit(this.getRequest.setItems, response.data.items)
                } else {
                    this.warningToast('Ação não concluída!', this.getRequest.errorMessage)
                }
            }).catch(e => {
                console.log(e)
                this.dangerToast('Ação não concluída!', 'Não foi possível resposta do servidor!')
            })
        },

        payload (item, status) {
            return {
                name: item.name,
                category: item.category,
                price: item.price,
                status: status,
            }
        },

        priceName(price) {
            return price > 0 ? `R$ ${price.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}` : 'Grátis'
        },

        statusName(status) {
            return status === 'avaliable' ? 'Disponível' : status === 'unavaliable' ? 'Indisponível' : "Desativado"
        },

        updateStatus(item, status) {
            axios.put(`${this.endpoint}/${item.id}`,
                this.payload(item, status),
                this.headers)
            .then(response => {
                if (response.data.concluded) {
                    this.successToast('Ação concluída!', response.data.message)
                    this.getItems()
                } else {
                    this.warningToast('Ação não concluída!', response.data.message)
                }
            }).catch(e => {
                console.log(e)
            })
        }
    }
}