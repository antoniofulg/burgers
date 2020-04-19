<template>
<span>
    <spinner v-if="$root.loading && firstLoad"></spinner>
    <div class="card-header px-0 pt-0 pb-4">
        <slot/>
    </div>
    <div class="table-responsive">
        <b-table
            :fields="table.fields"
            :filter="filter"
            hover
            head-variant="light"
            :items="itemsList"
            @row-clicked="showItem"
        >
            <template v-slot:cell(status)="status">
                <base-dropdown>
                    <base-button slot="title" size="sm" :type="status.value == 'avaliable' ? 'success' : status.value == 'unavaliable' ? 'warning' : 'danger'" class="dropdown-toggle">
                        {{$parent.statusName(status.value)}}
                    </base-button>
                    <button @click="$emit('updateStatus', status.item, 'avaliable')" v-if="status.value != 'avaliable'" class="dropdown-item">
                        <i class="mr-1 fas fa-check-circle"></i> Disponível
                    </button>
                    <button @click="$emit('updateStatus', status.item, 'unavaliable')" v-if="status.value != 'unavaliable'" class="dropdown-item">
                        <i class="mr-1 fas fa-hourglass-half"></i> Indisponível
                    </button>
                    <button @click="$emit('updateStatus', status.item, 'desactivated')" v-if="status.value != 'desactivated'" class="dropdown-item">
                        <i class="mr-1 fas fa-ban"></i> Desativado
                    </button>
                </base-dropdown>
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