<template>
  <div class="d-inline-block">
    <b-button :variant="btnStyle" v-b-modal="pdId" @click="getProductData()">
      <slot name="btn_title">Click</slot>
    </b-button>
    
    <b-modal 
      :id="pdId"
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
      @ok="editPds"
    >
      <CreatePds @send-pd-data="sendPdData" :pd-data="pdData[0]"></CreatePds>
      
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
      emit_pd: {},
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
    editPds() {
      const vm = this;
      vm.enabledState();
      if (vm.pdId === 'createPds') {
        const api = `${process.env.VUE_APP_PRODUCTS_API_PATH}/api/${process.env.VUE_APP_CUSTOMER_PATH}/admin/product`
        vm.$http.post(api, vm.emit_pd).then((response) => {
          if (!response.data.success) {
            console.log("建立商品 API 取得失敗");
          }
        });
      } else {
        const api = `${process.env.VUE_APP_PRODUCTS_API_PATH}/api/${process.env.VUE_APP_CUSTOMER_PATH}/admin/product/${vm.pdId}`
        vm.$http.put(api, vm.emit_pd).then((response) => {
          if (!response.data.success) {
            console.log("修改商品 API 取得失敗");
          }
        });
      }
    },
    sendPdData(pd) {
      const vm = this;
      console.log(pd);
      vm.emit_pd.data = {...pd};
    },
    enabledState() {
      const vm = this;
      vm.$emit('enabled-state', vm.emit_pd);
    },

  },
  components: {
    CreatePds,
  }
};
</script>