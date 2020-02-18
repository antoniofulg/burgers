<template>
  <nav class="navbar navbar-expand-lg navbar navbar-dark bg-dark">
    <div class="container">
      <router-link :to="{name: 'master.dashboard'}" tag="a" class="navbar-brand">Burguers</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <slot/>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
    mounted() {

    },
}
</script>