<template>
  <div class="d-inline-block">
    <b-button :variant="btnStyle" v-b-modal="pdId + '_del'" @click="getProductData()">
      <slot name="btn_title">Click</slot>
    </b-button>

    <b-modal
      :id="pdId + '_del'"
      size="lg"
      centered
      :title="modelTitle"
      ok-title="刪除"
      cancel-title="取消"
      :header-bg-variant="headerBgVariant"
      :header-text-variant="headerTextVariant"
      :body-text-variant="bodyTextVariant"
      :ok-variant="okVariant"
      :footer-bg-variant="footerBgVariant"
      :footer-text-variant="footerTextVariant"
      @ok="delPd"
    >
      <DeletePds :pd-data="pdData[0]"></DeletePds>
    </b-modal>
  </div>
</template>

<script>
import DeletePds from "@/components/DeletePds.vue";

export default {
  name: "PdsDelModel",
  data() {
    return {
      pdData: [],
      emit_pd: {},
      show: false,
      variants: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark'],
      headerBgVariant: 'danger',
      headerTextVariant: 'light',
      bodyTextVariant: 'dark',
      okVariant: 'danger',
      footerBgVariant: 'light',
      footerTextVariant: 'dark'
    }
  },
  methods: {
    getProductData() {
      const vm = this;
      const api = `${process.env.VUE_APP_PRODUCTS_API_PATH}/api/${process.env.VUE_APP_CUSTOMER_PATH}/admin/products/all`
      vm.$http.get(api).then((response) => {
        if (response.data.success) {
          const emptyPdData = {
            category:'',
            id: '',
            image:'',
            imageUrl:'',
            origin_price:'',
            price:'',
            title:'',
            unit:'',
          };
          const data = response.data.products[vm.pdId] || emptyPdData;
          vm.$set(vm.pdData, 0, data)
        } else {
          console.log('產品取得失敗');
        }
        
      })
    },
    delPd() {
      const vm = this;
      const api = `${process.env.VUE_APP_PRODUCTS_API_PATH}/api/${process.env.VUE_APP_CUSTOMER_PATH}/admin/product/${vm.pdData[0].id}`
      vm.$http.delete(api).then((response) => {
        if (response.data.success) {
          vm.$emit('del-state', response.data.success);
        } else {
          console.log('產品刪除失敗');
        }
      })
    },
  },
  props: ['model-title', 'pd-id', 'btn-style'],
  components: {
    DeletePds,

  }
};
</script>