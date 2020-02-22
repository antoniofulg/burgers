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

            <div class="table-responsive">
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
                    <template v-slot:cell(status)="status">
                         <button
                            :class="{
                                'btn-success': status.value === 'avaliable',
                                'btn-warning': status.value === 'unavaliable',
                                'btn-danger': status.value === 'desactivated'
                            }" class="btn btn-sm rounded-pill btn-block shadow-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {{statusName(status.value)}}
                        </button>
                        <div class="dropdown-menu">
                            <button @click="updateStatus(status.item, 'avaliable')" v-if="status.value != 'avaliable'" class="dropdown-item"><i class="mr-1 fas fa-check-circle"></i> Disponível</button>
                            <button @click="updateStatus(status.item, 'unavaliable')" v-if="status.value != 'unavaliable'" class="dropdown-item"><i class="mr-1 fas fa-hourglass-half"></i> Indisponível</button>
                            <button @click="updateStatus(status.item, 'desactivated')" v-if="status.value != 'desactivated'" class="dropdown-item"><i class="mr-1 fas fa-ban"></i> Desativado</button>
                        </div>
                    </template>
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
                    <strong>Você realmente deseja apagar este ingrediente?</strong>
                    <span class="d-block"><strong>Nome: </strong> {{deleteTarget.name}}</span> 
                    <span class="d-block"><strong>Categoria: </strong> {{categoryName(deleteTarget.category)}}</span> 
                    <span class="d-block"><strong>Estado: </strong> {{statusName(deleteTarget.status)}}</span>
                    <span class="d-block"><strong>Preço: </strong> {{priceName(deleteTarget.price)}}</span>
                </template>
                <template v-slot:action>
                    <button @click="deleteItem(deleteTarget)" type="button" class="btn btn-danger" data-dismiss="modal"><i class="mr-1 fas fa-trash"></i> Confirmar exclusão</button>
                </template>
            </modal>
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
import Modal from '../../components/Modal'
import Toast from "../../mixins/toasts"
import Requests from "../../mixins/indexRequests"

export default {
    components: {
        AdminTemplate,
        Modal
    },

    computed: {
        endpoint () {
            return `/api/ingredients`
        },

        itemsList() {
            return this.$store.getters.getIngredients
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

        payload (item, status) {
            return {
                name: item.name,
                category: item.category,
                price: item.price,
                status: status,
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