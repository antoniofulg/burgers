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
    
    // Ingredients
    getIngredients: state => {
        return state.ingredients
    },
    
    // Drinks
    getDrinks: state => {
        return state.drinks
    }

}

export default getters