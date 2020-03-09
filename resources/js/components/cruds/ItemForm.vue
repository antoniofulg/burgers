<template>
    <div class="container mt-5">
        <h1>Adicionar novo ingrediente</h1>
        <hr>
        <form @submit.prevent>
            <slot/>
            <hr>
            <div class="d-flex flex-row-reverse">
                <div v-if="!item.id" class="form-group col-md-2 d-flex flex-column">
                    <button @click="insertItem" :disabled="invalid" class="btn shadow-sm btn-success mt-auto rounded-pill shadow-sm"><i class="mr-1 fas fa-plus-circle"></i> Cadastrar</button>
                </div>
                <div v-else class="form-group col-md-2 d-flex flex-column">
                    <button @click="insertItem" :disabled="invalid" class="btn shadow-sm btn-success mt-auto rounded-pill shadow-sm"><i class="mr-1 fas fa-marker"></i> Atualizar</button>
                </div>
                <div class="form-group col-md-2 d-flex flex-column">
                    <button @click.prevent="$emit('resetItem')" class="btn shadow-sm btn-danger mt-auto rounded-pill shadow-sm"><i class="mr-1 fas fa-undo-alt"></i> Voltar</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { required, decimal } from "vuelidate/lib/validators"
import Requests from "../../mixins/storeRequests"
import Toast from "../../mixins/toasts"

export default {
    created() {
        console.log(this.item)
    },
    
    computed: {
        endpoint () {
            return `/api/ingredients`
        },
    },

    data () {
        return {
            name: '',
            category: '',
            price: 0,
            status: '',
            storeRequest: {
                name: 'admin.ingredients'
            }
        }
    },

    methods: {
        payload() {
            return {
                name: this.name,
                category: this.category,
                price: this.price,
                status: this.status,
            }
        },

        async insertItem() {
            try {
                const response = await axios.post(`${this.endpoint}`, this.payload(), this.headers)
                console.log(response)
                if (response.data.concluded) {
                    this.$router.push({
                        name: this.storeRequest.name,
                        params: {
                            toast: {
                                type: 'success',
                                title: 'Ação concluída!',
                                message: response.data.message
                            }
                        }
                    })
                } else {
                    this.warningToast('Ação não concluída!', response.data.message)
                }
            } catch (error) {
                console.log(error.response)
                this.dangerToast('Ação não concluída!', 'Não foi possível resposta do servidor!')
            }
        },
    },

    mixins: [Toast, Requests],

    props: ['invalid', 'item']
}
</script>