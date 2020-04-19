const state = {
    user: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null,
    users: [],
    burguers: [],
    categories: [],
    drinks: [],
    ingredients: [],
    snacks: []
}

export default state