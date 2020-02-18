<template>
    <admin-template>
        <div class="container mt-5">
            <h1>Usuários</h1>
            <ul class="list-group">
                <li class="list-group-item">Cras justo odio</li>
                <li class="list-group-item">Dapibus ac facilisis in</li>
                <li class="list-group-item">Morbi leo risus</li>
                <li class="list-group-item">Porta ac consectetur ac</li>
                <li class="list-group-item">Vestibulum at eros</li>
            </ul>
        </div>
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