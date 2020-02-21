<template>
    <admin-template>
        <div class="container mt-5">
            <h1>Editar bebida</h1>
            <hr>
            <form @submit.prevent>
                <div class="form-row">
                    <div class="form-group col-sm-12 col-md-8">
                        <label for="name">Nome</label>
                        <input
                            @input="$v.name.$touch()"
                            :class="{ 'is-invalid': $v.name.$dirty && $v.name.$invalid}"
                            v-model="name"
                        type="text" class="form-control shadow-sm" placeholder="Ex.: Refrigerante (600ml)" id="name">
                        <div ref="invalid_name" class="invalid-feedback">
                            Por favor, insira um nome para a bebida.
                        </div>
                    </div>
                    <div class="form-group col-sm-12 col-md-4">
                       <label for="inputVolume">Volume (ml)</label>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text">R$</span>
                            </div>
                            <input
                                @input="$v.volume.$touch()"
                                :class="{ 'is-invalid': $v.volume.$dirty && $v.volume.$invalid}"
                                v-model="volume"
                            type="number" class="form-control shadow-sm" id="inputVolume">
                            <div ref="invalid_volume" class="invalid-feedback">
                                Por favor, insira o volume da bebida.
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-sm-12 col-md-4">
                        <label for="category">Categoria</label>
                        <select
                            @input="$v.category.$touch()"
                            :class="{ 'is-invalid': $v.category.$dirty && $v.category.$invalid}"
                            v-model="category"
                        class="custom-select shadow-sm" id="category">
                        <div ref="invalid_category" class="invalid-feedback">
                            Por favor, selecione a categoria da bebida.
                        </div>
                            <option disabled value="" selected>Selecione uma categoria</option>
                            <option value="water">Águas</option>
                            <option value="beer">Cervejas</option>
                            <option value="soda">Refrigerantes</option>
                            <option value="juice">Sucos</option>
                        </select>
                    </div>
                    
                    <div class="input-group col-md-4">
                        <label for="inputPrice">Preço unitário</label>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text">R$</span>
                            </div>
                            <input
                                @input="$v.price.$touch()"
                                :class="{ 'is-invalid': $v.price.$dirty && $v.price.$invalid}"
                                v-model="price"
                            type="number" class="form-control shadow-sm" id="inputPrice">
                            <div ref="invalid_type" class="invalid-feedback">
                                Por favor, insira um preço para a bebida.
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
                            <option value="avaliable">Disponível</option>
                            <option value="unavaliable">Indisponível</option>
                            <option value="desactivated">Desativado</option>
                        </select>
                        <div ref="invalid_status" class="invalid-feedback">
                            Por favor, insira um estado para a bebida.
                        </div>
                    </div>
                </div>
                <hr>
                <div class="d-flex flex-row-reverse">
                    <div class="form-group col-md-2 d-flex flex-column">
                        <button @click="updateItem" :disabled="$v.$invalid" class="btn shadow-sm btn-success mt-auto rounded-pill shadow-sm"><i class="mr-1 fas fa-plus-circle"></i> Cadastrar</button>
                    </div>
                    <div class="form-group col-md-2 d-flex flex-column">
                        <router-link tag="button" :to="{name: updateRequest.name}" class="btn shadow-sm btn-danger mt-auto rounded-pill shadow-sm"><i class="mr-1 fas fa-undo-alt"></i> Voltar</router-link>
                    </div>
                </div>
            </form>
        </div>
    </admin-template>
</template>

<script>
import { required, decimal, integer, numeric, maxValue } from "vuelidate/lib/validators"
import AdminTemplate from '../../layouts/AdminTemplate'
import Toast from "../../mixins/toasts"
import Requests from "../../mixins/updateRequests"

export default {
    components: {
        AdminTemplate
    },

    computed: {
        endpoint () {
            return `/api/drinks/${this.id}`
        },
    },

    data () {
        return {
            name: '',
            category: '',
            price: 0,
            volume: 0,
            status: '',
            updateRequest: {
                name: 'admin.drinks'
            }
        }
    },

    methods: {
        mountedPayload(item) {
            this.name = item.name;
            this.category = item.category;
            this.price = item.price;
            this.volume = item.volume;
            this.status = item.status;
        },

        payload() {
            return {
                name: this.name,
                category: this.category,
                price: this.price,
                volume: this.volume,
                status: this.status,
            }
        },
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
            decimal
        },
        volume: {
            required,
            integer,
            numeric,
            maxValue: maxValue(20000)
        },
        status: {
            required
        },
    },
}
</script>