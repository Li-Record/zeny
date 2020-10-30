<template>
  <div class="d-inline-block">
    <b-button :variant="btnStyle" v-b-modal="pdId" @click="getProductData()">
      <slot name="btn_title">Click</slot>
    </b-button>
    
    <b-modal :id="pdId"
      size="lg" 
      centered 
      :title="modelTitle"
      ok-title="確認"
      cancel-title="取消"
      :header-bg-variant="headerBgVariant"
      :header-text-variant="headerTextVariant"
      :body-text-variant="bodyTextVariant"
      :footer-bg-variant="footerBgVariant"
      :footer-text-variant="footerTextVariant"
      @ok="console.log('ok')"
    >
      <CreatePds :pd-data="pdData[0]"></CreatePds>
      
    </b-modal>
  </div>
</template>

<script>
import CreatePds from '@/components/CreatePds.vue';

export default {
  name: "model",  
  data() {
    return {
      pdData: [],
      show: false,
      variants: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark'],
      headerBgVariant: 'dark',
      headerTextVariant: 'light',
      bodyTextVariant: 'dark',
      footerBgVariant: 'light',
      footerTextVariant: 'dark'
    };
  },
  props: ['model-title', 'pd-id', 'btn-style'],
  methods: {
    getProductData() {
      const vm = this;
      const api = `${process.env.VUE_APP_PRODUCTS_API_PATH}/api/${process.env.VUE_APP_CUSTOMER_PATH}/admin/products/all`
      vm.$http.get(api).then((response) => {
        if (response.data.success) {
          const data = response.data.products[vm.pdId] || '';
          // vm.pdData = response.data.products[vm.pdId];
          vm.$set(vm.pdData, 0, data)
        } else {
          console.log('產品取得失敗');
        }
        
      })
    }
  },
  components: {
    CreatePds,
  }
};
</script>