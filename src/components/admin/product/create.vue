<template>
  <b-container fluid style="text-align:right;">
    <link rel="stylesheet" href="/ms.css" />

    <!--upload images-->
    <b-row>
      <b-col sm="12" class="mt-3">
        <b-form-group label="رفع الصور الخاصة بالمنتج بشكل ">
          <input type="file" multiple @change="filesChange" />
        </b-form-group>
      </b-col>
      <div class="col-xl-12 mb-2 mt-2">
        <div class="progress" v-if="filesUploadsPercent > 0">
          <div
            class="progress-bar"
            role="progressbar"
            :style="{'width': filesUploadsPercent+'%'}"
            aria-valuenow="25"
            aria-valuemin="0"
            aria-valuemax="100"
          >{{filesUploadsPercent + '%'}}</div>
        </div>
        <div class="col-xl-12 mb-2 mt-2">
          <span>اختر بعض الصور التى تبرز محتويات العمل</span>
          <p class="alert alert-danger" v-if="filesExtError">
            يجب ان تكون الملفات المرفوعة بصيغة png, jpeg, jpg, pdf,
            doc, docx
          </p>

          <div class="row">
            <div
              class="m-3"
              style="height:200px;width:200px;"
              v-for="(src ,index) in product.images"
              :key="index"
            >
              <img
                :src="'/uploads/products/'+src"
                style="
                      height:100%;
                      width:100%;
                      object-fit: cover;
                    "
              />
              <button @click="removeImage(index)" type="button" class="removeImage">ازالة الملف</button>
            </div>
          </div>
        </div>
      </div>
    </b-row>
    <vue-form-generator :schema="schema" :model="product" :options="formOptions"></vue-form-generator>
  </b-container>
</template>

<script>
import axios from "axios";
import moment from "moment";
import pikaday from "pikaday";
import { validators } from "vue-form-generator";

