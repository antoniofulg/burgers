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
                <h1>Hambúrguers</h1>
                <hr>

                <div class="row">     
                    <form @submit.prevent class="input-group col-md-8 mb-3 mb-md-0">
                        <input v-model="filter" type="text" class="form-control shadow-sm" placeholder="Buscar ingredientes">
                        <div class="input-group-append">
                            <button :disabled="!filter" @click="filter = ''" class="btn shadow-sm btn-outline-secondary" type="submit"><i class="fas fa-broom"></i> Limpar</button>
                        </div>
                    </form>
                    <div class="col-md-4">
                        <button @click="form = true" class="btn shadow-sm btn-primary btn-block rounded-pill"><i class="mr-1 fas fa-plus-circle"></i> Novo hamburguer</button>
                    </div> 
                </div>

                <hr>
            </items-list>

            <item-form
                v-if="form"
                :item="selectedItem"
                :invalid="$v.$invalid"
                title="hamburguer"
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
                        type="text" class="form-control shadow-sm" placeholder="Ex.: Batata frita (200g) ..." id="name">
                        <div v-if="!$v.selectedItem.name.required" class="invalid-feedback">
                            Por favor, insira um nome para o lanche.
                        </div>
                    </div>
                    <div class="form-group col-sm-12 col-md-4">
                        <label for="category">Categoria</label>
                        <select
                            :class="{'is-invalid': $v.selectedItem.category.id.$error}"
                            v-model="$v.selectedItem.category.id.$model"
                        class="custom-select shadow-sm" id="category">
                            <option disabled value="" selected>Selecione uma categoria</option>
                            <option v-for="category in categoriesList" :key="category.id" :value="category.id">{{category.name}}</option>
                        </select>
                        <div v-if="!$v.selectedItem.category.id.required" class="invalid-feedback">
                            Por favor, selecione uma categoria para o lanche.
                        </div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-sm-12">
                        <label for="description">Descrição</label>
                        <input
                            v-model="$v.selectedItem.description.$model"
                        type="text" class="form-control shadow-sm" placeholder="Ex.: Batatas fritas com molho..." id="description">
                        <div v-if="!$v.selectedItem.description.required" class="invalid-feedback">
                            Por favor, informe uma descrição com pelo menos 5 letras para o lanche.
                        </div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="input-group col-sm-12 col-md-4">
                        <label for="inputPrice">Preço unitário</label>
                        <div class="input-group mb-3">
                            <money
                                :class="{'is-invalid': $v.selectedItem.price.$error}"
                                v-model="$v.selectedItem.price.$model"
                                v-bind="money"
                                class="form-control shadow-sm" id="inputPrice"
                            />
                            <div v-if="!$v.selectedItem.price.required" class="invalid-feedback">
                                Por favor, insira um preço para o lanche.
                            </div>
                            <div v-if="!$v.selectedItem.price.decimal" class="invalid-feedback">
                                Por favor, insira um preço válido para o lanche.
                            </div>
                            <div v-if="!$v.selectedItem.price.minValue || !$v.selectedItem.price.maxValue" class="invalid-feedback">
                                Por favor, insira um preço entre R$ 0,00 e R$ 1000,00 para o lanche.
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-sm-12 col-md-4">
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
                            Por favor, insira um estado para o lanche.
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
import Crud from "../../mixins/crud"
import { money } from "../../mixins/masked"
import Toast from "../../mixins/toasts"
import { Money } from 'v-money'
import { required, decimal, maxValue, minLength, minValue } from "vuelidate/lib/validators"

export default {
    components: {
        AdminTemplate,
        ItemForm,
        ItemsList,
        Money,
    },

    computed: {
        endpoint () {
            return `/api/burguers`
        },

        snacksList()  {
            return this.$store.getters.getIngredients
        }
    },

    data () {
        return {      
            request: {
                item: 'Burguers',
                errorMessage: 'Não foi possível obter os hamburguers!'
            },

            selectedItem: {
                id: null,
                name: '',
                description: '',
                ingredients: {},
                price: 0,
                status: '',
            },

            table: {
                fields: [
                    {
                        key: 'name',
                        label: 'Nome',
                        sortable: true
                    },
                    {
                        key: 'description',
                        label: 'Descrição',
                        formatter: (value) => {
                            return value ? value : 'Sem descrição'
                        },
                        sortable: true,
                        sortByFormatted: true
                    },
                    {
                        key: 'price',
                        label: 'Preço unitário',
                        formatter: (value) => {
                            return this.priceTemplate(value)
                        },
                        sortable: true
                    },
                    {
                        key: 'status',
                        label: 'Estado',
                        sortable: true
                    },
                ],
            },
        }
    },

    methods: {
        payload (item = null) {
            if (item) {
                return {
                    name: item.name,
                    ingredients: item.ingredients,
                    price: item.price,
                    status: item.status,
                }
            } else {
                return {
                    name: '',
                    ingredients: {},
                    price: 0,
                    status: '',
                }
            }
        },
    },

    mixins: [Crud, money, Toast],

    async mounted() {
        try {
            const response = await axios.get(`/api/ingredients`, this.headers)
            if (response.data.concluded) {
                this.$store.commit('setIngredients', response.data.items)
            } else {
                this.warningToast('Ação não concluída!', this.getRequest.errorMessage)
            }
        } catch (error) {
            console.log(error.response)
            this.dangerToast('Ação não concluída!', 'Não foi possível resposta do servidor!')
        }

        console.log(this.$store.getters.getIngredients)
    },

    validations: {
        selectedItem: {
            name: {
                required
            },
            description: {
                minLength: minLength(5),
            },
            category: {
                id: {
                    required
                }
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