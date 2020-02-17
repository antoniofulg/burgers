<template>
    <div class="container pt-5 pb-5">
        <div class="row align-middle d-flex justify-content-center">
            <div class="col-sm-12 col-md-8">
                <div class="card">
                    <div class="card-body">
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input v-model="email" type="email" class="form-control" id="email" aria-describedby="emailHelp">
                            <small id="emailHelp" class="form-text text-muted">Nunca compartilhe sua senha com ninguém!</small>
                        </div>
                        <div class="form-group">
                            <label for="password">Senha</label>
                            <input type="password" class="form-control" id="password">
                        </div>
                        <button class="btn btn-success btn-block btn-large">Entrar</button>
                        <hr>
                        <small id="emailHelp" class="form-text text-muted text-center mb-2">Não publicaremos nada em suas redes sociais!</small>
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
import { required, email, minLength } from "vuelidate/lib/validators";

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

                }
            }).catch(e => {
                console.log(e)
            })
        }
    },

    validations: {
       email: {
            required,
            minLength: minLength(8)
        },
        password: {
            required
        },
    }
}

</script>