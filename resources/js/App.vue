<template>
  <main>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </main>
</template>

<script>


export default {
  name: 'app',
  components:{
    
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s linear;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>