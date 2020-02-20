<template>
    <admin-template>
        <div class="container mt-5">
            <h1>Ingredientes <span><i class="fas fa-question-circle text-info pointer"></i></span></h1>
            <hr>
            <div class="row">     
                <div class="dropdown col-md-3">
                    <button class="btn shadow-sm btn-success rounded-pill btn-block  dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fas fa-stream"></i> Ordenar lista
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item"><i class="fas fa-sort-alpha-up-alt"></i> Ordem alfabética</a>
                        <a class="dropdown-item"><i class="fas fa-chart-line"></i> Mais pedidos</a>
                        <a class="dropdown-item"><i class="fas fa-ellipsis-h"></i> Por tipos</a>
                        <a class="dropdown-item"><i class="fas fa-calendar-alt"></i> Adicionados recentemente</a>
                    </div>
                </div>
                <form @submit.prevent class="input-group col-md-6">
                    <input type="text" class="form-control shadow-sm" placeholder="Buscar ingredientes">
                    <div class="input-group-append">
                        <button class="btn shadow-sm btn-outline-secondary" type="submit"><i class="fas fa-search"></i></button>
                    </div>
                </form>
                <div class="col-md-3">
                    <router-link tag="button" :to="{name: 'master.ingredients.add'}" class="btn shadow-sm btn-primary btn-block rounded-pill"><i class="fas fa-plus-circle"></i> Novo ingrediente</router-link>
                </div> 
            </div>
            <hr>
            <table class="shadow-sm table table-sm table-hover table-bordered">
                <thead class="thead-dark">
                    <tr class="d-flex">
                        <!-- <th class="text-center col-1"></th> -->
                        <th class="col-4">Nome</th>
                        <th class="col-2">Tipo</th>
                        <th class="col-2">Preço unitário</th>
                        <th class="col-2">Estado</th>
                        <th class="col-2">Cadastrado em</th>
                    </tr>
                </thead>
                <tbody v-for="ingredient in ingredientsList" :key="ingredient.id">
                    <tr class="d-flex">
                        <!-- <th class="col-1 text-center" scope="row">
                            <i v-if="true" class="far fa-square"></i>
                            <i v-else class="fas fa-check-square"></i>
                        </th> -->
                        <td @click="editIngredient(ingredient)" class="col-4">{{ingredient.name}}</td>
                        <td @click="editIngredient(ingredient)" class="col-2">{{typeName(ingredient.type)}}</td>
                        <td @click="editIngredient(ingredient)" class="col-2">{{priceName(ingredient.price)}}</td>
                        <td class="col-2"><button
                            :class="{
                                'btn-success': ingredient.status === 'avaliable',
                                'btn-warning': ingredient.status === 'unavaliable',
                                'btn-danger': ingredient.status === 'desactivated'
                            }" class="btn btn-sm rounded-pill btn-block shadow-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {{statusName(ingredient.status)}}
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a @click="updateStatus(ingredient, 'avaliable')" v-if="ingredient.status != 'avaliable'" class="dropdown-item"><i class="fas fa-check-circle"></i> Disponível</a>
                            <a @click="updateStatus(ingredient, 'unavaliable')" v-if="ingredient.status != 'unavaliable'" class="dropdown-item"><i class="fas fa-hourglass-half"></i> Indisponível</a>
                            <a @click="updateStatus(ingredient, 'desactivated')" v-if="ingredient.status != 'desactivated'" class="dropdown-item"><i class="fas fa-ban"></i> Desativado</a>
                        </div></td>
                        <td @click="editIngredient(ingredient)" class="col-2">{{ingredient.creation_date}}</td>
                    </tr>
                </tbody>
            </table>
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
            new_ingredient: {
                name: '',
                type: '',
                price: '',
                status: ''
            }
        }
    },

    methods: {
        checkItem() {

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

        typeName(type) {
            if (type ===  'bread') {
                return 'Pão'
            } else if (type === 'blend') {
                return 'Carne'
            } else if (type === 'cheese') {
                return 'Queijo'
            } else if (type === 'salad') {
                return 'Salada'
            } else if (type === 'side_dishes') {
                return 'Acompanhamento'
            }
        },

        updateStatus(ingredient, status) {
            axios.put(`${this.endpoint}/${ingredient.id}`, {
                name: ingredient.name,
                type: ingredient.type,
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

    mixins: [Toast],

    props: ['toast']
}
</script>

<style scoped>
    .dropdown-toggle::after {
        content: none;
    }

    .dropdown-item, .pointer,
    tbody > tr {
        cursor: pointer;
    }
</style>