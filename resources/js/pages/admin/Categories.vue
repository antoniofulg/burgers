<template>
    <admin-template>
        <div class="container mt-5">

            <h1>Categorias <span data-toggle="modal" data-target="#help"><i class="fas fa-question-circle text-info pointer"></i></span></h1>
            <hr>

            <div class="row">     
                <form @submit.prevent class="input-group col-md-8 mb-3 mb-md-0">
                    <input v-model="filter" type="text" class="form-control shadow-sm" placeholder="Buscar categorias">
                    <div class="input-group-append">
                        <button :disabled="!filter" @click="filter = ''" class="btn shadow-sm btn-outline-secondary" type="submit"><i class="fas fa-broom"></i> Limpar</button>
                    </div>
                </form>
                <div class="col-md-4">
                    <router-link tag="button" :to="{name: 'admin.categories.add'}" class="btn shadow-sm btn-primary btn-block rounded-pill"><i class="mr-1 fas fa-plus-circle"></i> Nova categoria</router-link>
                </div> 
            </div>

            <hr>

            <spinner v-if="$root.loading"></spinner>
            <div v-else class="table-responsive">
                <b-table
                    :filter="filter"
                    class="shadow-sm"
                    bordered
                    hover
                    small
                    striped
                    head-variant="dark"
                    :items="itemsList"
                :fields="table.fields">
                    <template v-slot:cell(actions)="row">
                        <div class="d-flex justify-content-center">
                            <button @click="editItem(row.item)" class="btn btn-primary btn-sm rounded-pill shadow-sm">
                                <span class="d-none d-sm-none d-md-none d-lg-block pr-4 pl-4"><i class="fas fa-pencil-alt"></i> Editar</span>                            
                                <span class="d-block d-sm-block d-md-block d-lg-none"><i class="fas fa-pencil-alt"></i></span>                            
                            </button>
                            <button @click="deleteTarget = row.item" data-toggle="modal" data-target="#delete" class="btn btn-danger btn-sm rounded-pill shadow-sm">
                                <span class="d-none d-sm-none d-md-none d-lg-block pr-4 pl-4"><i class="fas fa-trash"></i> Apagar</span>
                                <span class="d-block-sm-block d-md-block d-lg-none"><i class="fas fa-trash"></i></span>
                            </button>
                        </div>
                    </template>
                </b-table>
            </div>

            <modal id="delete" title="Confirme sua ação!">
                <template v-slot:body>
                    <strong>Você realmente deseja apagar esta categoria?</strong>
                    <span class="d-block"><strong>Nome: </strong> {{deleteTarget.name}}</span> 
                    <span class="d-block"><strong>Descrição: </strong> {{deleteTarget.description}}</span> 
                </template>
                <template v-slot:action>
                    <button @click="deleteItem(deleteTarget)" type="button" class="btn btn-danger" data-dismiss="modal"><i class="mr-1 fas fa-trash"></i> Confirmar exclusão</button>
                </template>
            </modal>
            <modal id="help" title="Categorias">
                <template v-slot:body>
                    <ul class="pl-3">
                        <li class="text-justify">
                            <h5><strong>Nome:</strong></h5> Campo sintetizado para a descrição do ingrediente cadastrado.
                        </li>
                        <hr>
                        <li class="text-justify">
                            <h5><strong>Descrição:</strong></h5> Campo para categorizar o tipo de ingrediente. Facilitando a busca pelo ingrediente desejado.
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
import Modal from '../../components/Modal'
import Toast from "../../mixins/toasts"
import Requests from "../../mixins/indexRequests"

export default {
    components: {
        AdminTemplate,
        Modal
    },

    computed: {
        endpoint() {
            return `/api/categories`
        },

        itemsList() {
            return this.$store.getters.getCategories
        }
    },

    data () {
        return {
            editRequest: {
                name: 'admin.categories.update'
            },
            
            filter: null,

            getRequest: {
                setItems: 'setCategories',
                errorMessage: 'Não foi possível obter as categorias!'
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
                            return value ? value : `<p class="text-muted">Sem descrição</p>`
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
                    {
                        key: 'actions',
                        label: 'Ações'
                    }
                ],
            },
        }
    },

    methods: {
        payload (item, status) {
            return {
                name: item.name,
                description: item.description,
            }
        },
    },

    mixins: [Toast, Requests],
}
</script>

<style scoped>
    .pointer {
        cursor: pointer;
    }
</style>