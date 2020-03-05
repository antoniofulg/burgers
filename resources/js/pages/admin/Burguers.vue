<template>
    <admin-template>
        <div class="container mt-5">

            <h1>Ingredientes <span data-toggle="modal" data-target="#help"><i class="fas fa-question-circle text-info pointer"></i></span></h1>
            <hr>

            <div class="row">     
                <form @submit.prevent class="input-group col-md-8 mb-3 mb-md-0">
                    <input v-model="filter" type="text" class="form-control shadow-sm" placeholder="Buscar ingredientes">
                    <div class="input-group-append">
                        <button :disabled="!filter" @click="filter = ''" class="btn shadow-sm btn-outline-secondary" type="submit"><i class="fas fa-broom"></i> Limpar</button>
                    </div>
                </form>
                <div class="col-md-4">
                    <router-link tag="button" :to="{name: 'admin.ingredients.add'}" class="btn shadow-sm btn-primary btn-block rounded-pill"><i class="mr-1 fas fa-plus-circle"></i> Novo ingrediente</router-link>
                </div> 
            </div>

            <hr>

            <items-list
                :itemsList="itemsList"
                :filter="filter"
                :table="table"
                @deleteItem="deleteItem"
                @editItem="editItem"
            />

            <modal id="help" title="Ingredientes">
                <template v-slot:body>
                    <ul class="pl-3">
                        <li class="text-justify">
                            <h5><strong>Nome:</strong></h5> Campo sintetizado para a descrição do ingrediente cadastrado.
                        </li>
                        <hr>
                        <li class="text-justify">
                            <h5><strong>Categoria:</strong></h5> Campo para categorizar o tipo de ingrediente. Facilitando a busca pelo ingrediente desejado.
                        </li>
                        <hr>
                        <li class="text-justify">
                            <h5><strong>Preço unitário:</strong></h5> Campo referente ao preço do ingrediente caso o cliente deseje adicioná-lo ao hamburguer durante o seu pedido.
                        </li>
                        <hr>
                        <li class="text-justify">
                            <h5><strong>Estado:</strong></h5> Refere-se à disponibilidade do ingrediente.
                            <ul>
                                <li>
                                    <strong>Disponível</strong>: ele é mostrado no cardápio como disponível para que o cliente o adicione ao pedido.
                                </li>
                                <li>
                                    <strong>Indisponível</strong>: ele é mostrado no cardápio como indisponível. O cliente não poderá adicionar o ingrediente ao pedido.
                                </li>
                                <li>
                                    <strong>Desativado</strong>: O ingrediente não é mostrado ao cliente.
                                </li>
                            </ul>
                        </li>
                    </ul>
                </template>
            </modal>
        </div>
    </admin-template>
</template>

<script>
import { required } from "vuelidate/lib/validators"
import AdminTemplate from '../../layouts/AdminTemplate'
import ItemsList from '../../components/cruds/ItemsList'
import Modal from '../../components/Modal'
import Toast from "../../mixins/toasts"

export default {
    components: {
        AdminTemplate,
        ItemsList,
        Modal
    },

    computed: {
        endpoint () {
            return `/api/ingredients`
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
            return this.$store.getters.getIngredients
        },

        itemUpdate() {
            return this.item
        }
    },

    created() {
        console.log('criado burguers')
    },

    data () {
        return {
            deleteTarget: {},

            editRequest: {
                name: 'admin.ingredients.update'
            },
            
            filter: null,

            getRequest: {
                setItems: 'setIngredients',
                errorMessage: 'Não foi possível obter os ingredientes!'
            },

            item: null,

            table: {
                fields: [
                    {
                        key: 'name',
                        label: 'Nome',
                        sortable: true
                    },
                    {
                        key: 'category',
                        label: 'Categoria',
                        formatter: (value) => {
                            return this.categoryName(value)
                        },
                        sortable: true,
                        sortByFormatted: true
                    },
                    {
                        key: 'price',
                        label: 'Preço unitário',
                        formatter: (value) => {
                            return this.priceName(value)
                        },
                        sortable: true
                    },
                    {
                        key: 'status',
                        label: 'Estado',
                        sortable: true
                    },
                    {
                        key: 'actions',
                        label: 'Ações'
                    }
                ],
            },
        }
    },

    methods: {
        categoryName(category) {
            if (category ===  'bread') {
                return 'Pães'
            } else if (category === 'beef') {
                return 'Carnes'
            } else if (category === 'cheese') {
                return 'Queijos'
            } else if (category === 'salad') {
                return 'Saladas'
            } else if (category === 'sauce') {
                return 'Molhos'
            } else if (category === 'side_dishes') {
                return 'Acompanhamentos'
            }
        },

        async deleteItem(item) {
            try {
                let response = await axios.delete(`${this.endpoint}/${item.id}`, this.headers)
                if (response.data.concluded) {
                    this.successToast('Ação concluída!', response.data.message)
                    this.getItems()
                    this.deleteTarget = {}
                } else {
                    this.warningToast('Ação não concluída!', response.data.message)
                }
            } catch (error) {
                console.log(error.response)
                this.dangerToast('Ação não concluída!', 'Não foi possível resposta do servidor!')
            }
        },

        editItem(item) {
            this.item = item
        },

        async getItems() {
            try {
                // this.loading = true;
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
    },

    mixins: [Toast],


    mounted () {
        this.getItems()
    },
}
</script>

<style scoped>
    .pointer {
        cursor: pointer;
    }
</style>