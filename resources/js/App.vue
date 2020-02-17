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

</style>