<template>
    <div class="container pt-5 pb-5">
        <div class="row align-middle d-flex justify-content-center">
            <div class="col-sm-12 col-md-8 col-lg-6">
                <div class="card">
                    <div class="card-body">
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input
                                @input="$v.email.$touch()"
                                :class="{ 'is-invalid': $v.email.$dirty && $v.email.$invalid}"
                                v-model="email"
                                type="email"
                                class="form-control"
                                id="email"
                            required>
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
                                type="password"
                                class="form-control"
                                id="password"
                            required>
                            <div ref="invalid_password" class="invalid-feedback">
                                Por favor, preencha o campo de senha.
                            </div>
                        </div>
                        <button @click="login" :disabled="$v.$invalid" class="btn btn-success btn-block btn-large">Entrar</button>
                        <hr>
                        <small id="emailHelp" class="form-text text-muted text-center mb-1">Não publicaremos nada em suas redes sociais!</small>
                        <button class="btn btn-danger btn-block btn-large" disabled>Entrar com o Google</button>
                        <button class="btn btn-primary btn-block btn-large" disabled>Entrar com o Facebook</button>
                        <small class="form-text text-center text-muted mt-2 mb-2">ou</small>
                        <router-link :to="{name: 'register'}" class="btn btn-secondary btn-block btn-large">Criar uma nova conta</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators"
import Toast from "../../mixins/toasts"

export default {
    computed: {
        endpoint () {
            return `/api/login`
        }
    },
    
    created() {
        console.log(this.$store.getters.getUser)
    },

    data () {
        return {
            email: '',
            password: '',
            messages: {
                title: 'Deu certo',
                message: 'Agora vamos mandar as mensagens'
            }
        }
    },

    methods: {
        login() {
            if (!this.$v.$invalid) {
                axios.post(this.endpoint, {
                    email: this.email,
                    password: this.password
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
        },
    },

    mixins: [Toast],

    validations: {
       email: {
            required,
            email
        },
        password: {
            required
        },
    }
}

</script>