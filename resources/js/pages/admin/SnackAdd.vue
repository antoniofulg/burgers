<template>
    <admin-template>
        <div class="container mt-5">
            <h1>Adicionar novo lanche</h1>
            <hr>
            <form @submit.prevent>
                <div class="form-row">
                    <div class="form-group col-sm-12 col-md-8">
                        <label for="name">Nome</label>
                        <input
                            @input="$v.name.$touch()"
                            :class="{ 'is-invalid': $v.name.$dirty && $v.name.$invalid}"
                            v-model="name"
                        type="text" class="form-control shadow-sm" placeholder="Ex.: Blend de boi, 100g" id="name">
                        <div ref="invalid_name" class="invalid-feedback">
                            Por favor, insira um nome para o lanche.
                        </div>
                    </div>
                    <div class="form-group col-sm-12 col-md-4">
                        <label for="category">Categoria</label>
                        <select
                            @input="$v.category_id.$touch()"
                            :class="{ 'is-invalid': $v.category_id.$dirty && $v.category_id.$invalid}"
                            v-model="category_id"
                        class="custom-select shadow-sm" id="category">
                        <div ref="invalid_category" class="invalid-feedback">
                            Por favor, selecione a categoria do ingrediente.
                        </div>
                            <option disabled value="" selected>Selecione uma categoria</option>
                            <option v-for="item in itemsList" :key="item.id" :value="item.id">{{item.name}}</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-sm-12">
                        <label for="description">Descrição</label>
                        <input
                            v-model="description"
                        type="text" class="form-control shadow-sm" placeholder="Ex.: Batatas fritas com molho..." id="description">
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
                                @input="$v.price.$touch()"
                                :class="{ 'is-invalid': $v.price.$dirty && $v.price.$invalid}"
                                v-model="price"
                            type="number" class="form-control shadow-sm" id="inputPrice">
                            <div ref="invalid_type" class="invalid-feedback">
                                Por favor, insira um preço para o lanche.
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
                            Por favor, insira um estado para o lanche.
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
import { required, decimal } from "vuelidate/lib/validators"
import AdminTemplate from '../../layouts/AdminTemplate'
import Toast from "../../mixins/toasts"
import Requests from "../../mixins/storeRequests"

export default {
    components: {
        AdminTemplate
    },

    computed: {
        endpoint() {
            return `/api/snacks`
        },

        itemsList()  {
            return this.$store.getters.getCategories
        }
    },

    created() {
        axios.get(`/api/categories`, this.headers)
            .then(response => {
                console.log(response)
                if (response.data.concluded) {
                    this.$store.commit('setCategories', response.data.items)
                } else {
                    this.warningToast('Ação não concluída!', this.getRequest.errorMessage)
                }
            }).catch(e => {
                console.log(e)
                this.dangerToast('Ação não concluída!', 'Não foi possível resposta do servidor!')
            })
    },

    data () {
        return {
            name: '',
            description: '',
            price: 0,
            status: '',
            category_id: '',
            storeRequest: {
                name: 'admin.snacks'
            }
        }
    },

    methods: {
        payload() {
            return {
                name: this.name,
                description: this.description,
                price: this.price,
                status: this.status,
                category_id: this.category_id
            }
        }
    },

    mixins: [Toast, Requests],

    validations: {
        name: {
            required
        },
        category_id: {
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