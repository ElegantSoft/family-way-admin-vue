<template>
  <div class="row form-container container">
    <link rel="stylesheet" href="/ms.css" />
    <!-- slider -->
    <div
      class="form-group col-sm-12 mb-2"
      style="border-bottom:1px #e1e1e1 solid"
      v-for="(slider,i) in sliders"
      :key="i"
    >
      <div>
        <span>رقم السلايدر {{i+1}}</span>
        <br />
        <div class="col-sm-6">
          <label for>صورة السلايدر</label>
          <span class="text-muted small">برجاء اختيار صورة مناسبة للقسم سوف تظهر فى التطبيق</span>
          <br />
          <input type="file" class @change="imageHandler($event,slider,i)" />
        </div>
        <div class="col-sm-12">
          <p class="alert alert-danger p-2" v-if="extErr[i]">
            يجب ان تكون الملفات المرفوعة بصيغة png,
            jpeg, jpg
          </p>
          <div class="progress m-3" v-if="uploadPercentage[i] > 0">
            <div
              class="progress-bar"
              role="progressbar"
              :style="{'width': uploadPercentage[i]+'%'}"
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            >{{uploadPercentage[i] + '%'}}</div>
          </div>
        </div>
        <span class="text-muted text">الصورة</span>
        <img
          :src="'/uploads/slider/resized/'+slider.image"
          style="height:200px; width:auto; border:1px #eae1e1 solid; padding: 3px;"
        />
      </div>
      <div class="col-sm-12">
        <div class="form-group">
          <label for>القسم الرئيسى</label>
          <select
            v-model="slider.refType"
            @change="typeChanged(slider)"
            class="form-control show-tick"
          >
            <option value="category">قسم</option>
            <option value="product">منتج</option>
          </select>
        </div>
      </div>
      <div class="col-sm-12" v-if="slider.refType == 'category'">
        <div class="form-group">
          <label>من فضلك اختر القسم</label>
          <multiselect
            v-model="slider.refId"
            :options="categories"
            :multiple="false"
            :close-on-select="true"
            :clear-on-select="false"
            :preserve-search="true"
            placeholder="الاقسام"
            :custom-label="handleNameCat"
            track-by="name"
            :preselect-first="false"
            selectedLabel="تم"
            deselectLabel="انقر للازالة"
            selectLabel="اختر"
            style="font-size: 12px; text-align: center !important;"
          ></multiselect>
        </div>
      </div>

      <div class="col-sm-12" v-if="slider.refType == 'product'">
        <div class="form-group">
          <label>من فضلك اختر المنتج</label>
          <multiselect
            v-model="slider.refId"
            :options="products"
            :multiple="false"
            :close-on-select="true"
            :clear-on-select="false"
            :preserve-search="true"
            placeholder="المنتجات"
            :custom-label="handleNameProduct"
            track-by="_id"
            :preselect-first="false"
            selectedLabel="تم"
            deselectLabel="انقر للازالة"
            selectLabel="اختر"
            style="font-size: 12px; text-align: center !important;"
          ></multiselect>
        </div>
      </div>
      <div class="col-sm-12">
        <div class="form-group">
          <button
            type="button"
            @click="update(slider,i)"
            class="btn btn-raised m-b-10 btn-info btn-block waves-effect"
          >حفظ السلايدر</button>
        </div>
      </div>
      <p v-if="su[i]" class="alert alert-success p-2">تم تحديث السلايدر بنجاح</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      sliders: [],
      categories: [],
      products: [],
      su: {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false
      },
      form: new FormData(),
      uploadPercentage: {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0
      },
      extErr: {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false
      },
      successAdded: false,
      errMessage: "",
      failedAdded: false
    };
  },
  mounted() {
    this.fetchSlider();
    this.fetchCategories();
    this.fetchProducts();
  },
  methods: {
    fetchSlider() {
      axios
        .get("/moderator/slider/fetch-slider")
        .then(res => (this.sliders = res.data.slider));
    },
    fetchCategories() {
      axios
        .get("/app/category/get-children")
        .then(res => (this.categories = res.data.cats));
    },
    fetchProducts() {
      axios
        .get("/moderator/product/fetch-all")
        .then(res => (this.products = res.data.products));
    },
    handleNameCat(cat) {
      return cat.name.ar + " " + cat.name.en;
    },
    handleNameProduct(cat) {
      return cat.title.ar + " " + cat.title.en;
    },
    typeChanged(slider) {
      if (slider.refType == "product") {
        return (slider.refId = this.products[0]);
      }
      if (slider.refType == "category") {
        return (slider.refId = this.categories[0]);
      }
    },
    async update(slider, i) {
      const res = await axios({
        url: "/moderator/slider/update",
        method: "POST",
        data: {
          slider
        }
      });
      if (res.data.message == "success") {
        this.su[i] = true;
        return this.closeNotification(i);
      }
    },
    closeNotification(i) {
      // console.log(i)
      this.su[i] = true;
      return setTimeout(() => (this.su[i] = false), 2000);
    },
    imageHandler(e, slider, i) {
      this.uploadPercentage = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
      };
      this.extErr = {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false
      };
      this.form = new FormData();

      let ext = ["png", "jpeg", "jpg"];
      if (ext.includes(e.target.files[0].name.split(".").pop())) {
        this.form.append("thumb", e.target.files[0]);
        const config = {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          onUploadProgress: function(progressEvent) {
            this.uploadPercentage[i] = parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            );
          }.bind(this)
        };
        axios
          .post("/moderator/slider/upload-image", this.form, config)
          .then(res => {
            if (res.data.message == "success") {
              this.sliders[i].image = res.data.image;
            }
          });
        console.log(this.form);
      } else {
        this.extErr[i] = true;
      }
    }
  },
  computed: {}
};
</script>

<style scoped>
.form-container {
}
.slider {
  border: 1px solid #e1e1e1;
  padding: 30px;
  background-color: beige;
}
</style>
