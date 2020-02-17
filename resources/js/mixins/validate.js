export default {
    methods: {
        showValidation (validations) {
            for (const key in validations) {
                $(this.$refs[key]).addClass("invalid")
                $(this.$refs[`m_${key}`]).attr("data-error", `${validations[key]}`)
            }
        }
    }
}