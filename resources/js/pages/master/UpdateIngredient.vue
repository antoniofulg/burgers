<template>
    <admin-template>
        <div class="container mt-5">
            <h1>Editar ingrediente <span><i class="fas fa-question-circle text-info pointer"></i></span></h1>
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
                        <label for="type">Tipo</label>
                        <select
                            @input="$v.type.$touch()"
                            :class="{ 'is-invalid': $v.type.$dirty && $v.type.$invalid}"
                            v-model="type"
                        class="custom-select shadow-sm" id="type">
                        <div ref="invalid_type" class="invalid-feedback">
                            Por favor, selecione o tipo do ingrediente.
                        </div>
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
                        <button @click="updateIngredient" :disabled="$v.$invalid" class="btn shadow-sm btn-success mt-auto rounded-pill shadow-sm"><i class="fas fa-marker"></i> Atualizar</button>
                    </div>
                    <div class="form-group col-md-2 d-flex flex-column">
                        <router-link tag="button" :to="{name: 'master.ingredients'}" class="btn shadow-sm btn-danger mt-auto rounded-pill shadow-sm"><i class="fas fa-undo-alt"></i> Voltar</router-link>
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
            type: 'side_dishes',
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
                    this.type = response.data.ingredient.type
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
                    type: this.type,
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
                            name: 'master.ingredients',
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
            this.type = this.ingredient.type;
            this.price = this.ingredient.price;
            this.status = this.ingredient.status;
        }
    },

    props: ['id', 'ingredient'],

    validations: {
        name: {
            required
        },
        type: {
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