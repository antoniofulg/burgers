<template>
    <admin-template>
        
    </admin-template>
</template>

<script>
import AdminTemplate from '../../layouts/AdminTemplate'
import Toast from "../../mixins/toasts"

export default {
    components: {
        AdminTemplate,
    },

    computed: {
        endpoint () {
            return `/api/users`
        },

        usersList() {
            return this.$store.getters.getUsers
        }
    },

    created () {
        this.user = this.$store.getters.getUser ? this.$store.getters.getUser : false
        if (this.user) {
            this.getUsers()
        }
    },

    data () {
        return {
            user: false,
            users: []
        }
    },

    methods: {
        getUsers () {
            axios.get(`${this.endpoint}`, {
                "headers": {"authorization": `Bearer ${this.$store.getters.getToken}`}
            }).then(response => {
                    if (response.data.concluded) {
                        console.log(response.data.users)
                        this.$store.commit('setUsers', response.data.users.data)
                        this.users = response.data.users.data;
                    } else {
                        this.toast('Erro!', response.data.message)
                    }
            }).catch(e => {
                console.log(e)
            })
        }
    },

    mixins: [Toast],
}
</script>