export default {
  data() {
    return {
      categories: [],
      files: [],
      uploadPercentage: 0,
      extErr: false,
      filesExtError: false,
      filesExtErrorPiece: false,
      filesUploadsPercent: 0,
      filesUploadsPercentPiece: 0,
      product: {
        title: "",
        details: "",
        categories: [],
        price: "",
        discount: "",
        discountEnds: null,
        barCode: "",
        increaseCount: 1,
        userMax: "",
        images: [],
        inStock: ""
      },
      schema: {
        groups: [
          {
            legend: "أضافة منتج ",
            fields: [
              {
                type: "input",
                inputType: "text",
                label: "عنوان المنتج",
                required: true,
                min: 4,
                validator: validators.string.locale({
                  fieldIsRequired: "هذا الحقل مطلوب",
                  textTooSmall: "يجب ان يكون على الاقل ٤ حروف"
                }),
                model: "title"
              },
              {
                type: "textArea",
                label: "الوصف",
                model: "details",
                required: true,
                min: 15,
                validator: validators.string.locale({
                  fieldIsRequired: "هذا الحقل مطلوب",
                  textTooSmall: "يجب ان يكون على الاقل ١٥ حروف"
                }),
                rows: 10
              },
              {
                type: "vueMultiSelect",
                label: "القسم",
                placeholder: "من فضلك اختر قسم",
                model: "categories",
                required: true,
                selectOptions: {
                  multiple: true,
                  selectedLabel: "تم",
                  deselectLabel: "انقر للازالة",
                  selectLabel: "اختر",
                  label: "name",
                  trackBy: "_id",
                  key: "_id",
                  closeOnSelect: false,
                  searchable: true,
                  showLabels: true,
                  style: "text-align: center !important"
                },
                values: () => {
                  return this.categories;
                }
              },
              {
                type: "input",
                inputType: "number",
                label: "السعر",
                model: "price",
                required: true,
                validator: validators.number.locale({
                  fieldIsRequired: "هذا الحقل مطلوب"
                }),
                min: 0
              },
              {
                type: "input",
                inputType: "number",
                label: "سعر التخفيض",
                model: "discount",
                min: 0
              },
              {
                type: "pikaday",
                label: "تاريخ الانتهاء للتخفيض",
                model: "discountEnds",
                pikadayOptions: {
                  position: "top right",
                  onSelect: (date) => {
                    this.product.discountEnds = date;
                  }
                }
              },
              {
                type: "input",
                inputType: "text",
                label: "رقم الباركود",
                model: "barCode"
              },
              {
                type: "input",
                inputType: "number",
                required: true,
                validator: validators.number.locale({
                  fieldIsRequired: "هذا الحقل مطلوب"
                }),
                label:
                  "كمية الزيادة: مثلا عند الضغط على اضافة يزداد المنتج ب 1 كيلو او 0.5 كيلو",
                model: "increaseCount",
                min: 0
              },
              {
                type: "input",
                inputType: "number",
                required: false,
                label: "الحد الاقصى للشراء للمستخدم",
                model: "userMax"
              },
              {
                type: "input",
                inputType: "number",
                required: true,
                validator: validators.number.locale({
                  fieldIsRequired: "هذا الحقل مطلوب"
                }),
                label:
                  "المتوفر عندك بالمخزون بحيث لا يستطيع المستخدم شراء كمية اكبر من المتوفر عندك بالمخزون",
                model: "inStock",
                min: 0
              },
              {
                type: "submit",
                buttonText: "انشاء",
                validateBeforeSubmit: true,
                onSubmit: () => {
                  axios
                    .post("/admin/product/create", {
                      product: this.product
                    })
                    .then(res => {
                      if (res.data.message == "created") {
                        alert("تم انشاء المنتج بنجاح يمكنك انشاء منتج آخر");
                      }
                    });
                }
              }
            ]
          }
        ]
      },
      formOptions: {
        validateAfterLoad: false,
        validateAfterChanged: true,
        validateAsync: true
      }
    };
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    fetchCategories() {
      axios
        .get("/app/category/get-children")
        .then(res => (this.categories = res.data.cats));
    },
    createProduct(e) {
      e.preventDefault();
      if (confirm("هل انت متاكد من البيانات و ستقوم بإنشاء المنتج ؟")) {
        axios
          .post("/admin/product/create", {
            product: this.product
          })
          .then(res => {
            if (res.data.message == "created") {
              alert("تم انشاء المنتج بنجاح يمكنك انشاء منتج آخر");
            }
          });
      }
    },
    async getCategories() {
      const response = await axios.get("/app/category/get-children");
      console.log(response);
      return [];
    },
    filesChange(e) {
      this.form = new FormData();
      this.files = [];
      this.filesExtError = false;
      this.filesUploadsPercent = 0;
      let files = e.target.files;
      if (!files.length) {
        return false;
      }
      for (let i = 0; i < files.length; i++) {
        let ext = ["png", "jpeg", "jpg"];
        if (!ext.includes(e.target.files[i].name.split(".").pop())) {
          return (this.filesExtError = true);
        }
        this.files.push(files[i]);
      }
      for (let i = 0; i < this.files.length; i++) {
        this.form.append("images", this.files[i]);
      }
      const config = {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        onUploadProgress: function(progressEvent) {
          this.filesUploadsPercent = parseInt(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          );
        }.bind(this)
      };
      axios
        .post("/admin/product/upload-images", this.form, config)
        .then(res => {
          this.filesUploadsPercent = 0;
          res.data.images.map(file => {
            this.product.images.push(file);
          });
        })
        .catch(err => {});
    },
    removeImage(i) {
      this.$delete(this.product.images, i);
    }
  }
};
</script>

<style>
.multiselect__option {
  text-align: center !important;
}
.form-group.error .errors span {
  float: right;
}
.removeImage {
  position: relative;
  display: block;
  margin: -96px auto;
  background-color: #f44336;
  border: 0;
  padding: 10px;
  color: #fff;
}
.multiselect__tags {
  text-align: center;
}
</style>
