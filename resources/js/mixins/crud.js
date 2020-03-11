export default {
    computed: {
        endpoint () {

        },

        headers () {
            return {
                "headers": {
                    "Accept": "application/json",
                    "authorization": `Bearer ${this.$store.getters.getToken}`,
                    "Content-Type": "application/json",
                }
            }
        },

        itemsList() {
            return this.$store.getters[`get${this.request.item}`]
        },
    },

    data () {
        return {
            filter: null,

            firstLoad: true,

            form: false,

            request: {},

            selectedItem: {},

            table: {},
        }
    },

    methods: {
        async deleteItem(item) {
            try {
                let response = await axios.delete(`${this.endpoint}/${item.id}`, this.headers)
                if (response.data.concluded) {
                    this.successToast('Ação concluída!', response.data.message)
                    this.getItems()
                    this.resetItem()
                } else {
                    this.warningToast('Ação não concluída!', response.data.message)
                }
            } catch (error) {
                console.log(error.response)
                this.dangerToast('Ação não concluída!', 'Não foi possível resposta do servidor!')
            }
        },

        async insertItem(item) {
            try {
                const response = await axios.post(`${this.endpoint}`, this.payload(item), this.headers)
                if (response.data.concluded) {
                    this.successToast('Ação concluída!', response.data.message)
                    this.getItems()
                    this.form = false
                    this.selectedItem = this.payload()
                } else {
                    this.warningToast('Ação não concluída!', response.data.message)
                }
            } catch (error) {
                console.log(error.response)
                this.dangerToast('Ação não concluída!', 'Não foi possível resposta do servidor!')
            }
        },

        async getItems() {
            try {
                const response = await axios.get(`${this.endpoint}`, this.headers)
                console.log(response)
                if (response.data.concluded) {
                    this.$store.commit(`set${this.request.item}`, response.data.items)
                } else {
                    this.warningToast('Ação não concluída!', this.request.errorMessage)
                }
                this.firstLoad = false
            } catch (error) {
                console.log(error.response)
                this.dangerToast('Ação não concluída!', 'Não foi possível resposta do servidor!')
            }
        },

        priceTemplate(price) {
            return price > 0 ? `R$ ${price.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}` : 'Grátis'
        },

        resetItem() {
            this.form = false
            this.selectedItem = this.payload()
            this.$v.$reset()
        },

        selectItem(item, form = false) {
            if (form) {
                this.form = true
            }
            this.selectedItem = item
        },

        showItem(item) {
            for (let prop in item) {
                this.selectedItem[prop] = item[prop]
            }
            this.form = true
        },

        statusName(status) {
            return status === 'avaliable' ? 'Disponível' : status === 'unavaliable' ? 'Indisponível' : "Desativado"
        },

        async updateItem(item) {
            try {
                const response = await axios.put(`${this.endpoint}/${item.id}`, this.payload(item), this.headers)
                if (response.data.concluded) {
                    this.successToast('Ação concluída!', response.data.message)
                    this.getItems()
                    this.form = false
                    this.selectedItem = this.payload()
                } else {
                    console.log(response.data)
                    this.warningToast('Ação não concluída!', response.data.message)
                }
            } catch (error) {
                console.log(error.response)
                this.dangerToast('Ação não concluída!', 'Não foi possível resposta do servidor!')
            }
        },

        async updateStatus(item, status) {
            for (let prop in item) {
                this.selectedItem[prop] = item[prop]
            }
            this.selectedItem.status = status
            this.updateItem(this.selectedItem)
        }
    },

    mounted () {
        this.getItems()
    },
}