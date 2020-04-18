<template>
    <b-modal :id="id" hide-footer centered title="Você tem certeza?">
        <div class="d-block text-center">
            <p class="h5">Você realmente deseja excluir este item?</p>
        </div>
        <div class="row">
            <div class="offset-1 col-5">
                <button @click="closeModal" class="btn btn-secondary rounded-pill shadow-sm btn-block mt-3"><i class="fas fa-ban"></i> Cancelar</button>
            </div>
            <div class="col-5">
                <button @click="emitEvent('deleteItem')" class="btn btn-danger rounded-pill shadow-sm btn-block mt-3"><i class="fas fa-trash"></i> Confirmar</button>
            </div>
        </div>
    </b-modal>
</template>

<script>
export default {
    methods: {
        closeModal() {
            this.$bvModal.hide(this.id)
        },

        emitEvent(name) {
            this.closeModal()
            this.$emit(name)
        }
    },

    props: [
        'id',
    ]
}
</script>