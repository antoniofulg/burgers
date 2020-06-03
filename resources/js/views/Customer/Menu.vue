<template>
    <div class="row justify-content-center">
        <loading :active.sync="isLoading" 
        :can-cancel="false" 
        :is-full-page="true"></loading>
        <div class="col-lg-12 col-md-12">
            <div class="card bg-secondary shadow border-0">
                <div class="card-header bg-transparent pb-5">
                    <div class="h2 mt-2 mb-3">Hamburguers</div>
                    <ul v-for="(burger, burger_index) in burgersList" :key="'burger-'+burger_index" class="list-group">
                        <li class="list-group-item">
                            <h3 class="mb-0">
                                {{burger.name}} <span class="badge badge-success">{{burger.status}}</span>
                            </h3>
                            <div class="row">
                                <div class="col-8">
                                    <p class="text-muted mb-0">
                                        {{ingredientsFormatter(burger.ingredients)}}
                                    </p>
                                </div>
                                <div class="col-4">
                                    <button class="btn btn-primary"></button>
                                </div>
                            </div>
                            <p class="mb-0">{{priceTemplate(burger.price)}}</p>
                        </li>
                    </ul>
                    <hr>
                    <div v-for="(category, category_index) in categoriesList" :key="category_index">
                        <div v-if="category.snacks_count > 0" class="h2 mt-2 mb-3">
                            {{category.name}}
                        </div>
                        <ul v-for="(snack, snack_index) in category.snacks" :key="'snack-'+snack_index" class="list-group">
                            <li v-if="snack.category.id == category.id" class="list-group-item">
                                <h3 class="mb-0">
                                    {{snack.name}} <span class="badge badge-success">{{snack.status}}</span>
                                </h3>
                                <div class="row">
                                    <div class="col-8">
                                        <p class="text-muted mb-0">
                                            {{snack.description}}
                                        </p>
                                    </div>
                                    <div class="col-4">
                                        <button class="btn btn-primary"></button>
                                    </div>
                                </div>
                                <p class="mb-0">{{priceTemplate(snack.price)}}</p>
                            </li>
                        </ul>
                        <hr v-if="category.snacks_count > 0">
                    </div>
                    <div class="h2 mt-2 mb-3">Bebidas</div>
                    <ul v-for="(drink, drink_index) in drinksList" :key="'drink-'+drink_index" class="list-group">
                        <li class="list-group-item">
                            <h3 class="mb-0">
                                {{drink.name}} <span class="badge badge-success">{{drink.status}}</span>
                            </h3>
                            <div class="row">
                                <div class="col-8">
                                    <p class="text-muted mb-0">
                                        {{drink.volume}}
                                    </p>
                                </div>
                                <div class="col-4">
                                    <button class="btn btn-primary"></button>
                                </div>
                            </div>
                            <p class="mb-0">{{priceTemplate(drink.price)}}</p>
                        </li>
                    </ul>
                    <hr>
                </div>
                <div class="card-body px-lg-5 py-lg-3">
                    <div class="row">
                        <div class="col-6">
                            <button class="btn btn-primary btn-block">Ver sacola</button>
                        </div>
                        <div class="col-6">
                            <button class="btn btn-success btn-block">Finalizar pedido</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-6">
                    <a href="#" class="text-light"><small>Fazer reclamação</small></a>
                </div>
                <div class="col-6 text-right">
                    <router-link to="/login" class="text-light"><small>Ver sacola</small></router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Loading from '../../mixins/loading'
import PriceTemplate from '../../mixins/priceTemplate'

export default {
    computed: {
        endpoint () {
            return `/api/menu`
        },

        burgersList() {
            return JSON.parse(JSON.stringify(this.$store.getters[`getBurgers`]))
        },

        ingredientsList() {
            return JSON.parse(JSON.stringify(this.$store.getters[`getIngredients`]))
        },

        categoriesList() {
            return JSON.parse(JSON.stringify(this.$store.getters[`getCategories`]))
        },

        drinksList() {
            return JSON.parse(JSON.stringify(this.$store.getters[`getDrinks`]))
        },
    },
    
    created() {
        console.log(this.$store.getters.getUser)
    },

    data () {
        return {
            email: '',
            password: '',
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

        async getMenu() {
            try {
                this.isLoading = true
                const response = await axios.get(`${this.endpoint}`, this.headers)
                console.log(response)
                if (response.data.concluded) {
                    this.$store.commit(`setBurgers`, response.data.burgers)
                    this.$store.commit(`setIngredients`, response.data.ingredients)
                    this.$store.commit(`setCategories`, response.data.categories)
                    this.$store.commit(`setDrinks`, response.data.drinks)
                } else {
                    console.log(this.request.errorMessage)
                }
            } catch (error) {
                console.log(error.response)
            }
            this.isLoading = false
        },

        ingredientsFormatter(value) {
            let list = value.map((val) => {
                return (val.amount > 1 ? ` ${val.amount}x ` : ' ') + (val.name ? val.name : this.categoryName(val.category))
            })
            return list.toString()
        }
    },

    mixins: [Loading, PriceTemplate],

    mounted () {
        this.getMenu()
    },
}

</script>
<style>
</style>
