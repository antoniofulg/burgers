<template>
    <admin-template>
        <div class="container mt-5">
            <div class="row">
                <div class="col-sm-12 col-md-6">
                    <h1>Meu perfil</h1>
                    <hr>
                    <form @submit.prevent>
                        <div class="form-row">
                            <div class="form-group col-12">
                                <label for="name">Nome <span class="text-danger">*</span></label>
                                <input
                                    @input="$v.name.$touch()"
                                    :class="{ 'is-invalid': $v.name.$dirty && $v.name.$invalid}"
                                    v-model="name"
                                type="text" class="form-control shadow-sm" id="name">
                                <div ref="invalid_name" class="invalid-feedback">
                                    Por favor, insira um nome válido.
                                </div>
                            </div>
                            <div class="form-group col-12">
                                <label for="email">Email <span class="text-danger">*</span></label>
                                <input
                                    :class="{'is-invalid': $v.email.$error}"
                                    v-model="$v.email.$model"
                                    type="email" class="form-control shadow-sm" id="email"/>
                                <div v-if="!$v.email.required" class="invalid-feedback">
                                    Por favor, preencha este campo.
                                </div>
                                <div v-if="!$v.email.email" class="invalid-feedback">
                                    Por favor, preencha com um email válido.
                                </div>
                            </div>
                            <div class="form-group col-12">
                                <label for="password">Senha atual <span class="text-danger">*</span></label>
                                <input
                                    :class="{'is-invalid': $v.password.$error}"
                                    v-model="$v.password.$model"
                                    type="password" class="form-control shadow-sm" id="password"/>
                                <div v-if="!$v.password.required" class="invalid-feedback">
                                    Por favor, preencha este campo.
                                </div>
                            </div>
                            <div v-if="new_password" class="form-group col-12">
                                <label for="password">Nova senha <span class="text-danger">*</span></label>
                                <input
                                    :class="{'is-invalid': $v.password.$error}"
                                    v-model="$v.password.$model"
                                    type="password" class="form-control shadow-sm" id="password"/>
                                <div v-if="!$v.password.required" class="invalid-feedback">
                                    Por favor, preencha este campo.
                                </div>
                            </div>
                            <div v-else class="form-group col-sm-12 col-md-8">
                                <button @click="new_password = true" class="btn btn-outline-primary btn-sm shadow-sm">Alterar senha?</button>
                            </div>
                        </div>
                        <hr>
                        <div class="d-flex flex-row-reverse">
                            <div class="form-group">
                                <button :disabled="$v.$invalid" class="btn btn-success btn-block rounded-pill shadow-sm"><i class="mr-1 fas fa-plus-circle"></i> Atualizar</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="col-sm-12 col-md-6">
                    <h3>Endereços</h3>
                    <hr>
                    <div class="card shadow-sm">
                        <div class="card-header d-flex justify-content-between bg-white">
                            <h5 class="d-inline text-bold mb-0">Casa</h5>
                            <div class="text-muted">
                                63100-555
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-8">
                                    <h6 class="card-subtitle text-muted"><strong>Crato</strong> - Palmeiral</h6>
                                    <h6 class="card-text">Rua André Cartaxo, 681</h6>
                                </div>
                                <div class="col-4">
                                    <button class="btn btn-outline-success btn-sm rounded-pill d-inline shadow-sm"><i class="fas fa-pen"></i> Editar</button>
                                    <button class="btn btn-outline-danger btn-sm rounded-pill d-inline shadow-sm"><i class="fas fa-trash"></i> Apagar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="!new_address" class="d-flex justify-content-center p-3">
                        <div class="form-group">
                            <button @click="new_address = {}" class="btn btn-primary btn-sm rounded-pill shadow-sm"><i class="fas fa-address-card"></i> Novo endereço</button>
                        </div>
                    </div>
                    <div v-else class="my-4">
                        <div class="card shadow-sm">
                            <div class="card-header d-flex justify-content-between bg-white">
                                <div class="row">
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label for="new_address_name">Nome do endereço</label>
                                            <input type="text" class="form-control" id="new_address_name" placeholder="Ex.: Trabalho">
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <label for="basic-url">CEP</label>
                                        <div class="input-group mb-3">
                                            <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3">
                                            <div class="input-group-append">
                                                <button class="btn btn-secondary" type="button"><i class="fas fa-search"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-8">
                                        <h6 class="card-subtitle text-muted"><strong>Crato</strong> - Palmeiral</h6>
                                        <h6 class="card-text">Rua André Cartaxo, 681</h6>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer bg-white">
                                <div class="d-flex justify-content-end">
                                    <button class="btn btn-success btn-sm rounded-pill d-inline shadow-sm mr-1"><i class="fas fa-plus-circle"></i> Cadastrar</button>
                                    <button class="btn btn-danger btn-sm rounded-pill d-inline shadow-sm"><i class="fas fa-undo-alt"></i> Cancelar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h3>Contato</h3>
                    <hr>
                    <div class="card shadow-sm">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-8 d-flex align-items-center">
                                    <h5 class="card-text">(88) 99729-6168</h5>
                                </div>
                                <div class="col-4">
                                    <button class="btn btn-outline-success btn-sm rounded-pill d-inline shadow-sm">
                                        <span class="d-none d-sm-none d-md-none d-lg-block"><i class="fas fa-pen"></i> Editar</span>                            
                                        <span class="d-block d-sm-block d-md-block d-lg-none"><i class="fas fa-pen"></i></span>  
                                    </button>
                                    <button class="btn btn-outline-danger btn-sm rounded-pill d-inline shadow-sm">
                                        <span class="d-none d-sm-none d-md-none d-lg-block"><i class="fas fa-trash"></i> Apagar</span>
                                        <span class="d-block-sm-block d-md-block d-lg-none"><i class="fas fa-trash"></i></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="!new_contact" class="d-flex justify-content-center p-3">
                        <div class="form-group">
                            <button @click="new_contact = {}" class="btn btn-primary btn-sm rounded-pill shadow-sm"><i class="fas fa-phone-alt"></i> Novo número</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </admin-template>
</template>

<script>
import { required, email } from "vuelidate/lib/validators"
import AdminTemplate from '../../layouts/AdminTemplate'
import Toast from "../../mixins/toasts"
import Requests from "../../mixins/storeRequests"

export default {
    components: {
        AdminTemplate
    },

    computed: {
        endpoint() {
            return `/api/user`
        },
    },

    data () {
        return {
            name: '',
            email: '',
            password: '',
            new_password: false,
            new_address: false,
            new_contact: false,
        }
    },

    methods: {
        placeUser(user) {
            this.name = user.name
            this.email = user.email
        },

        payload() {
            name = this.name
            email = this.email
            password = this.password
            new_password = this.new_password 
        }
    },

    mounted() {
        const user = this.$store.getters.getUser
        this.placeUser(user)
    },

    mixins: [Toast],

    validations: {
        name: {
            required
        },
        email: {
            required,
            email
        },
        password: {
            required
        },
    },
}
</script>