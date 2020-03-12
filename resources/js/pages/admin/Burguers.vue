<template>
    <admin-template>
        <div class="container mt-5">

            <items-list v-show="!form"
                :itemsList="itemsList"
                :filter="filter"
                :firstLoad="firstLoad"
                :table="table"
                @deleteItem="deleteItem"
                @selectItem="selectItem"
                @updateStatus="updateStatus"
                @showItem="showItem"
            >
                <h1>Ingredientes</h1>
                <hr>

                <div class="row">     
                    <form @submit.prevent class="input-group col-md-8 mb-3 mb-md-0">
                        <input v-model="filter" type="text" class="form-control shadow-sm" placeholder="Buscar ingredientes">
                        <div class="input-group-append">
                            <button :disabled="!filter" @click="filter = ''" class="btn shadow-sm btn-outline-secondary" type="submit"><i class="fas fa-broom"></i> Limpar</button>
                        </div>
                    </form>
                    <div class="col-md-4">
                        <button @click="form = true" class="btn shadow-sm btn-primary btn-block rounded-pill"><i class="mr-1 fas fa-plus-circle"></i> Novo ingrediente</button>
                    </div> 
                </div>

                <hr>
            </items-list>

            <item-form
                v-if="form"
                :item="selectedItem"
                :invalid="$v.$invalid"
                title="ingrediente"
                @deleteItem="deleteItem(selectedItem)"
                @insertItem="insertItem(selectedItem)"
                @updateItem="updateItem(selectedItem)"
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
                            <option value="side_dishes">Acompanhamentos</option>
                            <option value="beef">Carnes</option>
                            <option value="sauce">Molhos</option>
                            <option value="bread">Pães</option>
                            <option value="cheese">Queijos</option>
                            <option value="salad">Saladas</option>
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
import Toast from "../../mixins/toasts"
import { required, decimal, maxValue, minValue } from "vuelidate/lib/validators"

export default {
    components: {
        AdminTemplate,
        ItemForm,
        ItemsList,
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
    },

    data () {
        return {            
            filter: null,

            firstLoad: true,

            form: false,

            getRequest: {
                setItems: 'setIngredients',
                errorMessage: 'Não foi possível obter os ingredientes!'
            },

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
                    this.$store.commit(this.getRequest.setItems, response.data.items)
                } else {
                    this.warningToast('Ação não concluída!', this.getRequest.errorMessage)
                }
                this.firstLoad = false
            } catch (error) {
                console.log(error.response)
                this.dangerToast('Ação não concluída!', 'Não foi possível resposta do servidor!')
            }
        },

        payload (item = null) {
            if (item) {
                return {
                    name: item.name,
                    category: item.category,
                    price: item.price,
                    status: item.status,
                }
            } else {
                return {
                    name: '',
                    category: '',
                    price: 0,
                    status: '',
                }
            }
        },

        priceName(price) {
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