<template>
    <div class="container text-center mt-5">
        <div class="jumbotron">
            <h1 class="display-4">Unauthorized</h1>
            <p class="lead">Você não possui acesso a este recurso!</p>
            <hr class="my-4">
            <router-link :to="{name: 'profile'}" class="btn btn-primary btn-lg">Voltar para pagina inicial</router-link>
        </div>
    </div>
</template>

<script>
import { required, email, sameAs } from "vuelidate/lib/validators";
import Toast from "../../mixins/toasts"

export default {
    
}

</script>