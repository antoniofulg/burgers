<template>
    <div class="container pt-5 pb-5">
        <div class="row align-middle d-flex justify-content-center">
            <div class="col-sm-12 col-md-8">
                <div class="card">
                    <div class="card-body">
                        <div class="form-group">
                            <label for="name">Nome</label>
                            <input type="text" class="form-control" id="name">
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" class="form-control" id="email">
                        </div>
                        <div class="form-group">
                            <label for="password">Senha</label>
                            <input type="password" class="form-control" id="password">
                        </div>
                        <div class="form-group">
                            <label for="password_confirmation">Confirmar senha</label>
                            <input type="password" class="form-control" id="password_confirmation">
                        </div>
                        <button class="btn btn-success btn-block btn-large">Registrar</button>
                        <hr>
                        <router-link :to="{name: 'login'}" class="btn btn-secondary btn-block btn-large">Já possui uma conta?</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
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
                }
            }).catch(e => {
                console.log(e)
            })
        }
    },
}

</script>