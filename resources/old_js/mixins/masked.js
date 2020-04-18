export default {
    data () {
        return {      
            money: {
                decimal: ',',
                thousands: '.',
                prefix: 'R$ ',
                precision: 2,
                masked: false
            },

            volume: {
                thousands: '.',
                suffix: ' ml',
                precision: 0,
                masked: false
            },
        }
    },
}

export const money = {
    data () {
        return {
            money: {
                decimal: ',',
                thousands: '.',
                prefix: 'R$ ',
                precision: 2,
                masked: false
            },
        }
    }
}

export const volume = {
    data () {
        return {
            volume: {
                thousands: '.',
                suffix: ' ml',
                precision: 0,
                masked: false
            },
        }
    }
}