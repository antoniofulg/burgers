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
                <h1>Categorias de lanches</h1>
                <hr>

                <div class="row">     
                    <form @submit.prevent class="input-group col-md-8 mb-3 mb-md-0">
                        <input v-model="filter" type="text" class="form-control shadow-sm" placeholder="Buscar ingredientes">
                        <div class="input-group-append">
                            <button :disabled="!filter" @click="filter = ''" class="btn shadow-sm btn-outline-secondary" type="submit"><i class="fas fa-broom"></i> Limpar</button>
                        </div>
                    </form>
                    <div class="col-md-4">
                        <button @click="form = true" class="btn shadow-sm btn-primary btn-block rounded-pill"><i class="mr-1 fas fa-plus-circle"></i> Nova categoria</button>
                    </div> 
                </div>

                <hr>
            </items-list>

            <item-form
                v-if="form"
                :item="selectedItem"
                :invalid="$v.$invalid"
                title="categoria"
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
    </admin-template>
</template>

<script>
import AdminTemplate from "../../layouts/AdminTemplate"
import ItemsList from "../../components/cruds/ItemsList"
import ItemForm from "../../components/cruds/ItemForm"
import Crud from "../../mixins/crud"
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
}
</script>