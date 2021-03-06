import Loading from './loading'
import PriceTemplate from './priceTemplate'

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
            // Returning a local copy from items list
            return JSON.parse(JSON.stringify(this.$store.getters[`get${this.request.item}`]))
            // return this.$store.getters[`get${this.request.item}`]
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
                this.isLoading = true
                const response = await axios.delete(`${this.endpoint}/${item.id}`, this.headers)
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
            this.isLoading = false
        },

        async insertItem(item) {
            try {
                this.isLoading = true
                const response = await axios.post(`${this.endpoint}`, this.payload(item), this.headers)
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
            this.isLoading = false
        },

        async getItems() {
            try {
                this.isLoading = true
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
            this.isLoading = false
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
                this.isLoading = true
                const response = await axios.put(`${this.endpoint}/${item.id}`, this.payload(item), this.headers)
                if (response.data.concluded) {
                    this.successToast('Ação concluída!', response.data.message)
                    this.getItems()
                    this.resetItem()
                } else {
                    console.log(response.data)
                    this.warningToast('Ação não concluída!', response.data.message)
                }
            } catch (error) {
                console.log(error.response)
                this.dangerToast('Ação não concluída!', 'Não foi possível resposta do servidor!')
            }
            this.isLoading = false
        },

        async updateStatus(item, status) {
            for (let prop in item) {
                this.selectedItem[prop] = item[prop]
            }
            this.selectedItem.status = status
            this.updateItem(this.selectedItem)
        }
    },

    mixins: [Loading, PriceTemplate],

    mounted () {
        this.getItems()
    },
}