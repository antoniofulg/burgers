const getters = {
    // Users
    getUser: state => {
        return state.user
    },
    getACL: state => {
        return state.user ? state.user.access_level : null
    },
    getToken: state => {
        return state.user ? state.user.token : null
    },
    getUsers: state => {
        return state.users
    },

    // Burguers
    getBurguers: state => {
        return state.burguers
    },

    // Categories
    getCategories: state => {
        return state.categories
    },
    
    // Drinks
    getDrinks: state => {
        return state.drinks
    },
    
    // Ingredients
    getIngredients: state => {
        return state.ingredients
    },
    
    // Snacks
    getSnacks: state => {
        return state.snacks
    },

}

export default getters