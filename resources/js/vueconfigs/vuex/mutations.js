const mutations = {
    setUser(state, n) {
        state.user = n
    },

    setUsers(state, n) {
        state.users = n
    },

    // Burgers
    setBurgers(state, n) {
        state.burgers = n
    },

    // Categories
    setCategories(state, n) {
        state.categories = n
    },

    // Drinks
    setDrinks(state, n) {
        state.drinks = n
    },

    // Ingredients
    setIngredients(state, n) {
        state.ingredients = n
    },

    // Snacks
    setSnacks(state, n) {
        state.snacks = n
    },

}

export default mutations