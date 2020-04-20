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
                            <h3 class="mb-0">Bebidas</h3>
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
                                        <input v-model="filter" type="text" class="form-control" placeholder="Buscar bebida">
                                        <div class="input-group-append">
                                            <button :disabled="!filter" @click="filter = ''" class="btn btn-outline-info" type="submit"><i class="fas fa-broom"></i> Limpar</button>
                                        </div>
                                    </form>
                                    <div class="col-md-4">
                                        <button @click="form = true" class="btn btn-primary btn-block"><i class="mr-1 fas fa-plus-circle"></i> Nova bebida</button>
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
                                    <div class="form-group col-sm-12 col-md-8">
                                        <label for="name">Nome</label>
                                        <input
                                            :class="{'is-invalid': $v.selectedItem.name.$error}"
                                            v-model="$v.selectedItem.name.$model"
                                        type="text" class="form-control shadow-sm" placeholder="Ex.: Suco de ..." id="name">
                                        <div v-if="!$v.selectedItem.name.required" class="invalid-feedback">
                                            Por favor, insira um nome para a bebida.
                                        </div>
                                    </div>
                                    <div class="form-group col-sm-12 col-md-4">
                                        <label for="inputVolume">Volume</label>
                                        <div class="input-group mb-3">
                                            <money
                                                :class="{ 'is-invalid': $v.selectedItem.volume.$error}"
                                                v-model="$v.selectedItem.volume.$model"
                                                v-bind="volume"
                                                class="form-control shadow-sm" id="inputVolume"
                                            />
                                            <div v-if="!$v.selectedItem.volume.required" class="invalid-feedback">
                                                Por favor, insira um volume para a bebida.
                                            </div>
                                            <div v-if="!$v.selectedItem.volume.decimal" class="invalid-feedback">
                                                Por favor, insira um volume válido para a bebida.
                                            </div>
                                            <div v-if="!$v.selectedItem.volume.minValue || !$v.selectedItem.volume.maxValue" class="invalid-feedback">
                                                Por favor, insira um volume entre 1 ml e 20.000 ml para a bebida.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-sm-12 col-md-4">
                                        <label for="category">Categoria</label>
                                        <select
                                            :class="{'is-invalid': $v.selectedItem.category.$error}"
                                            v-model="$v.selectedItem.category.$model"
                                        class="custom-select shadow-sm" id="category">
                                            <option disabled value="" selected>Selecione uma categoria</option>
                                            <option value="water">Águas</option>
                                            <option value="beer">Cervejas</option>
                                            <option value="soda">Refrigerantes</option>
                                            <option value="juice">Sucos</option>
                                        </select>
                                        <div v-if="!$v.selectedItem.category.required" class="invalid-feedback">
                                            Por favor, selecione uma categoria para a bebida.
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
                                                Por favor, insira um preço para a bebida.
                                            </div>
                                            <div v-if="!$v.selectedItem.price.decimal" class="invalid-feedback">
                                                Por favor, insira um preço válido para a bebida.
                                            </div>
                                            <div v-if="!$v.selectedItem.price.minValue || !$v.selectedItem.price.maxValue" class="invalid-feedback">
                                                Por favor, insira um preço entre R$ 0,00 e R$ 1000,00 para a bebida.
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
                                            Por favor, insira um estado para a bebida.
                                        </div>
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
    import Masked from "../../mixins/masked"
    import Toast from "../../mixins/toasts"
    import { Money } from 'v-money'
    import { required, decimal, maxValue, minValue } from "vuelidate/lib/validators"

    export default {
        components: {
            ItemForm,
            ItemsList,
            Money,
        },

        computed: {
            endpoint () {
                return `/api/drinks`
            },
        },

        data () {
            return {      
                request: {
                    item: 'Drinks',
                    errorMessage: 'Não foi possível obter as bebidas!'
                },

                selectedItem: {
                    id: null,
                    name: '',
                    category: '',
                    price: 0,
                    status: '',
                    volume: 1
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
                                return this.priceTemplate(value)
                            },
                            sortable: true
                        },
                        {
                            key: 'volume',
                            label: 'Volume',
                            formatter: (value) => {
                                return this.volumeName(value)
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
                if (category ===  'beer') {
                    return 'Cervejas'
                } else if (category === 'juice') {
                    return 'Sucos'
                } else if (category === 'soda') {
                    return 'Refrigerantes'
                } else if (category === 'water') {
                    return 'Águas'
                }
            },

            payload (item = null) {
                if (item) {
                    return {
                        name: item.name,
                        category: item.category,
                        price: item.price,
                        volume: item.volume,
                        status: item.status,
                    }
                } else {
                    return {
                        name: '',
                        category: '',
                        price: 0,
                        volume: 1,
                        status: '',
                    }
                }
            },

            volumeName(volume) {
                return volume >= 1000 ? `${(volume / 1000).toLocaleString('pt-BR', {
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 3
                })} L` : `${volume} ml`
            },
        },

        mixins: [Crud, Masked, Toast],

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
                volume: {
                    required,
                    decimal,
                    maxValue: maxValue(20000),
                    minValue: minValue(1),
                },
            }
        },
    };
</script>
<style></style>
