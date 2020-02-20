<template>
    <admin-template>
        <div class="container mt-5">
            <h1>Ingredientes <span><i class="fas fa-question-circle text-info pointer"></i></span></h1>
            <hr>
                <div class="row">
                    <div class="col-md-2">
                        <button @click="changeForm('insert')" :disabled="forms.insert" class="btn shadow-sm btn-primary btn-block rounded-pill"><i class="fas fa-plus-circle"></i> Novo</button>
                    </div>      
                    <div class="dropdown col-md-2">
                        <button :disabled="forms.insert" class="btn shadow-sm btn-success rounded-pill btn-block  dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
                            <button :disabled="forms.insert" class="btn shadow-sm btn-outline-secondary" type="submit"><i class="fas fa-search"></i></button>
                        </div>
                    </form>
                    <div class="dropdown col-md-2">
                        <button :disabled="forms.insert" class="btn shadow-sm btn-secondary rounded-pill btn-block dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fas fa-tools"></i> Opções
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a class="dropdown-item"><i class="fas fa-exchange-alt"></i> Alterar disponibilidade</a>
                            <a class="dropdown-item"><i class="fas fa-trash"></i> Apagar</a>
                        </div>
                    </div>
                </div>
            <hr>
            <table v-if="!forms.insert && !forms.update" class="shadow-sm table table-hover table-bordered">
                <thead class="thead-dark">
                    <tr class="d-flex">
                        <th class="text-center col-1"></th>
                        <th class="col-3">Nome</th>
                        <th class="col-2">Tipo</th>
                        <th class="col-2">Preço</th>
                        <th class="col-2">Status</th>
                        <th class="col-2">Cadastrado em</th>
                    </tr>
                </thead>
                <tbody v-for="ingredient in ingredientsList" :key="ingredient.id">
                    <tr class="d-flex">
                        <th class="col-1 text-center" scope="row">
                            <i v-if="true" class="far fa-square"></i>
                            <i v-else class="fas fa-check-square"></i>
                        </th>
                        <td class="col-3">{{ingredient.name}}</td>
                        <td class="col-2">{{ingredient.type}}</td>
                        <td class="col-2">{{ingredient.price}}</td>
                        <td class="col-2"><button
                            :class="{
                                'btn-success': ingredient.status === 'avaliable',
                                'btn-warning': ingredient.status === 'unavaliable',
                                'btn-danger': ingredient.status === 'desactivated'
                            }" class="btn btn-sm rounded-pill btn-block shadow-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {{statusName(ingredient.status)}}
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a v-if="ingredient.status != 'avaliable'" class="dropdown-item"><i class="fas fa-check-circle"></i> Disponível</a>
                            <a v-if="ingredient.status != 'unavaliable'" class="dropdown-item"><i class="fas fa-hourglass-half"></i> Indisponível</a>
                            <a v-if="ingredient.status != 'desactivated'" class="dropdown-item"><i class="fas fa-ban"></i> Desativado</a>
                        </div></td>
                        <td class="col-2">{{ingredient.creation_date}}</td>
                    </tr>
                </tbody>
            </table>

            <form @submit.prevent v-else-if="forms.insert">
                <div class="form-row">
                    <div class="form-group col-sm-12 col-md-8">
                        <label for="name">Nome</label>
                        <input v-model="new_ingredient.name" type="text" class="form-control" id="name">
                    </div>
                    <div class="form-group col-sm-12 col-md-4">
                        <label for="type">Tipo</label>
                        <select v-model="new_ingredient.type" class="custom-select" id="type">
                            <option value="side_dishes">Acompanhamentos</option>
                            <option value="blend">Carne</option>
                            <option value="bread">Pão</option>
                            <option value="chesse">Queijo</option>
                            <option value="salad">Salada</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="input-group col-md-4">
                        <label for="inputCity">Preço</label>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">R$</span>
                            </div>
                            <input v-model="new_ingredient.price" type="number" class="form-control" value="0,00" aria-describedby="basic-addon1">
                        </div>

                    </div>
                    <div class="form-group col-md-4">
                        <label for="inputState">Status</label>
                        <select v-model="new_ingredient.status" id="inputState" class="form-control">
                            <option value="avaliable" selected>Disponível</option>
                            <option value="unavaliable">Indisponível</option>
                            <option value="desactivated">Desativado</option>
                        </select>
                    </div>
                    <div class="form-group col-md-2 d-flex flex-column">
                        <button @click="changeForm" class="btn shadow-sm btn-block btn-danger mt-auto rounded-pill"><i class="fas fa-undo-alt"></i> Cancelar</button>
                    </div>
                    <div class="form-group col-md-2 d-flex flex-column">
                        <button @click="insertIngredient" class="btn shadow-sm btn-block btn-success mt-auto rounded-pill"><i class="fas fa-plus-circle"></i> Cadastrar</button>
                    </div>
                </div>
            </form>

            <form @submit.prevent v-else-if="forms.update">
                <div class="form-row">
                    <div class="form-group col-sm-12 col-md-8">
                        <label for="name">Nome</label>
                        <input v-model="new_ingredient.name" type="text" class="form-control" id="name">
                    </div>
                    <div class="form-group col-sm-12 col-md-4">
                        <label for="type">Tipo</label>
                        <select v-model="new_ingredient.type" class="custom-select" id="type">
                            <option selected>Escolha...</option>
                            <option value="side_dishes">Acompanhamentos</option>
                            <option value="blend">Carne</option>
                            <option value="bread">Pão</option>
                            <option value="chesse">Queijo</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="input-group col-md-4">
                        <label for="inputCity">Preço</label>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">R$</span>
                            </div>
                            <input v-model="new_ingredient.price" type="number" class="form-control" value="0,00" aria-describedby="basic-addon1">
                        </div>

                    </div>
                    <div class="form-group col-md-4">
                        <label for="inputState">Status</label>
                        <select v-model="new_ingredient.status" id="inputState" class="form-control">
                            <option value="avaliable" selected>Disponível</option>
                            <option value="unavaliable">Indisponível</option>
                            <option value="desactivated">Desativado</option>
                        </select>
                    </div>
                    <div class="form-group col-md-2 d-flex flex-column">
                        <button @click="changeForm()" class="btn shadow-sm btn-block btn-danger mt-auto rounded-pill"><i class="fas fa-undo-alt"></i> Cancelar</button>
                    </div>
                    <div class="form-group col-md-2 d-flex flex-column">
                        <button class="btn shadow-sm btn-block btn-success mt-auto rounded-pill"><i class="fas fa-plus-circle"></i> Cadastrar</button>
                    </div>
                </div>
            </form>
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
        console.log(this.$store.getters.getToken)
    },

    data () {
        return {
            checked: [],

            forms: {
                insert: false,
                update: false
            },

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

        changeForm(type = 'table') {
            if (type === 'insert') {
                this.forms.insert = true
                this.forms.update = false
            } else if (type === 'update') {
                this.forms.insert = false
                this.forms.update = true
            } else {
                this.forms.insert = false
                this.forms.update = false
            }
                this.resetForm()
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
                    this.$store.commit('setIngredients', response.data.ingredients.data)
                } else {
                    this.warningToast('Ação não concluída!', response.data.message)
                }
            }).catch(e => {
                console.log(e)
            })
        },

        insertIngredient() {
            axios.post(`${this.endpoint}`, {
                name: this.new_ingredient.name,
                type: this.new_ingredient.type,
                price: this.new_ingredient.price,
                status: this.new_ingredient.status,
            }, {
                "headers": {
                    "authorization": `Bearer ${this.$store.getters.getToken}`,
                    "Accept": "application/json"
                }
            }).then(response => {
                if (response.data.concluded) {
                    console.log(response.data)
                    this.$store.commit('addIngredient', response.data.ingredient)
                    this.successToast('Ação concluída!', response.data.message)
                    this.resetForm()
                    this.changeForm()
                } else {
                    this.warningToast('Ação não concluída!', response.data.message)
                }
            }).catch(e => {
                console.log(e)
            })
        },

        resetForm() {
            this.new_ingredient.name = ''
            this.new_ingredient.type = ''
            this.new_ingredient.price = ''
            this.new_ingredient.status = ''
        },
        
        statusName(status) {
            return status === 'avaliable' ? 'Disponível' : status === 'unavaliable' ? 'Indisponível' : "Desativado"
        }
    },

    mixins: [Toast],

    validations: {

    },

    watch: {
        new_ingredient: () => {
            console.log(new_ingredient)
        }
    }
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