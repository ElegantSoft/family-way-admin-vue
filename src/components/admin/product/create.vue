<template>
  <b-container fluid style="text-align:right;">
    <link rel="stylesheet" href="/ms.css" />
  </b-container>
</template>

<script>
import axios from "axios";
import Datepicker from "vuejs-datepicker";
import moment from "moment";

export default {
  components: {
    Datepicker
  },

  data() {
    return {
      product: {},
      categories: [],
      files: [],
      uploadPercentage: 0,
      extErr: false,
      filesExtError: false,
      filesExtErrorPiece: false,
      filesUploadsPercent: 0,
      filesUploadsPercentPiece: 0
    };
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    /**
     * Fetching categories
     * @return void
     */
    fetchCategories() {
      axios
        .get("/app/category/get-children")
        .then(res => (this.categories = res.data.cats));
    },

    /**
     * Creating new product
     * @param e Event
     */
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

    /**
     * upload images
     * @param e Event
     */
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
        let ext = ["png", "jpeg", "jpg", "pdf", "doc", "docx"];
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

    /**
     * @param i Index
     * @return void
     */
    removeImage(i) {
      this.$delete(this.product.images, i);
    }
  }
};
</script>

<style>
</style>
