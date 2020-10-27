<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Logout msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Logout from '@/components/Logout.vue'

export default {
  name: 'Home',
  components: {
    Logout
  }
}
</script>
