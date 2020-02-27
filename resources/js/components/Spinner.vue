<template>
    <div v-if="type === 'content'" class="d-flex justify-content-center m-5">
        <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
    <span v-else-if="type === 'submit'">
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        <span class="sr-only">Loading...</span>
    </span>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: 'content'
        },
    }
}
</script>