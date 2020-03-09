<template>
<span>
    <slot/>
    <div class="table-responsive">
        <spinner v-if="$root.loading"></spinner>
        <b-table v-else
            :filter="filter"
            class="shadow-sm"
            hover
            head-variant="light"
            :items="itemsList"
        :fields="table.fields">
            <template v-slot:cell(status)="status">
                    <button
                    :class="{
                        'btn-success': status.value === 'avaliable',
                        'btn-warning': status.value === 'unavaliable',
                        'btn-danger': status.value === 'desactivated'
                    }" class="btn btn-sm rounded-pill btn-block shadow-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {{statusName(status.value)}}
                </button>
                <div class="dropdown-menu">
                    <button @click="$emit('updateStatus', status.item, 'avaliable')" v-if="status.value != 'avaliable'" class="dropdown-item"><i class="mr-1 fas fa-check-circle"></i> Disponível</button>
                    <button @click="$emit('updateStatus', status.item, 'unavaliable')" v-if="status.value != 'unavaliable'" class="dropdown-item"><i class="mr-1 fas fa-hourglass-half"></i> Indisponível</button>
                    <button @click="$emit('updateStatus', status.item, 'desactivated')" v-if="status.value != 'desactivated'" class="dropdown-item"><i class="mr-1 fas fa-ban"></i> Desativado</button>
                </div>
            </template>
            <template v-slot:cell(actions)="row">
                <button
                    class="btn btn-sm shadow-none btn-block dropdown-toggle action-dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-ellipsis-v"></i>
                </button>
                <div class="dropdown-menu">
                    <button @click="$emit('editItem', row.item)" class="dropdown-item">
                        <span class="d-none d-sm-none d-md-none d-lg-block pr-4 pl-4"><i class="fas fa-pencil-alt"></i> Editar</span>                            
                        <span class="d-block d-sm-block d-md-block d-lg-none"><i class="fas fa-pencil-alt"></i></span>                            
                    </button>
                    <button @click="$emit('selectItem', row.item)" data-toggle="modal" data-target="#delete" class="dropdown-item">
                        <span class="d-none d-sm-none d-md-none d-lg-block pr-4 pl-4"><i class="fas fa-trash"></i> Apagar</span>
                        <span class="d-block-sm-block d-md-block d-lg-none"><i class="fas fa-trash"></i></span>
                    </button>
                </div>
            </template>
        </b-table>
    </div>
</span>
</template>

<script>
import { required } from "vuelidate/lib/validators"

export default {
    data () {
        return {
            editRequest: {
                name: 'admin.ingredients.update'
            },

            getRequest: {
                setItems: 'setIngredients',
                errorMessage: 'Não foi possível obter os ingredientes!'
            },
        }
    },

    methods: {  
        categoryName(category) {
            return this.$parent.$parent.categoryName(category);
        },

        payload (item, status) {
            return {
                name: item.name,
                category: item.category,
                price: item.price,
                status: status,
            }
        },

        priceName(price) {
            return price > 0 ? `R$ ${price.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}` : 'Grátis'
        },

        statusName(status) {
            return status === 'avaliable' ? 'Disponível' : status === 'unavaliable' ? 'Indisponível' : "Desativado"
        },
    },

    props: ['itemsList', 'filter', 'table']
}
</script>

<style scoped>
    .pointer {
        cursor: pointer;
    }

    .action-dropdown-toggle::after {
        content: none;
    }
</style>