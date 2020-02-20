const mutations = {
    setUser(state, n) {
        state.user = n
    },

    setUsers(state, n) {
        state.users = n
    },

    setIngredients(state, n) {
        state.ingredients = n
    },

    addIngredient(state, n) {
        state.ingredients.push(n)
    }
}

export default mutations