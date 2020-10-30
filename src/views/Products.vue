<template>
  <div>
    <div class="text-right">
      <Model model-title="新增產品" pd-id="createPds" btn-style="primary btn-sm my-2">
        <template v-slot:btn_title>
          建立新產品
        </template>
      </Model>
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
      <tbody>
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
            <Model model-title="編輯產品" :pd-id="key" btn-style="outline-primary btn-sm mr-1">
              <template v-slot:btn_title>
                編輯
              </template>
            </Model>
            <a href="#" class="btn btn-outline-danger btn-sm">刪除</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Model from '@/components/Model.vue';


export default {
  name: "products",
  data() {
    return {
      products: [],
    };
  },
  components: {
    Model,
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
    });
  },
};
</script>