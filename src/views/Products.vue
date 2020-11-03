<template>
  <div>
    <div class="text-right">
      <PdsModel model-title="新增產品" @enabled-state="enabledState" pd-id="createPds" btn-style="primary btn-sm my-2">
        <template v-slot:btn_title>
          建立新產品
        </template>
      </PdsModel>
    </div>
    <table class="table text-left table-hover">
      <thead>
        <tr>
          <th scope="col" width="120">分類</th>
          <th scope="col">名稱</th>
          <th scope="col" width="90">原價</th>
          <th scope="col" width="90">售價</th>
          <th scope="col" width="100">是否啟用</th>
          <th scope="col" width="120">編輯</th>
        </tr>
      </thead>
      <tbody v-if="idLoading">
        <tr v-for="(item, key) in products" :id="key" :key="key">
          <th class="align-middle" scope="row">{{ item.category }}</th>
          <td class="align-middle">{{ item.title }}</td>
          <td class="align-middle text-right">{{ item.origin_price }}</td>
          <td class="align-middle text-right">{{ item.price }}</td>
          <td class="align-middle">
            <span v-if="item.is_enabled" class="text-success">{{ '啟用' }}</span>
            <span v-else class="text-danger">{{ '未啟用' }}</span>
          </td> 
          <td class="align-middle">
            <PdsModel model-title="編輯產品" @enabled-state="enabledState" :pd-id="key" btn-style="outline-primary btn-sm mr-1">
              <template v-slot:btn_title>
                編輯
              </template>
            </PdsModel>
            <!-- <a href="#" class="btn btn-outline-danger btn-sm">刪除</a> -->
            <PdsDelModel model-title="刪除產品" @del-state="delState" :pd-id="key" btn-style="outline-danger btn-sm">
              <template v-slot:btn_title>
                刪除
              </template>
            </PdsDelModel>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <Loader></Loader>
      </tbody>
    </table>
    
  </div>
</template>

<script>
import PdsModel from '@/components/PdsModel.vue';
import PdsDelModel from '@/components/PdsDelModel.vue';
import Loader from '@/components/Loader.vue'

export default {
  name: "products",
  data() {
    return {
      products: [],
      idLoading: false,
    };
  },
  components: {
    PdsModel,
    PdsDelModel,
    Loader
  },
  created() {
    const vm = this;
    const api = `${process.env.VUE_APP_PRODUCTS_API_PATH}/api/${process.env.VUE_APP_CUSTOMER_PATH}/admin/products/all`;
    vm.$http.get(api).then((response) => {
      if (response.data.success) {
        vm.products = response.data.products;
      } else {
        console.log("API 取得失敗");
      }
      vm.idLoading = response.data.success;
    });
  },
  methods: {
    getAllPds() {
      const vm = this;
      const api = `${process.env.VUE_APP_PRODUCTS_API_PATH}/api/${process.env.VUE_APP_CUSTOMER_PATH}/admin/products/all`;
      vm.$http.get(api).then((response) => {
        if (response.data.success) {
          vm.products = response.data.products;
        } else {
          console.log("API 取得失敗");
        }
        vm.idLoading = response.data.success;
      });
    },
    enabledState(state) {
      const vm = this;
      if (state.data.id) {
        vm.products[state.data.id] = state.data;
      } else {
        vm.getAllPds();
      }
      
    },
    delState(state) {
      const vm = this;
      if (state) {
        vm.getAllPds();
      } else {
        console.log('刪除失敗');
      }
    }
  },
};
</script>