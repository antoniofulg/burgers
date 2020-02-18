const getters = {
    getUser: state => {
        return state.user
    },
    getToken: state => {
        return state.user.token
    },
    getUsers: state => {
        return state.users
    }
}

export default getters