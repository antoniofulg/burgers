<template>
    <admin-template>
        <div class="container">
            <div class="row d-flex justify-content-around mt-5">
                <div class="col-3">
                    <div class="card text-center">
                        <div class="card-body">
                            <h5 class="card-title">5 novos pedidos</h5>
                            <p class="card-text">4 pedidos em andamento</p>
                            <a href="#" class="btn btn-primary">Gerenciar pedidos</a>
                        </div>
                    </div>
                </div>
                <div class="col-3">
                    <div class="card text-center">
                        <div class="card-body">
                            <h5 class="card-title">5 novos cadastros hoje</h5>
                            <p class="card-text">200 usuários pediram na última semana</p>
                            <a href="#" class="btn btn-primary">Gerenciar usuários</a>
                        </div>
                    </div>
                </div>
                <div class="col-3">
                    <div class="card text-center">
                        <div class="card-body">
                            <h5 class="card-title">Special title treatment</h5>
                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>
            </div>
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