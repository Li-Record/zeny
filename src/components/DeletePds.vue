<template>
  <div>
    <div v-if="pdData">確認是否刪除 <strang class="h4 text-danger">{{ pdData.category }} {{ pdData.title }}</strang></div>
    <Loader v-else></Loader>
    
  </div>
</template>

<script>
import Loader from '@/components/Loader.vue'

export default {
  name: "DeletePds",
  data() {
    return {
      color: '#333333'
    };
  },
  props:['pd-data'],
  components: {
    Loader
  }
};
</script>