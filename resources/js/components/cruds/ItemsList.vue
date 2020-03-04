<template>
<span>
    <div class="table-responsive">
        <spinner v-if="$root.loading && firstLoad"></spinner>
        <b-table v-else
            :filter="filter"
            class="shadow-sm"
            bordered
            hover
            small
            striped
            head-variant="dark"
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
                    <button @click="updateStatus(status.item, 'avaliable')" v-if="status.value != 'avaliable'" class="dropdown-item"><i class="mr-1 fas fa-check-circle"></i> Disponível</button>
                    <button @click="updateStatus(status.item, 'unavaliable')" v-if="status.value != 'unavaliable'" class="dropdown-item"><i class="mr-1 fas fa-hourglass-half"></i> Indisponível</button>
                    <button @click="updateStatus(status.item, 'desactivated')" v-if="status.value != 'desactivated'" class="dropdown-item"><i class="mr-1 fas fa-ban"></i> Desativado</button>
                </div>
            </template>
            <template v-slot:cell(actions)="row">
                <div class="d-flex justify-content-center">
                    <button @click="editItem(row.item)" class="btn btn-primary btn-sm rounded-pill shadow-sm">
                        <span class="d-none d-sm-none d-md-none d-lg-block pr-4 pl-4"><i class="fas fa-pencil-alt"></i> Editar</span>                            
                        <span class="d-block d-sm-block d-md-block d-lg-none"><i class="fas fa-pencil-alt"></i></span>                            
                    </button>
                    <button @click="deleteTarget = row.item" data-toggle="modal" data-target="#delete" class="btn btn-danger btn-sm rounded-pill shadow-sm">
                        <span class="d-none d-sm-none d-md-none d-lg-block pr-4 pl-4"><i class="fas fa-trash"></i> Apagar</span>
                        <span class="d-block-sm-block d-md-block d-lg-none"><i class="fas fa-trash"></i></span>
                    </button>
                </div>
            </template>
        </b-table>

        <button @click="firstLoad = false">Click</button>
    </div>

    <modal id="delete" title="Confirme sua ação!">
        <template v-slot:body>
            <strong>Você realmente deseja apagar este ingrediente?</strong>
            <span class="d-block"><strong>Nome: </strong> {{deleteTarget.name}}</span> 
            <span class="d-block"><strong>Categoria: </strong> {{categoryName(deleteTarget.category)}}</span> 
            <span class="d-block"><strong>Estado: </strong> {{statusName(deleteTarget.status)}}</span>
            <span class="d-block"><strong>Preço: </strong> {{priceName(deleteTarget.price)}}</span>
        </template>
        <template v-slot:action>
            <button @click="$emit('deleteItem', deleteTarget)" type="button" class="btn btn-danger" data-dismiss="modal"><i class="mr-1 fas fa-trash"></i> Confirmar exclusão</button>
        </template>
    </modal>
</span>
</template>

<script>
import { required } from "vuelidate/lib/validators"
import Modal from '../../components/Modal'
import Toast from "../../mixins/toasts"

export default {
    components: {
        Modal
    },

    created() {
        console.log('criado itemList')
    },

    data () {
        return {
            deleteTarget: {},

            editRequest: {
                name: 'admin.ingredients.update'
            },

            getRequest: {
                setItems: 'setIngredients',
                errorMessage: 'Não foi possível obter os ingredientes!'
            },

            firstLoad: true,
        }
    },

    methods: {
        categoryName(category) {
            if (category ===  'bread') {
                return 'Pães'
            } else if (category === 'beef') {
                return 'Carnes'
            } else if (category === 'cheese') {
                return 'Queijos'
            } else if (category === 'salad') {
                return 'Saladas'
            } else if (category === 'sauce') {
                return 'Molhos'
            } else if (category === 'side_dishes') {
                return 'Acompanhamentos'
            }
        },

        editItem(item) {
            this.$router.push({
                name: this.editRequest.name,
                params: {
                    id: item.id,
                    item
                }
            })
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

    mixins: [Toast],

    props: ['itemsList', 'filter', 'table']
}
</script>

<style scoped>
    .pointer {
        cursor: pointer;
    }
</style>