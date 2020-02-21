const state = {
    user: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null,
    users: [],
    ingredients: [],
    drinks: []
}

export default state