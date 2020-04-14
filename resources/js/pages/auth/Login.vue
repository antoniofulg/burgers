<template>
    <div class="container">

        <!-- Outer Row -->
        <div class="row justify-content-center">

            <div class="col-xl-10 col-lg-12 col-md-9">

                <div class="card o-hidden border-0 shadow-lg my-5">
                    <div class="card-body p-0">
                        <!-- Nested Row within Card Body -->
                        <div class="row">
                            <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                            <div class="col-lg-6">
                                <div class="p-5">
                                    <div class="text-center">
                                        <h1 class="h4 text-gray-900 mb-4">Bem-vindo de volta!</h1>
                                    </div>
                                    <form class="user">
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
                                        <div class="form-group">
                                            <div class="custom-control custom-checkbox small">
                                                <input type="checkbox" class="custom-control-input" id="customCheck">
                                                <label class="custom-control-label" for="customCheck">Lembrar email</label>
                                            </div>
                                        </div>
                                        <button @click="login" :disabled="$v.$invalid" class="btn btn-primary btn-user btn-block">
                                            <spinner :type="'submit'" v-if="$root.loading"></spinner>
                                            <span v-else>Entrar</span>
                                        </button>
                                        <hr>
                                        <a href="index.html" class="btn btn-google btn-user btn-block">
                                            <i class="fab fa-google fa-fw"></i> Entre com o Google
                                        </a>
                                        <a href="index.html" class="btn btn-facebook btn-user btn-block">
                                            <i class="fab fa-facebook-f fa-fw"></i> Entre com o Facebook
                                        </a>
                                    </form>
                                    <hr>
                                    <div class="text-center">
                                        <a class="small" href="forgot-password.html">Esqueceu sua senha?</a>
                                    </div>
                                    <div class="text-center">
                                        <a class="small" href="register.html">Crie uma conta!</a>
                                    </div>
                                </div>
                            </div>
                        </div>
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