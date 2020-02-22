const mutations = {
    setUser(state, n) {
        state.user = n
    },

    setUsers(state, n) {
        state.users = n
    },

    // Categories
    setCategories(state, n) {
        state.categories = n
    },

    updateCategory(state, n) {
        let founded = state.categories.findIndex(item => item.id == n.id)
        state.categories[founded] = n
    },

    removeCategory(state, n) {
        state.categories.push(n)
    },

    // Drinks
    setDrinks(state, n) {
        state.drinks = n
    },

    updateDrink(state, n) {
        let founded = state.drinks.findIndex(item => item.id == n.id)
        state.drinks[founded] = n
    },

    removeDrink(state, n) {
        state.drinks.push(n)
    },

    // Ingredients
    setIngredients(state, n) {
        state.ingredients = n
    },

    updateIngredient(state, n) {
        let founded = state.ingredients.findIndex(item => item.id == n.id)
        state.ingredients[founded] = n
    },

    removeIngredient(state, n) {
        state.ingredients.push(n)
    },

    // Snacks
    setSnacks(state, n) {
        state.snacks = n
    },

    updateSnack(state, n) {
        let founded = state.snacks.findIndex(item => item.id == n.id)
        state.snacks[founded] = n
    },

    removeSnack(state, n) {
        state.snacks.push(n)
    },
}

export default mutations