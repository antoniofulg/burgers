import Loading from 'vue-loading-overlay'

import 'vue-loading-overlay/dist/vue-loading.css'

export default {
    data () {
        return {
            isLoading: false,
            fullPage: true
        }
    },

    components: {
        Loading
    }
}