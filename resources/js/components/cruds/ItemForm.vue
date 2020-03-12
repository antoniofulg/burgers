<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-sm-3 d-inline d-md-none align-middle">
                <button @click.prevent="$emit('resetItem')" class="btn btn-secondary rounded-pill shadow-sm d-inline d-md-none mt-1"><i class="fas fa-undo-alt"></i> Voltar</button>
            </div>
            <div class="col-sm-9 col-md-12">
                <p v-if="!item.id" class="h1 ml-1 mb-0">Novo {{title}}</p>
                <p v-else class="h1 ml-auto mb-0">Editar {{title}}</p>
            </div>
        </div>
        <hr>
        <form @submit.prevent>
            <slot/>
            <hr>
            <div class="row">
                <div class="col-md-3 col-lg-2">
                    <button v-if="item.id" @click.prevent="$bvModal.show('delete')" class="btn btn-block mb-3  btn-danger mt-auto rounded-pill shadow-sm"><i class="mr-1 fas fa-trash"></i> Apagar</button>
                </div>
                <div class="d-none d-md-block col-md-3 offset-md-3 col-lg-2 offset-lg-6 ">
                    <button @click.prevent="$emit('resetItem')" class="btn btn-block mb-3 btn-secondary mt-auto rounded-pill shadow-sm"><i class="mr-1 fas fa-undo-alt"></i> Voltar</button>
                </div>
                <div class="col-md-3 col-lg-2">
                    <button v-if="!item.id" @click="$emit('insertItem')" :disabled="invalid" class="btn btn-block mb-3 shadow-sm btn-primary mt-auto rounded-pill shadow-sm"><i class="mr-1 fas fa-plus-circle"></i> Cadastrar</button>
                    <button v-else @click="$emit('updateItem')" :disabled="invalid" class="btn btn-block mb-3 btn-primary mt-auto rounded-pill shadow-sm"><i class="mr-1 fas fa-marker"></i> Atualizar</button>
                </div>
            </div>
        </form>
        <modal
            @deleteItem="$emit('deleteItem')"
            id="delete"
        />
    </div>
</template>

<script>
import Modal from '../Modal'

export default {
    components: {
        Modal
    },

    props: ['invalid', 'item', 'title']
}
</script>