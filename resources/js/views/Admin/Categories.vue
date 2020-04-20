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
                            <h3 class="mb-0">Categorias de lanches</h3>
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
                                        <input v-model="filter" type="text" class="form-control" placeholder="Buscar categoria">
                                        <div class="input-group-append">
                                            <button :disabled="!filter" @click="filter = ''" class="btn btn-outline-info" type="submit"><i class="fas fa-broom"></i> Limpar</button>
                                        </div>
                                    </form>
                                    <div class="col-md-4">
                                        <button @click="form = true" class="btn btn-primary btn-block"><i class="mr-1 fas fa-plus-circle"></i> Nova categoria</button>
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
                                        type="text" class="form-control shadow-sm" placeholder="Ex.: Batatas fritas" id="name">
                                        <div v-if="!$v.selectedItem.name.required" class="invalid-feedback">
                                            Por favor, insira um nome para a categoria.
                                        </div>
                                    </div>
                                    <div class="form-group col-sm-12 col-md-8">
                                        <label for="description">Descrição</label>
                                        <input
                                            :class="{'is-invalid': $v.selectedItem.description.$error}"
                                            v-model="$v.selectedItem.description.$model"
                                        type="text" class="form-control shadow-sm" placeholder="Ex.: Batatas fritas com molho..." id="description">
                                        <div v-if="!$v.selectedItem.description.required" class="invalid-feedback">
                                            Por favor, insira uma descrição para a categoria.
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
    import { required, decimal, maxValue, minValue } from "vuelidate/lib/validators"

    export default {
        components: {
            ItemForm,
            ItemsList,
        },


        computed: {
            endpoint () {
                return `/api/categories`
            },
        },

        data () {
            return {      
                request: {
                    item: 'Categories',
                    errorMessage: 'Não foi possível obter as categorias!'
                },

                selectedItem: {
                    id: null,
                    name: '',
                    description: '',
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
                                return value ? value : `Sem descrição`
                            },
                            sortable: true,
                            sortByFormatted: true
                        },
                        {
                            key: 'snacks_count',
                            label: 'Lanches',
                            formatter: (value) => {
                                return value === 1 ? `${value} lanche vinculado` : value > 1 ? `${value} lanches vinculados` : `Nenhum lanche vinculado`
                            },
                            sortable: true,
                            sortByFormatted: true
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
                        description: item.description,
                    }
                } else {
                    return {
                        name: '',
                        description: '',
                    }
                }
            },
        },

        mixins: [Crud, Toast],

        validations: {
            selectedItem: {
                name: {
                    required
                },
                description: {
                    required
                }
            }
        },
    };
</script>
<style></style>
