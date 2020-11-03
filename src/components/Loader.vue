<template>
  <div class="m-3"><SyncLoader :loading="loading" :color="color" :size="size"></SyncLoader></div>
</template>

<script>
import SyncLoader from 'vue-spinner/src/SyncLoader.vue'

export default {
  name: "DeletePds",
  data() {
    return {
      color: '#333333',
      size: '10px'
    };
  },
  components: {
    SyncLoader
  }
};
</script>