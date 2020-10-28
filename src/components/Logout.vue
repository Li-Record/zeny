<template>
  <div>
    <b-button variant="primary" @click.prevent="logout">登出</b-button>
  </div>
</template>

<script>
export default {
  name: "logout",
  data() {
    return {};
  },
  props: {},
  created() {
    const vm = this;
    const api = `${process.env.VUE_APP_PRODUCTS_API_PATH}/api/user/check`;
    vm.$http.post(api).then((response) => {
      if (!response.data.success) {
        alert('請先登入');
        vm.$router.push('/login');
      }
    })
  },
  methods: {
    logout() {
      const vm = this;
      const api = `${process.env.VUE_APP_PRODUCTS_API_PATH}/logout`;
      this.$http.post(api).then((response) => {
        console.log(response.data);
        if(response.data.success) {
          vm.$router.push('/login');
        }
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
