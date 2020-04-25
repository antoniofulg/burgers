<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row">
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Total traffic"
                                type="gradient-red"
                                sub-title="350,897"
                                icon="ni ni-active-40"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                            <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 3.48%</span>
                            <span class="text-nowrap">Since last month</span>
                        </template>
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Total traffic"
                                type="gradient-orange"
                                sub-title="2,356"
                                icon="ni ni-chart-pie-35"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                            <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 12.18%</span>
                            <span class="text-nowrap">Since last month</span>
                        </template>
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Sales"
                                type="gradient-green"
                                sub-title="924"
                                icon="ni ni-money-coins"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                            <span class="text-danger mr-2"><i class="fa fa-arrow-down"></i> 5.72%</span>
                            <span class="text-nowrap">Since last month</span>
                        </template>
                    </stats-card>

                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Performance"
                        type="gradient-info"
                        sub-title="49,65%"
                        icon="ni ni-chart-bar-32"
                        class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                            <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 54.8%</span>
                            <span class="text-nowrap">Since last month</span>
                        </template>
                    </stats-card>
                </div>
            </div>
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <div class="card shadow">
                        <div class="card-header bg-transparent">
                            <h3 class="mb-0">Hambúrguers</h3>
                        </div>
                        <div class="card-body">
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
                                <div class="row">     
                                    <form @submit.prevent class="input-group col-md-8 mb-3 mb-md-0">
                                        <input v-model="filter" type="text" class="form-control" placeholder="Buscar ingredientes">
                                        <div class="input-group-append">
                                            <button :disabled="!filter" @click="filter = ''" class="btn btn-outline-info" type="submit"><i class="fas fa-broom"></i> Limpar</button>
                                        </div>
                                    </form>
                                    <div class="col-md-4">
                                        <button @click="form = true" class="btn btn-primary btn-block"><i class="mr-1 fas fa-plus-circle"></i> Novo hambúrguer</button>
                                    </div> 
                                </div>
                            </items-list>

                            <item-form
                                v-if="form"
                                :item="selectedItem"
                                :invalid="$v.$invalid"
                                title="bebida"
                                @deleteItem="deleteItem(selectedItem)"
                                @insertItem="insertItem(selectedItem)"
                                @updateItem="updateItem(selectedItem)"
                                @resetItem="resetItem"
                            >
                                <div class="form-row">
                                    <div class="form-group col-sm-12 col-md-4">
                                        <label for="name">Nome</label>
                                        <input
                                            :class="{'is-invalid': $v.selectedItem.name.$error}"
                                            v-model="$v.selectedItem.name.$model"
                                        type="text" class="form-control shadow-sm" placeholder="X-Burguer" id="name">
                                        <div v-if="!$v.selectedItem.name.required" class="invalid-feedback">
                                            Por favor, insira um nome para o lanche.
                                        </div>
                                    </div>
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
                                <hr>
                                <div v-for="(item, index) in selectedItem.ingredients" :key="index" class="form-row">
                                    <div class="col-sm-12 col-md-4">
                                        <label for="ingredient">Tipo de ingrediente</label>
                                        <select v-model="item.category" class="custom-select shadow-sm" id="category">
                                            <option disabled value="" selected>Selecione uma categoria</option>
                                            <option value="side_dishes">Acompanhamentos</option>
                                            <option value="beef">Carnes</option>
                                            <option value="sauce">Molhos</option>
                                            <option value="bread">Pães</option>
                                            <option value="cheese">Queijos</option>
                                            <option value="salad">Saladas</option>
                                        </select>
                                    </div>
                                    <div class="col-sm-12 col-md-4">
                                        <label for="ingredient">Ingrediente</label>
                                        <select v-model="item.ingredient_id" class="custom-select shadow-sm" id="ingredient">
                                            <option disabled value="" selected>Selecione um ingrediente</option>
                                            <option value="null">Livre escolha</option>
                                            <option v-for="bread in getIngredientsByCategory('bread')" :key="bread.id" :value="bread.id">{{bread.name}}</option>
                                        </select>
                                    </div>
                                    <div class="col-sm-12 col-md-2">
                                        <label for="amount">Quantidade</label>
                                        <input v-model="item.amount" type="number" class="form-control shadow-sm" id="name">
                                        <div v-if="!$v.selectedItem.name.required" class="invalid-feedback">
                                            Por favor, insira uma quantidade para o ingrediente.
                                        </div>
                                    </div>
                                    <div class="col-sm-12 col-md-2 text-left text-bottom">
                                        <label>Opções</label>
                                        <button class="btn shadow-sm btn-danger btn btn-block"><i class="mr-1 fas fa-trash"></i> Remover ingrediente</button>
                                    </div>
                                </div>
                            </item-form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import ItemsList from "../../components/Cruds/ItemsList"
    import ItemForm from "../../components/Cruds/ItemForm"
    import Crud from "../../mixins/crud"
    import { money } from "../../mixins/masked"
    import Toast from "../../mixins/toasts"
    import { Money } from 'v-money'
    import { required, decimal, maxValue, minLength, minValue } from "vuelidate/lib/validators"

    export default {
        components: {
            ItemForm,
            ItemsList,
            Money,
        },


        computed: {
            endpoint () {
                return `/api/burguers`
            },

            ingredientList()  {
                return this.$store.getters.getIngredients
            },
        },
        

        data () {
            return {      
                request: {
                    item: 'Burguers',
                    errorMessage: 'Não foi possível obter os hambúrguers!'
                },

                selectedItem: {
                    id: null,
                    name: '',
                    ingredients: [
                        {
                            ingredient_id: 1,
                            category: 'bread',
                            amount: 1,
                        }
                    ],
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
                            key: 'ingredients',
                            label: 'Ingredientes',
                            formatter: (value) => {
                                let list = value.map((val) => {
                                    return (val.amount > 1 ? ` ${val.amount}x ` : ' ') + (val.name ? val.name : this.categoryName(val.category))
                                })
                                return list.toString()
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

            getIngredientsByCategory(category) {
                const list = this.$store.getters.getIngredients.filter((val) => {
                    if (val.category === category) {
                        return val 
                    }
                })
                console.log(list)
                return list
            },

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
                        ingredients: [],
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

            // console.log(this.$store.getters.getIngredients)
            console.log(this.$store.getters.getToken)
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
    };
</script>
