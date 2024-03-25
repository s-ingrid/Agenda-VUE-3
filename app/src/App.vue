<template>
  <NavBar />
  <router-view />
</template>

<style scoped>

</style>

<script>
import { defineComponent } from 'vue'
import NavBar from './views/NavBar/NavBar.vue'

export default defineComponent({
  components: {
    NavBar
  },
  setup() {
    
  }
})
</script>

