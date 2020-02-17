<template>
    <div class="container pt-5 pb-5">
        <div class="row align-middle d-flex justify-content-center">
            <div class="col-sm-12 col-md-8">
                <div class="card">
                    <div class="card-body">
                        <div class="form-group">
                            <label for="name">Nome</label>
                            <input
                                @input="$v.name.$touch()"
                                :class="{ 'is-invalid': $v.name.$dirty && $v.name.$invalid}"
                                v-model="name"
                                type="text"
                                class="form-control"
                                id="name"
                            />
                            <div ref="invalid_name" class="invalid-feedback">
                                Por favor, insira nome e sobrenome.
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input
                                @input="$v.email.$touch()"
                                :class="{ 'is-invalid': $v.email.$dirty && $v.email.$invalid}"
                                v-model="email"
                                type="email" class="form-control" id="email"/>
                            <div ref="invalid_email" class="invalid-feedback">
                                Por favor, insira um e-mail válido.
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="password">Senha</label>
                            <input
                                @input="$v.password.$touch()"
                                :class="{ 'is-invalid': $v.password.$dirty && $v.password.$invalid}"
                                v-model="password"
                                type="password" class="form-control" id="password"/>
                            <div ref="invalid_password" class="invalid-feedback">
                                Por favor, preencha o campo de senha.
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="password_confirmation">Confirmar senha</label>
                            <input
                                @input="$v.password_confirmation.$touch()"
                                :class="{ 'is-invalid': $v.password_confirmation.$dirty && $v.password_confirmation.$invalid}"
                                v-model="password_confirmation"
                                type="password" class="form-control" id="password_confirmation">
                            <div ref="invalid_password" class="invalid-feedback">
                                Por favor, confirme sua senha.
                            </div>
                        </div>
                        <button @click="register" :disabled="$v.$invalid" class="btn btn-success btn-block btn-large">Registrar</button>
                        <hr>
                        <router-link :to="{name: 'login'}" class="btn btn-secondary btn-block btn-large">Já possui uma conta?</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { required, email, sameAs } from "vuelidate/lib/validators";
import Toast from "../../mixins/toasts"

export default {
    computed: {
        endpoint () {
            return `/api/register`;
        }
    },
    
    created() {
        console.log(this.$store.getters.getUser)
    },

    data () {
        return {
            email: '',
            password: '',
            password_confirmation: '',
            name: ''
        }
    },

    methods: {
        register() {
            if (!this.$v.$invalid) {
                axios.post(this.endpoint, {
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.password_confirmation,
                    name: this.name,
                }).then(response => {
                    console.log(response)
                    if (response.data.concluded) {
                        this.$store.commit('setUser', response.data.user)
                        sessionStorage.setItem('user', JSON.stringify(response.data.user))
                        this.$router.push({name: 'master.dashboard'})
                    } else {
                        this.toast('Erro!', response.data.message)
                        // Informar em quais campos ocorreu problema
                    }
                }).catch(e => {
                    console.log(e)
                })
            } else {
                this.$v.$touch()
            }
        }
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
        password_confirmation: {
            required,
            sameAsPassword: sameAs('password')
        },
    }
}

</script>