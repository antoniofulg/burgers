<template>
    <div class="row justify-content-center">
        <loading :active.sync="isLoading" 
        :can-cancel="false" 
        :is-full-page="true"></loading>
        <div class="col-lg-5 col-md-7">
            <div class="card bg-secondary shadow border-0">
                <div class="card-header bg-transparent pb-5">
                    <div class="text-muted text-center mt-2 mb-3"><small>Entre com</small></div>
                    <div class="btn-wrapper text-center">
                        <button href="#" class="btn btn-neutral btn-icon" disabled>
                            <span class="btn-inner--icon"><img src="img/icons/common/facebook.svg"></span>
                            <span class="btn-inner--text">Facebook</span>
                        </button>
                        <button href="#" class="btn btn-neutral btn-icon" disabled>
                            <span class="btn-inner--icon"><img src="img/icons/common/google.svg"></span>
                            <span class="btn-inner--text">Google</span>
                        </button>
                    </div>
                </div>
                <div class="card-body px-lg-5 py-lg-5">
                    <div class="text-center text-muted mb-4">
                        <small>Ou entre com suas credenciais</small>
                    </div>
                    <form role="form">
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input
                                :class="{'is-invalid': $v.email.$error}"
                                v-model="$v.email.$model"
                                type="email" class="form-control form-control-user" id="email"
                                placeholder="Insira seu endereço de e-mail"/>
                            <div v-if="!$v.email.required" class="invalid-feedback">
                                Por favor, preencha este campo.
                            </div>
                            <div v-if="!$v.email.email" class="invalid-feedback">
                                Por favor, preencha com um email válido.
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="password">Senha</label>
                            <input
                                :class="{'is-invalid': $v.password.$error}"
                                v-model="$v.password.$model"
                                type="password" class="form-control form-control-user" id="password"
                                    placeholder="Insira sua senha"/>
                            <div v-if="!$v.password.required" class="invalid-feedback">
                                Por favor, preencha este campo.
                            </div>
                        </div>

                        <base-checkbox class="custom-control-alternative">
                            <span class="text-muted">Lembrar-me</span>
                        </base-checkbox>
                        <div class="text-center">
                            <base-button @click="login" :disabled="$v.$invalid" type="primary" class="my-4">
                                <span>Entrar</span>
                            </base-button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-6">
                    <a href="#" class="text-light"><small>Esqueceu sua senha?</small></a>
                </div>
                <div class="col-6 text-right">
                    <router-link to="/register" class="text-light"><small>Criar uma nova conta</small></router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { required, email } from "vuelidate/lib/validators"
import Toast from "../../mixins/toasts"
import Loading from '../../mixins/loading'

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
        }
    },

    methods: {
        async login() {
            try {
                this.isLoading = true
                const response = await axios.post(this.endpoint, {
                    email: this.email,
                    password: this.password
                })

                if (response.data.concluded) {
                    this.$store.commit('setUser', response.data.user)
                    sessionStorage.setItem('user', JSON.stringify(response.data.user))
                    this.$router.push({name: 'dashboard',
                        params: {
                            toast: {
                                type: 'success',
                                title: 'Ação não concluída!',
                                message: response.data.message
                            }
                        }
                    })
                } else {
                    this.dangerToast('Não foi possível realizar o login', response.data.message)
                }
            } catch (error) {
                console.log(error.response)
                this.dangerToast('Ação não concluída!', 'Não foi possível resposta do servidor!')
            }
            this.isLoading = false 
        },
    },

    mixins: [Loading, Toast],

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
<style>
</style>
