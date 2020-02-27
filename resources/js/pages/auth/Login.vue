<template>
    <div class="container pt-5 pb-5">
        <div class="row align-middle d-flex justify-content-center">
            <div class="col-sm-12 col-md-8 col-lg-6">
                <div class="card">
                    <div class="card-body">
                        <form @submit.prevent>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input
                                    :class="{'is-invalid': $v.email.$error}"
                                    v-model="$v.email.$model"
                                    type="email" class="form-control" id="email"/>
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
                                    type="password" class="form-control" id="password"/>
                                <div v-if="!$v.password.required" class="invalid-feedback">
                                    Por favor, preencha este campo.
                                </div>
                            </div>
                            <button @click="login" :disabled="$v.$invalid" class="btn btn-success btn-block btn-large">
                                <spinner :type="'submit'" v-if="$root.loading"></spinner>
                                <span v-else>Entrar</span>
                            </button>
                        </form>
                        <hr>
                        <small id="emailHelp" class="form-text text-muted text-center mb-1">Não publicaremos nada em suas redes sociais!</small>
                        <button class="btn btn-danger btn-block btn-large" disabled><i class="fab fa-google mr-2"></i>Entrar com o Google</button>
                        <button class="btn btn-primary btn-block btn-large" disabled><i class="fab fa-facebook mr-2"></i>Entrar com o Facebook</button>
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
        }
    },

    methods: {
        async login() {
            try {
                const response = await axios.post(this.endpoint, {
                    email: this.email,
                    password: this.password
                })

                if (response.data.concluded) {
                    this.$store.commit('setUser', response.data.user)
                    sessionStorage.setItem('user', JSON.stringify(response.data.user))
                    this.$router.push({name: 'profile',
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