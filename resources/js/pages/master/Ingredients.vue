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
                    <router-link tag="button" :to="{name: 'master.ingredients.add'}" class="btn shadow-sm btn-primary btn-block rounded-pill"><i class="mr-1 fas fa-plus-circle"></i> Novo ingrediente</router-link>
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
                    :items="ingredientsList"
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
                            <button @click="editIngredient(row.item)" class="btn btn-primary btn-sm rounded-pill shadow-sm">
                                <span class="d-none d-sm-none d-md-none d-lg-block pr-4 pl-4"><i class="mr-1 fas fa-pencil-alt"></i> Editar</span>                            
                                <span class="d-block d-sm-block d-md-block d-lg-none"><i class="mr-1 fas fa-pencil-alt"></i></span>                            
                            </button>
                            <button @click="deleteTarget = row.item" data-toggle="modal" data-target="#delete" class="btn btn-danger btn-sm rounded-pill shadow-sm">
                                <span class="d-none d-sm-none d-md-none d-lg-block pr-4 pl-4"><i class="mr-1 fas fa-trash"></i> Apagar</span>
                                <span class="d-block-sm-block d-md-block d-lg-none"><i class="mr-1 fas fa-trash"></i></span>
                            </button>
                        </div>
                    </template>
                </b-table>
            </div>
            <!-- Delete Modal -->
            <div class="modal fade" id="delete" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Confirme sua ação!</h5>
                        </div>
                        <div class="modal-body">
                            <strong>Você realmente deseja apagar este ingrediente?</strong>
                            <span class="d-block"><strong>Nome: </strong> {{deleteTarget.name}}</span> 
                            <span class="d-block"><strong>Categoria: </strong> {{categoryName(deleteTarget.category)}}</span> 
                            <span class="d-block"><strong>Estado: </strong> {{statusName(deleteTarget.status)}}</span>
                            <span class="d-block"><strong>Preço: </strong> {{priceName(deleteTarget.price)}}</span>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-dismiss="modal"><i class="mr-1 fas fa-undo-alt"></i> Voltar</button>
                            <button @click="deleteIngredient(deleteTarget)" type="button" class="btn btn-danger" data-dismiss="modal"><i class="mr-1 fas fa-trash"></i> Confirmar exclusão</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Info Modal -->
            <div class="modal fade" id="help" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Ingredientes</h5>
                        </div>
                        <div class="modal-body">
                            <p class="text-justify">
                                Nesta página temos o cadastro de ingredientes, onde podemos gerenciar os seguintes campos: <strong>Nome</strong>, <strong>Categoria</strong>, <strong>Estado</strong> e <strong>Preço unitário</strong>.
                            </p>
                            <ul>

                            <li class="text-justify">
                                <h5><strong>Nome:</strong></h5> Campo sintetizado para a descrição do ingrediente cadastrado.
                            </li>
                            <li class="text-justify">
                                <h5><strong>Categoria:</strong></h5> Campo para categorizar o tipo de ingrediente. Facilitando a busca pelo ingrediente desejado.
                            </li>
                            <li class="text-justify">
                                <h5><strong>Preço unitário:</strong></h5> Campo referente ao preço do ingrediente caso o cliente deseje adicioná-lo ao hamburguer durante o seu pedido.
                            </li>
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
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-dismiss="modal"><i class="mr-1 fas fa-undo-alt"></i> Voltar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </admin-template>
</template>

<script>
import { required } from "vuelidate/lib/validators"
import AdminTemplate from '../../layouts/AdminTemplate'
import Toast from "../../mixins/toasts"

export default {
    components: {
        AdminTemplate
    },

    computed: {
        endpoint () {
            return `/api/ingredients`
        },

        ingredientsList() {
            return this.$store.getters.getIngredients
        }
    },

    created() {
        this.getIngredients()
    },

    data () {
        return {
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
            deleteTarget: {},
            filter: null
        }
    },

    methods: {
        categoryName(category) {
            if (category ===  'bread') {
                return 'Pão'
            } else if (category === 'blend') {
                return 'Carne'
            } else if (category === 'cheese') {
                return 'Queijo'
            } else if (category === 'salad') {
                return 'Salada'
            } else if (category === 'side_dishes') {
                return 'Acompanhamento'
            }
        },

        deleteIngredient(ingredient) {
            axios.delete(`${this.endpoint}/${ingredient.id}`, {
                "headers": {
                    "authorization": `Bearer ${this.$store.getters.getToken}`,
                    "Accept": "application/json"
                }
            }).then(response => {
                if (response.data.concluded) {
                    this.successToast('Ação concluída!', response.data.message)
                    this.getIngredients()
                    this.deleteTarget = {}
                } else {
                    this.warningToast('Ação não concluída!', response.data.message)
                }
            }).catch(e => {
                console.log(e)
            })
        },

        editIngredient(ingredient) {
            this.$router.push({
                name: 'master.ingredients.update',
                params: {
                    id: ingredient.id,
                    ingredient
                }
            })
        },

        getIngredients() {
            axios.get(`${this.endpoint}`, {
                "headers": {
                    "authorization": `Bearer ${this.$store.getters.getToken}`,
                    "Accept": "application/json"
                }
            }).then(response => {
                if (response.data.concluded) {
                    console.log('request')
                    console.log(response.data)
                    this.$store.commit('setIngredients', response.data.ingredients)
                } else {
                    this.warningToast('Ação não concluída!', 'Não foi possível obter os ingredientes!')
                }
            }).catch(e => {
                console.log(e)
                this.dangerToast('Ação não concluída!', 'Não foi possível resposta do servidor!')
            })
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

        updateStatus(ingredient, status) {
            axios.put(`${this.endpoint}/${ingredient.id}`, {
                name: ingredient.name,
                category: ingredient.category,
                price: ingredient.price,
                status: status,
            }, {
                "headers": {
                    "authorization": `Bearer ${this.$store.getters.getToken}`,
                    "Accept": "application/json"
                }
            }).then(response => {
                if (response.data.concluded) {
                    this.successToast('Ação concluída!', response.data.message)
                    this.getIngredients()
                } else {
                    this.warningToast('Ação não concluída!', response.data.message)
                }
            }).catch(e => {
                console.log(e)
            })
        }
    },

    mixins: [Toast]
}
</script>

<style scoped>
    .pointer {
        cursor: pointer;
    }
</style>