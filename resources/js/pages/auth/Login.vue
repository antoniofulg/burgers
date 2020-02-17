<template>
    <div class="container">
        <div class="row">
            <div class="card col s12 l4 offset-l4">
                <div class="card-content white-text">
                    <div class="row">
                        <div class="input-field col s12">
                            <input v-model="email" id="email" type="text" class="validate" ref="email">
                            <label for="email">E-mail</label>
                            <span class="helper-text" data-error="Preencha adequadamente!" data-success="" ref="m_email"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <input v-model="password" id="senha" type="password" class="validate" ref="password">
                            <label for="senha">Senha</label>
                            <span class="helper-text" data-error="Preencha adequadamente!" data-success="" ref="m_password"></span>
                        </div>
                    </div>
                    <div class="row">
                        <button @click="login" :disabled="isInvalid" class="waves-effect waves-light btn-large yellow darken-2 col s12">Entrar</button>
                    </div>
                    <hr>
                    <div class="row">
                        <a class="waves-effect waves-light btn-large red col s12 disabled">Entrar com o google</a>
                    </div>
                    <div class="row">
                        <a class="waves-effect waves-light btn-large blue col s12 disabled">Entrar com o facebook</a>
                    </div>
                    <div class="row">
                        <p class="center-align grey-text text-darken-3">ou</p>
                    </div>
                    <div class="row">
                        <router-link class="waves-effect waves-light btn-large gray col s12" :to="{name: 'register'}">Criar uma conta</router-link>
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
            return `/api/login`;
        },

        isInvalid () {
            return this.email.length < 1 || this.password.length < 1;
            // return this.email.length < 10 || this.password.length < 8;
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
        login() {
            axios.post(this.endpoint, {
                email: this.email,
                password: this.password
            }).then(response => {
                console.log(response)
                if (response.data.concluded) {
                    this.$store.commit('setUser', response.data.user)
                    sessionStorage.setItem('user', JSON.stringify(response.data.user))
                    this.$router.push({name: 'dashboard'})
                } else {
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