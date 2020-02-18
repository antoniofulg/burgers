<template>
    <admin-template>
        <div class="container mt-5">
            <h1>Ingredientes</h1>
            <form @submit.prevent>
                <div class="row">      
                    <div class="dropdown col-md-2">
                        <button class="btn btn-secondary rounded-pill dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fas fa-sort"></i> Ordenar lista
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a class="dropdown-item" href="#">Action</a>
                            <a class="dropdown-item" href="#">Another action</a>
                            <a class="dropdown-item" href="#">Something else here</a>
                        </div>
                    </div>
                    <div class="input-group col-md-4">
                        <input type="text" class="form-control" placeholder="Buscar ingredientes" aria-label="Recipient's username" aria-describedby="button-addon2">
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary" type="button"><i class="fas fa-search"></i></button>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <button class="btn btn-primary btn-block rounded-pill"><i class="fas fa-plus-circle"></i> Novo ingrediente</button>
                    </div>
                    <div class="col-md-2">
                        <button class="btn btn-warning btn-block rounded-pill"><i class="fas fa-trash"></i> Tornar</button>
                    </div>
                    <div class="col-md-2">
                        <button class="btn btn-danger btn-block rounded-pill"><i class="fas fa-trash"></i> Apagar</button>
                    </div>
                </div>
            </form>
        </div>
    </admin-template>
</template>

<script>
import AdminTemplate from '../../layouts/AdminTemplate'

export default {
    components: {
        AdminTemplate
    }
}
</script>

<style scoped>
    .dropdown-toggle::after {
        content: none;
    }
</style>