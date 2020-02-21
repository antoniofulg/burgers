const mutations = {
    setUser(state, n) {
        state.user = n
    },

    setUsers(state, n) {
        state.users = n
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
    }
}

export default mutations