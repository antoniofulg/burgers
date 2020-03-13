<template>
    <money
        :class="{ 'is-invalid': invalid}"
        @change="update"
        v-model="model"
        v-bind="maskType"
        class="form-control shadow-sm" :id="id"
    />
</template>

<script>
import { Money } from 'v-money'
export default {
    components: {
        Money,
    },

    computed: {
        maskType () {
            return this[this.type]
        }
    },

    data() {
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

    methods: {
        update(name) {
            this.$emit("money", name);
        }
    },

    model: {
        event: "money"
    },

    props: ['id', 'invalid', 'model', 'type']
}
</script>