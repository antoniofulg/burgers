<template>
    <admin-template>
        <div class="container mt-5">
            <h1>Adicionar novo ingrediente</h1>
            <hr>
            <form @submit.prevent>
                <div class="form-row">
                    <div class="form-group col-sm-12 col-md-8">
                        <label for="name">Nome</label>
                        <input
                            :class="{'is-invalid': $v.name.$error}"
                            v-model="$v.name.$model"
                        type="text" class="form-control shadow-sm" placeholder="Ex.: Blend de boi (100g)" id="name">
                        <div v-if="!$v.name.required" class="invalid-feedback">
                            Por favor, insira um nome para o ingrediente.
                        </div>
                    </div>
                    <div class="form-group col-sm-12 col-md-4">
                        <label for="category">Categoria</label>
                        <select
                            :class="{'is-invalid': $v.category.$error}"
                            v-model="$v.category.$model"
                        class="custom-select shadow-sm" id="category">
                            <option disabled value="" selected>Selecione uma categoria</option>
                            <option value="side_dishes">Acompanhamento</option>
                            <option value="beef">Carne</option>
                            <option value="sauce">Molho</option>
                            <option value="bread">Pão</option>
                            <option value="cheese">Queijo</option>
                            <option value="salad">Salada</option>
                        </select>
                        <div v-if="!$v.name.required" class="invalid-feedback">
                            Por favor, selecione uma categoria para o ingrediente.
                        </div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="input-group col-md-4">
                        <label for="inputPrice">Preço unitário</label>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text">R$</span>
                            </div>
                            <input
                                :class="{'is-invalid': $v.price.$error}"
                                v-model="$v.price.$model"
                            type="number" class="form-control shadow-sm" id="inputPrice">
                            <div v-if="!$v.price.required" class="invalid-feedback">
                                Por favor, insira um preço para o ingrediente.
                            </div>
                            <div v-if="!$v.price.decimal" class="invalid-feedback">
                                Por favor, insira um preço válido para o ingrediente.
                            </div>
                            <div v-if="!$v.price.minValue || $v.price.maxValue" class="invalid-feedback">
                                Por favor, insira um preço entre R$ 0,00 e R$ 1000,00 para o ingrediente.
                            </div>
                        </div>
                    </div>

                    <div class="form-group col-md-4">
                        <label for="inputState">Estado</label>
                        <select
                            v-model="$v.status.$model"
                            :class="{'is-invalid': $v.status.$error}"
                        id="inputState" class="form-control shadow-sm">
                            <option disabled value="" selected>Selecione um estado</option>
                            <option value="avaliable">Disponível</option>
                            <option value="unavaliable">Indisponível</option>
                            <option value="desactivated">Desativado</option>
                        </select>
                        <div v-if="!$v.status.required" class="invalid-feedback">
                            Por favor, insira um estado para o ingrediente.
                        </div>
                    </div>
                </div>
                <hr>
                <div class="d-flex flex-row-reverse">
                    <div class="form-group col-md-2 d-flex flex-column">
                        <button @click="insertItem" :disabled="$v.$invalid" class="btn shadow-sm btn-success mt-auto rounded-pill shadow-sm"><i class="mr-1 fas fa-plus-circle"></i> Cadastrar</button>
                    </div>
                    <div class="form-group col-md-2 d-flex flex-column">
                        <router-link tag="button" :to="{name: storeRequest.name}" class="btn shadow-sm btn-danger mt-auto rounded-pill shadow-sm"><i class="mr-1 fas fa-undo-alt"></i> Voltar</router-link>
                    </div>
                </div>
            </form>
        </div>
    </admin-template>
</template>

<script>
import { required, decimal, maxValue, minValue } from "vuelidate/lib/validators"
import AdminTemplate from '../../layouts/AdminTemplate'
import Toast from "../../mixins/toasts"
import Requests from "../../mixins/storeRequests"

export default {
    components: {
        AdminTemplate
    },

    computed: {
        endpoint () {
            return `/api/ingredients`
        },
    },

    data () {
        return {
            name: '',
            category: '',
            price: 0,
            status: '',
            storeRequest: {
                name: 'admin.ingredients'
            }
        }
    },

    methods: {
        payload() {
            return {
                name: this.name,
                category: this.category,
                price: this.price,
                status: this.status,
            }
        }
    },

    mixins: [Toast, Requests],

    validations: {
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
    },
}
</script>