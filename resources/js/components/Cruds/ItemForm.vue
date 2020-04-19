<template>
    <span>
        <div class="row">
            <div class="col-sm-12 d-inline d-md-none align-middle">
                <button @click.prevent="$emit('resetItem')" class="btn btn-block btn-secondary mb-3 mt-auto shadow-sm"><i class="mr-1 fas fa-undo-alt"></i> Voltar para  tabela</button>
            </div>
        </div>
        <form @submit.prevent>
            <slot/>
            <hr>
            <div class="row">
                <div class="col-md-3 col-lg-2">
                    <button v-if="item.id" @click.prevent="$bvModal.show('delete')" class="btn btn-block mb-3  btn-danger mt-auto shadow-sm"><i class="mr-1 fas fa-trash"></i> Apagar</button>
                </div>
                <div class="d-none d-md-block col-md-3 offset-md-3 col-lg-2 offset-lg-6 ">
                    <button @click.prevent="$emit('resetItem')" class="btn btn-block mb-3 btn-secondary mt-auto shadow-sm"><i class="mr-1 fas fa-undo-alt"></i> Voltar</button>
                </div>
                <div class="col-md-3 col-lg-2">
                    <button v-if="!item.id" @click="$emit('insertItem')" :disabled="invalid" class="btn btn-block mb-3 shadow-sm btn-primary mt-auto shadow-sm"><i class="mr-1 fas fa-plus-circle"></i> Cadastrar</button>
                    <button v-else @click="$emit('updateItem')" :disabled="invalid" class="btn btn-block mb-3 btn-primary mt-auto shadow-sm"><i class="mr-1 fas fa-marker"></i> Atualizar</button>
                </div>
            </div>
        </form>
        <modal
            @deleteItem="$emit('deleteItem')"
            id="delete"
        />
    </span>
</template>

<script>
import Modal from '../Modal'

export default {
    components: {
        Modal
    },

    created() {
        console.log(this.item)
    },

    props: ['invalid', 'item', 'title']
}
</script>