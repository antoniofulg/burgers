<template>
    <admin-template>
        <div class="container mt-5">

            <items-list v-show="operation == 'index'"
                :itemsList="itemsList"
                :filter="filter"
                :table="table"
                @deleteItem="deleteItem"
                @editItem="editItem"
                @selectItem="selectItem"
                @updateStatus="updateStatus"
            >
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
                        <button @click="operation = 'create'" class="btn shadow-sm btn-primary btn-block rounded-pill"><i class="mr-1 fas fa-plus-circle"></i> Novo ingrediente</button>
                    </div> 
                </div>

                <hr>

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

                <modal id="delete" title="Confirme sua ação!">
                    <template v-slot:body>
                        <strong>Você realmente deseja apagar este ingrediente?</strong>
                        <span class="d-block"><strong>Nome: </strong> {{selectedItem.name}}</span> 
                        <span class="d-block"><strong>Categoria: </strong> {{categoryName(selectedItem.category)}}</span> 
                        <span class="d-block"><strong>Estado: </strong> {{statusName(selectedItem.status)}}</span>
                        <span class="d-block"><strong>Preço: </strong> {{priceName(selectedItem.price)}}</span>
                    </template>
                    <template v-slot:action>
                        <button @click="deleteItem(selectedItem)" type="button" class="btn btn-danger" data-dismiss="modal"><i class="mr-1 fas fa-trash"></i> Confirmar exclusão</button>
                    </template>
                </modal>
            </items-list>

            <item-form
                v-if="operation != 'index'"
                :item="selectedItem"
                :invalid="$v.$invalid"
                @resetItem="resetItem"
            >
                <div class="form-row">
                    <div class="form-group col-sm-12 col-md-8">
                        <label for="name">Nome</label>
                        <input
                            :class="{'is-invalid': $v.selectedItem.name.$error}"
                            v-model="$v.selectedItem.name.$model"
                        type="text" class="form-control shadow-sm" placeholder="Ex.: Blend de boi (100g)" id="name">
                        <div v-if="!$v.selectedItem.name.required" class="invalid-feedback">
                            Por favor, insira um nome para o ingrediente.
                        </div>
                    </div>
                    <div class="form-group col-sm-12 col-md-4">
                        <label for="category">Categoria</label>
                        <select
                            :class="{'is-invalid': $v.selectedItem.category.$error}"
                            v-model="$v.selectedItem.category.$model"
                        class="custom-select shadow-sm" id="category">
                            <option disabled value="" selected>Selecione uma categoria</option>
                            <option value="side_dishes">Acompanhamento</option>
                            <option value="beef">Carne</option>
                            <option value="sauce">Molho</option>
                            <option value="bread">Pão</option>
                            <option value="cheese">Queijo</option>
                            <option value="salad">Salada</option>
                        </select>
                        <div v-if="!$v.selectedItem.name.required" class="invalid-feedback">
                            Por favor, selecione uma categoria para o ingrediente.
                        </div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="input-group col-md-4">
                        <label for="inputPrice">Preço unitário</label>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text">R$</span>
                            </div>
                            <input
                                :class="{'is-invalid': $v.selectedItem.price.$error}"
                                v-model="$v.selectedItem.price.$model"
                            type="number" class="form-control shadow-sm" id="inputPrice">
                            <div v-if="!$v.selectedItem.price.required" class="invalid-feedback">
                                Por favor, insira um preço para o ingrediente.
                            </div>
                            <div v-if="!$v.selectedItem.price.decimal" class="invalid-feedback">
                                Por favor, insira um preço válido para o ingrediente.
                            </div>
                            <div v-if="!$v.selectedItem.price.minValue || $v.selectedItem.price.maxValue" class="invalid-feedback">
                                Por favor, insira um preço entre R$ 0,00 e R$ 1000,00 para o ingrediente.
                            </div>
                        </div>
                    </div>

                    <div class="form-group col-md-4">
                        <label for="inputState">Estado</label>
                        <select
                            v-model="$v.selectedItem.status.$model"
                            :class="{'is-invalid': $v.selectedItem.status.$error}"
                        id="inputState" class="form-control shadow-sm">
                            <option disabled value="" selected>Selecione um estado</option>
                            <option value="avaliable">Disponível</option>
                            <option value="unavaliable">Indisponível</option>
                            <option value="desactivated">Desativado</option>
                        </select>
                        <div v-if="!$v.selectedItem.status.required" class="invalid-feedback">
                            Por favor, insira um estado para o ingrediente.
                        </div>
                    </div>
                </div>
            </item-form>

        </div>
    </admin-template>
</template>

<script>
import AdminTemplate from "../../layouts/AdminTemplate"
import ItemsList from "../../components/cruds/ItemsList"
import ItemForm from "../../components/cruds/ItemForm"
import Modal from "../../components/Modal"
import Toast from "../../mixins/toasts"
import { required, decimal, maxValue, minValue } from "vuelidate/lib/validators"

export default {
    components: {
        AdminTemplate,
        ItemForm,
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
            return this.selectedItem
        }
    },

    data () {
        return {
            editRequest: {
                name: 'admin.ingredients.update'
            },
            
            filter: null,

            getRequest: {
                setItems: 'setIngredients',
                errorMessage: 'Não foi possível obter os ingredientes!'
            },

            operation: 'index',

            selectedItem: {
                id: null,
                name: '',
                category: '',
                price: 0,
                status: ''
            },

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
                    this.resetItem()
                } else {
                    this.warningToast('Ação não concluída!', response.data.message)
                }
            } catch (error) {
                console.log(error.response)
                this.dangerToast('Ação não concluída!', 'Não foi possível resposta do servidor!')
            }
        },

        editItem(item) {
            this.selectedItem = item
            console.log(this.selectedItem)
            this.operation = 'update'
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

        resetItem() {
            this.operation = 'index'
            this.selectedItem = {
                id: null,
                name: '',
                category: '',
                price: 0,
                status: ''
            }
            this.$v.$reset()
        },

        selectItem(item, operation = 'index') {
            if (operation === 'update') {
                this.operation = 'update'
            }
            this.selectedItem = item
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

    validations: {
        selectedItem: {
            name: {
                required
            },
            category: {
                required
            },
            price: {
                required,
                decimal,
                maxValue: maxValue(1000),
                minValue: minValue(0),
            },
            status: {
                required
            },
        }
    },
}
</script>

<style scoped>
    .pointer {
        cursor: pointer;
    }
</style>