export default {
    computed: {
        endpoint () {
            return `/api/logout`
        },
    },
      
    methods: {
        logout() {
            console.log('vamos efetuar o login, primo')
            axios.post(`${this.endpoint}`, {}, {"headers":
                {"authorization":`Bearer ${this.$store.getters.getToken}`}
            }).then(response => {
                console.log(response)
                if (response.data.concluded) {
                    this.$store.commit('setUser', null)
                    sessionStorage.clear()
                    this.$router.push({name: 'login',
                        params: {
                            toast: {
                                type: 'success',
                                title: 'Ação concluída!',
                                message: response.data.message
                            }
                        }
                    })
                } else {
                    this.$store.commit('setUser', null)
                    sessionStorage.clear()
                    this.$router.push({
                        name: 'login',
                        params: {
                            toast: {
                                type: 'success',
                                title: 'Ação concluída!',
                                message: response.data.message
                            }
                        }
                    })
                }
            }).catch(e => {
                this.$store.commit('setUser', null)
                sessionStorage.clear()
                this.$router.push({
                    name: 'login',
                    params: {
                        toast: {
                            type: 'warning',
                            title: 'Ação não concluída!',
                            message: 'Sessão não encontrada!'
                        }
                    }
                })
            })
        },
    },
}