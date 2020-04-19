<template>
    <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
            <div class="card bg-secondary shadow border-0">
                <div class="card-header bg-transparent pb-5">
                    <div class="text-muted text-center mt-2 mb-3">
                        <small>Entre com</small>
                    </div>
                    <div class="btn-wrapper text-center">
                        <a href="#" class="btn btn-neutral btn-icon">
                            <span class="btn-inner--icon"><img src="img/icons/common/facebook.svg"></span>
                            <span class="btn-inner--text">Facebook</span>
                        </a>
                        <a href="#" class="btn btn-neutral btn-icon">
                            <span class="btn-inner--icon"><img src="img/icons/common/google.svg"></span>
                            <span class="btn-inner--text">Google</span>
                        </a>
                    </div>
                </div>
                <div class="card-body px-lg-5 py-lg-5">
                    <div class="text-center text-muted mb-4">
                        <small>Ou cadastre-se com suas credenciais</small>
                    </div>
                    <form role="form">

                        <div class="form-group">
                            <label for="name">Nome</label>
                            <input
                                :class="{'is-invalid': $v.name.$error}"
                                v-model="$v.name.$model"
                                type="text"
                                class="form-control"
                                id="name"
                            />
                            <div v-if="!$v.name.required" class="invalid-feedback">
                                Por favor, preencha este campo.
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input
                                :class="{'is-invalid': $v.email.$error}"
                                v-model="$v.email.$model"
                                type="email" class="form-control" id="email"/>
                            <div v-if="!$v.email.required" class="invalid-feedback">
                                Por favor, preencha este campo.
                            </div>
                            <div v-if="!$v.email.email" class="invalid-feedback">
                                Por favor, preencha com um email válido.
                            </div>
                            <div v-if="!$v.email.not" class="invalid-feedback">
                                Este email já está sendo utilizado.
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="password">Senha</label>
                            <input
                                :class="{'is-invalid': $v.password.$error}"
                                v-model="$v.password.$model"
                                type="password" class="form-control" id="password"/>
                            <div v-if="!$v.password.required" class="invalid-feedback">
                                Por favor, preencha este campo.
                            </div>
                            <div v-if="!$v.password.minLength" class="invalid-feedback">
                                Este campo deve ter pelo menos {{$v.password.$params.minLength.min}} caracteres.
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="password_confirmation">Confirmar senha</label>
                            <input
                                :class="{'is-invalid': $v.password_confirmation.$error}"
                                v-model="$v.password_confirmation.$model"
                                type="password" class="form-control" id="password_confirmation">
                            <div v-if="!$v.password_confirmation.required" class="invalid-feedback">
                                Por favor, preencha este campo.
                            </div>
                            <div v-if="!$v.password_confirmation.sameAs" class="invalid-feedback">
                                Este campo precisa coincidir com o campo senha.
                            </div>
                            <div v-if="!$v.password_confirmation.minLength" class="invalid-feedback">
                                Este campo deve ter pelo menos {{$v.password_confirmation.$params.minLength.min}} caracteres.
                            </div>
                        </div>

                        <div class="row my-4">
                            <div class="col-12">
                                <base-checkbox class="custom-control-alternative">
                                    <span class="text-muted">Eu concordo com os <a href="#!">Termos de Uso</a></span>
                                </base-checkbox>
                            </div>
                        </div>
                        <div class="text-center">
                            <base-button @click="register" :disabled="$v.$invalid" type="primary" class="my-4">Criar conta</base-button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-6">
                    <a href="#" class="text-light">
                        <small>Esqueceu sua senha?</small>
                    </a>
                </div>
                <div class="col-6 text-right">
                    <router-link to="/login" class="text-light">
                        <small>Já possui uma conta?</small>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
    name: 'register',
    data() {
      return {
        model: {
          name: '',
          email: '',
          password: ''
        }
      }
    }
  }
</script>
<style>
</style>
