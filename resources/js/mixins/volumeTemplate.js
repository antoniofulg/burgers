export default {
    methods: {
        volumeTemplate(volume) {
            return volume >= 1000 ? `${(volume / 1000).toLocaleString('pt-BR', {
                minimumFractionDigits: 1,
                maximumFractionDigits: 3
            })} L` : `${volume} ml`
        },
    }
}