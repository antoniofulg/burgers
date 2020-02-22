<template>
    <admin-template>
        <div class="container mt-5">
            <h1>Adicionar nova categoria</h1>
            <hr>
            <form @submit.prevent>
                <div class="form-row">
                    <div class="form-group col-sm-12 col-md-4">
                        <label for="name">Nome</label>
                        <input
                            @input="$v.name.$touch()"
                            :class="{ 'is-invalid': $v.name.$dirty && $v.name.$invalid}"
                            v-model="name"
                        type="text" class="form-control shadow-sm" placeholder="Ex.: Batatas fritas" id="name">
                        <div ref="invalid_name" class="invalid-feedback">
                            Por favor, insira um nome para a categoria.
                        </div>
                    </div>
                    <div class="form-group col-sm-12 col-md-8">
                        <label for="description">Descrição</label>
                        <input
                            v-model="description"
                        type="text" class="form-control shadow-sm" placeholder="Ex.: Batatas fritas com molho..." id="description">
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
        endpoint () {
            return `/api/categories`
        },
    },

    data () {
        return {
            name: '',
            description: '',
            storeRequest: {
                name: 'admin.categories'
            }
        }
    },

    methods: {
        payload() {
            return {
                name: this.name,
                description: this.description,
            }
        }
    },

    mixins: [Toast, Requests],

    validations: {
        name: {
            required
        },
    },
}
</script>