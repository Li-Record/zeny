<template>
  <div>
    <div v-if="isLoading" class="modal-lg" role="document">
      <div class="modal-content border-0">
        <div class="modal-body">
          <div class="row" @change="inputPdData">
            <div class="col-sm-4">
              <div class="form-group">
                <label for="image">輸入圖片網址</label>
                <input
                  type="text"
                  class="form-control"
                  id="image"
                  placeholder="請輸入圖片連結"
                  v-model="pd.imageUrl"
                />
              </div>
              <div class="form-group">
                <label for="customFile"
                  >或 上傳圖片
                  <i class="fas fa-spinner fa-spin"></i>
                </label>
                <input
                  type="file"
                  id="customFile"
                  class="form-control"
                  ref="files"
                  @change="upLoadFile"
                />
              </div>
              <img
                :src="pd.imageUrl"
                class="img-fluid"
                alt=""
                v-if="isImgLoading"
              />
              <Loader v-else></Loader>
            </div>
            <div class="col-sm-8">
              <div class="form-group">
                <label for="title">標題</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  placeholder="請輸入標題"
                  v-model="pd.title"
                />
              </div>

              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="category">分類</label>
                  <input
                    type="text"
                    class="form-control"
                    id="category"
                    placeholder="請輸入分類"
                    v-model="pd.category"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="price">單位</label>
                  <input
                    type="unit"
                    class="form-control"
                    id="unit"
                    placeholder="請輸入單位"
                    v-model="pd.unit"
                  />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="origin_price">原價</label>
                  <input
                    type="number"
                    class="form-control"
                    id="origin_price"
                    placeholder="請輸入原價"
                    v-model="pd.origin_price"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="price">售價</label>
                  <input
                    type="number"
                    class="form-control"
                    id="price"
                    placeholder="請輸入售價"
                    v-model="pd.price"
                  />
                </div>
              </div>
              <hr />

              <div class="form-group">
                <label for="description">產品描述</label>
                <textarea
                  type="text"
                  class="form-control"
                  id="description"
                  placeholder="請輸入產品描述"
                  v-model="pd.description"
                ></textarea>
              </div>
              <div class="form-group">
                <label for="content">說明內容</label>
                <textarea
                  type="text"
                  class="form-control"
                  id="content"
                  placeholder="請輸入產品說明內容"
                  v-model="pd.content"
                ></textarea>
              </div>
              <div class="form-group">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="is_enabled"
                    v-model="pd.is_enabled"
                    :true-value="1"
                    :false-value="0"
                  />
                  <label class="form-check-label" for="is_enabled">
                    是否啟用
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Loader v-else></Loader>
  </div>
</template>

<script>
import Loader from '@/components/Loader.vue'

export default {
  name: "CreatePds",
  data() {
    return {
      pd: {},
      isLoading: false,
      isImgLoading: true,
    };
  },
  props:['pd-data'],
  watch: {
    pdData(newData) {
      this.pd = {...newData};
      this.isLoading = !this.isLoading;
    },
  },
  methods: {
    inputPdData() {
      const vm = this;
      vm.$emit('send-pd-data', vm.pd);
    },
    upLoadFile() {
      const vm = this;
      const files = vm.$refs.files.files[0];
      const formData = new FormData();
      formData.append('file-to-upload', files);
      const api = `${process.env.VUE_APP_PRODUCTS_API_PATH}/api/${process.env.VUE_APP_CUSTOMER_PATH}/admin/upload`;
      vm.isImgLoading = false;
      vm.$http.post(api, formData, {
        header: {
          'Content-type': 'multipart/form-data',
        }
      }).then((response) => {
        if (response.data.success) {
          vm.pd.imageUrl = response.data.imageUrl;
          vm.inputPdData();
          vm.isImgLoading = true;
        } else {
          console.log('上傳失敗');
          vm.isImgLoading = true;
        }
      });
    }
  },
  components: {
    Loader
  }
};
</script>