<template>
  <div class="home">
    <Logout />
    <router-link class="btn btn-primary ml-2" to="/admin">後台</router-link>
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
