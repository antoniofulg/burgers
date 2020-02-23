<template>
    <div class="container pt-5 pb-5">
        <div class="row align-middle d-flex justify-content-center">
            <div class="col-sm-12 col-md-8">
                <div class="card">
                    <div class="card-body">
                        <form @submit.prevent>
                            <div class="form-group">
                                <label for="name">Nome</label>
                                <input
                                    :class="{'is-invalid': $v.name.$error}"
                                    v-model="$v.name.$model"
                                    type="text"
                                    class="form-control"
                                    id="name"
                                />
                                <div v-if="!$v.name.required" class="invalid-feedback">
                                    Por favor, preencha este campo.
                                </div>
                            </div>
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
                                <div v-if="!$v.email.not" class="invalid-feedback">
                                    Este email já está sendo utilizado.
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
                                <div v-if="!$v.password.minLength" class="invalid-feedback">
                                    Este campo deve ter pelo menos {{$v.password.$params.minLength.min}} caracteres.
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="password_confirmation">Confirmar senha</label>
                                <input
                                    :class="{'is-invalid': $v.password_confirmation.$error}"
                                    v-model="$v.password_confirmation.$model"
                                    type="password" class="form-control" id="password_confirmation">
                                <div v-if="!$v.password_confirmation.required" class="invalid-feedback">
                                    Por favor, preencha este campo.
                                </div>
                                <div v-if="!$v.password_confirmation.sameAs" class="invalid-feedback">
                                    Este campo precisa coincidir com o campo senha.
                                </div>
                                <div v-if="!$v.password_confirmation.minLength" class="invalid-feedback">
                                    Este campo deve ter pelo menos {{$v.password_confirmation.$params.minLength.min}} caracteres.
                                </div>
                            </div>
                            <button @click="register" :disabled="$v.$invalid" class="btn btn-success btn-block btn-large">Registrar</button>
                        </form>
                        <hr>
                        <router-link :to="{name: 'login'}" class="btn btn-secondary btn-block btn-large">Já possui uma conta?</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { required, email, minLength, not, sameAs } from "vuelidate/lib/validators";
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
            email_unique: '',
            password: '',
            password_confirmation: '',
            name: ''
        }
    },

    methods: {
        register() {
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
                    this.$router.push({name: 'profile'})
                } else {
                    this.warningToast('Ação não concluída!', response.data.message)
                    for (let field in response.data.validation) {
                        this.warningToast('Erro de validação!', response.data.validation[field])
                    }
                    this.email_unique = this.email
                }
            }).catch(e => {
                console.log(e)
            })
        }
    },

    mixins: [Toast],

    validations: {
        name: {
            required
        },
        email: {
            required,
            email,
            not: not(sameAs('email_unique'))
        },
        password: {
            required,
            minLength: minLength(8)
        },
        password_confirmation: {
            required,
            minLength: minLength(8),
            sameAsPassword: sameAs('password')
        },
    }
}

</script>