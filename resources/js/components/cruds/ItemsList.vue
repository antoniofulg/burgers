<template>
<span>
    <slot/>
    <div class="table-responsive shadow-sm">
        <spinner v-if="$root.loading && firstLoad"></spinner>
        <b-table v-else
            :fields="table.fields"
            :filter="filter"
            hover
            head-variant="light"
            :items="itemsList"
            @row-clicked="showItem"
        >
            <template v-slot:cell(status)="status">
                <button
                    :class="{
                        'btn-success': status.value === 'avaliable',
                        'btn-warning': status.value === 'unavaliable',
                        'btn-danger': status.value === 'desactivated'
                    }" class="btn btn-sm rounded-pill btn-block shadow-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {{$parent.$parent.statusName(status.value)}}
                </button>
                <div class="dropdown-menu">
                    <button @click="$emit('updateStatus', status.item, 'avaliable')" v-if="status.value != 'avaliable'" class="dropdown-item"><i class="mr-1 fas fa-check-circle"></i> Disponível</button>
                    <button @click="$emit('updateStatus', status.item, 'unavaliable')" v-if="status.value != 'unavaliable'" class="dropdown-item"><i class="mr-1 fas fa-hourglass-half"></i> Indisponível</button>
                    <button @click="$emit('updateStatus', status.item, 'desactivated')" v-if="status.value != 'desactivated'" class="dropdown-item"><i class="mr-1 fas fa-ban"></i> Desativado</button>
                </div>
            </template>
        </b-table>
    </div>
</span>
</template>

<script>
import { required } from "vuelidate/lib/validators"

export default {
    methods: {  
        showItem(item) {
            this.$emit('showItem', item)
        },
    },

    props: ['filter', 'firstLoad', 'itemsList', 'table']
}
</script>

<style>
    tr, .pointer {
        cursor: pointer;
    }

    .action-dropdown-toggle::after {
        content: none;
    }
</style>