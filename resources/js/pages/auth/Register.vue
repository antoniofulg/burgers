<template>
    <div class="container">
        <div class="row">
            <div class="card col s12 l4 offset-l4">
                <div class="card-content white-text">
                    <div class="row">
                        <div class="input-field col s12">
                            <input v-model="name" id="nome" type="text" class="validate" ref="name">
                            <label for="nome">Nome</label>
                            <span class="helper-text" data-error="Preencha adequadamente!" data-success="" ref="m_name"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <input v-model="email" id="email" type="email" class="validate" ref="email">
                            <label for="email">E-mail</label>
                            <span class="helper-text" data-error="Preencha adequadamente!" data-success="" ref="m_email"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <input v-model="password" id="password" type="password" class="validate" ref="password">
                            <label for="password">Senha</label>
                            <span class="helper-text" data-error="Preencha adequadamente!" data-success="" ref="m_password"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <input v-model="password_confirmation" id="password_confirmation" type="password"  class="validate" ref="password">
                            <label for="password_confirmation">Confirmar senha</label>
                            <span class="helper-text" data-error="Preencha adequadamente!" data-success="" ref="m_password"></span>
                        </div>
                    </div>
                    <div class="row">
                        <button @click="register" :disabled="isInvalid" class="waves-effect waves-light btn-large gray col s12">Cadastrar conta</button>
                    </div>
                    <hr>
                    <div class="row">
                        <router-link class="waves-effect waves-light btn-large yellow darken-2 col s12" :to="{name: 'login'}">Já possui uma conta?</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import validate from '../../mixins/validate'

export default {
    computed: {
        endpoint () {
            return `/api/register`;
        },

        isInvalid () {
            return this.name.length < 5 ||this.email.length < 10 || this.password.length < 8 || this.password_confirmation.length < 8;
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
                    this.$router.push({name: 'dashboard'})
                } else {
                    //Melhorar resposta para validacao
                    M.toast({html: `${response.data.message}`})
                    this.showValidation(response.data.validation)
                }
            }).catch(e => {
                console.log(e)
            })
        }
    },

    mixins: [validate],
}

</script>