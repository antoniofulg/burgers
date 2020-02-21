<template>
    <admin-template>
        <div class="container mt-5">
            <h1>Editar ingrediente</h1>
            <hr>
            <form @submit.prevent>
                <div class="form-row">
                    <div class="form-group col-sm-12 col-md-8">
                        <label for="name">Nome</label>
                        <input
                            @input="$v.name.$touch()"
                            :class="{ 'is-invalid': $v.name.$dirty && $v.name.$invalid}"
                            v-model="name"
                        type="text" class="form-control shadow-sm" id="name">
                        <div ref="invalid_name" class="invalid-feedback">
                            Por favor, insira um nome para o ingrediente.
                        </div>
                    </div>
                    <div class="form-group col-sm-12 col-md-4">
                        <label for="category">Categoria</label>
                        <select
                            @input="$v.category.$touch()"
                            :class="{ 'is-invalid': $v.category.$dirty && $v.category.$invalid}"
                            v-model="category"
                        class="custom-select shadow-sm" id="category">
                        <div ref="invalid_category" class="invalid-feedback">
                            Por favor, selecione a categoria do ingrediente.
                        </div>
                            <option disabled value="" selected>Selecione uma categoria</option>
                            <option value="side_dishes">Acompanhamento</option>
                            <option value="blend">Carne</option>
                            <option value="bread">Pão</option>
                            <option value="chesse">Queijo</option>
                            <option value="salad">Salada</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="input-group col-md-4">
                        <label for="inputCity">Preço unitário</label>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">R$</span>
                            </div>
                            <input
                                @input="$v.price.$touch()"
                                :class="{ 'is-invalid': $v.price.$dirty && $v.price.$invalid}"
                                v-model="price"
                            type="number" class="form-control shadow-sm">
                            <div ref="invalid_type" class="invalid-feedback">
                                Por favor, insira um preço para o ingrediente.
                            </div>
                        </div>
                    </div>

                    <div class="form-group col-md-4">
                        <label for="inputState">Estado</label>
                        <select
                            v-model="status"
                            @input="$v.status.$touch()"
                            :class="{ 'is-invalid': $v.status.$dirty && $v.status.$invalid}"
                        id="inputState" class="form-control shadow-sm">
                            <option disabled value="" selected>Selecione um estado</option>
                            <option value="avaliable" selected>Disponível</option>
                            <option value="unavaliable">Indisponível</option>
                            <option value="desactivated">Desativado</option>
                        </select>
                        <div ref="invalid_status" class="invalid-feedback">
                            Por favor, insira um estado para o ingrediente.
                        </div>
                    </div>
                </div>
                <hr>
                <div class="d-flex flex-row-reverse">
                    <div class="form-group col-md-2 d-flex flex-column">
                        <button @click="updateIngredient" :disabled="$v.$invalid" class="btn shadow-sm btn-success mt-auto rounded-pill shadow-sm"><i class="mr-1 fas fa-marker"></i> Atualizar</button>
                    </div>
                    <div class="form-group col-md-2 d-flex flex-column">
                        <router-link tag="button" :to="{name: 'admin.ingredients'}" class="btn shadow-sm btn-danger mt-auto rounded-pill shadow-sm"><i class="mr-1 fas fa-undo-alt"></i> Voltar</router-link>
                    </div>
                </div>
            </form>
        </div>
    </admin-template>
</template>

<script>
import { required, decimal } from "vuelidate/lib/validators"
import AdminTemplate from '../../layouts/AdminTemplate'
import Toast from "../../mixins/toasts"

export default {
    components: {
        AdminTemplate
    },

    computed: {
        endpoint () {
            return `/api/ingredients/${this.id}`
        },
    },

    created() {
        this.ingredient ? null : this.getIngredient()
    },

    data () {
        return {
            name: '',
            category: 'side_dishes',
            price: 0,
            status: 'avaliable'
        }
    },

    methods: {
        getIngredient() {
            axios.get(`${this.endpoint}`, {
                "headers": {
                    "authorization": `Bearer ${this.$store.getters.getToken}`,
                    "Accept": "application/json"
                }
            }).then(response => {
                if (response.data.concluded) {
                    console.log(response)
                    this.name = response.data.ingredient.name
                    this.category = response.data.ingredient.category
                    this.price = response.data.ingredient.price
                    this.status = response.data.ingredient.status
                } else {
                    this.warningToast('Ação não concluída!', response.data.message)
                }
            }).catch(e => {
                console.log(e)
                this.dangerToast('Ação não concluída!', 'Não foi possível resposta do servidor!')
            })
        },

        updateIngredient() {
            if (!this.$v.$invalid) {
                axios.put(`${this.endpoint}`, {
                    name: this.name,
                    category: this.category,
                    price: this.price,
                    status: this.status,
                }, {
                    "headers": {
                        "authorization": `Bearer ${this.$store.getters.getToken}`,
                        "Accept": "application/json"
                    }
                }).then(response => {
                    if (response.data.concluded) {
                        console.log(response.data)
                        this.$router.push({
                            name: 'admin.ingredients',
                            params: {
                                toast: {
                                    type: 'success',
                                    title: 'Ação concluída!',
                                    message: response.data.message
                                }
                            }
                        })
                    } else {
                        this.warningToast('Ação não concluída!', response.data.message)
                    }
                }).catch(e => {
                    console.log(e)
                })
            } else {
                this.$v.$touch()
            }
        },
    },

    mixins: [Toast],

    mounted() {
        if (this.ingredient) {
            this.name = this.ingredient.name;
            this.category = this.ingredient.category;
            this.price = this.ingredient.price;
            this.status = this.ingredient.status;
        }
    },

    props: ['id', 'ingredient'],

    validations: {
        name: {
            required
        },
        category: {
            required
        },
        price: {
            required,
            decimal
        },
        status: {
            required
        },
    },
}
</script>