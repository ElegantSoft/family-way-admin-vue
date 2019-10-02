<template>
  <div class="form-container row container" style="text-align:right">
    <div class="col-sm-12">
      <div class="form-group">
        <label for>اسم القسم باللغة العربية</label>
        <input type="text" class="form-control" v-model="newCategory.name.ar" />
      </div>
    </div>

    <div class="col-sm-12">
      <div class="form-group">
        <label for>اسم القسم باللغة الانجليزية</label>
        <input type="text" class="form-control" v-model="newCategory.name.en" />
      </div>
    </div>

    <div class="col-sm-6">
      <label for>صورة القسم</label>
      <span class="text-muted small">برجاء اختيار صورة مناسبة للقسم سوف تظهر فى التطبيق</span>
      <br />
      <input type="file" class @change="imageHandler" />
    </div>
    <br />
    <div class="col-sm-6">
      <img
        :src="'/uploads/cat-thumbs/'+newCategory.image"
        v-if="newCategory.image"
        class="slider"
        alt
      />
    </div>
    <div class="col-sm-12">
      <p
        class="alert alert-danger p-2"
        v-if="extErr"
      >يجب ان تكون الملفات المرفوعة بصيغة png, jpeg, jpg</p>
      <div class="progress m-3" v-if="uploadPercentage > 0">
        <div
          class="progress-bar"
          role="progressbar"
          :style="{'width': uploadPercentage+'%'}"
          aria-valuenow="25"
          aria-valuemin="0"
          aria-valuemax="100"
        >{{uploadPercentage + '%'}}</div>
      </div>
    </div>
    <div class="col-sm-12">
      <div class="form-group">
        <button
          @click="addCategory"
          style="width:100%"
          type="button"
          class="mt-3 btn btn-md btn-info"
        >اضافة القسم</button>
      </div>
    </div>
    <div class="col-sm-12">
      <p v-if="successAdded" class="alert alert-success p-2">تم اضافة القسم بنجاح</p>
      <p v-if="failedAdded" class="alert alert-danger p-2">{{errMessage}}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      newCategory: {
        name: {
          ar: "",
          en: ""
        },
        image: "placeholder.png"
      },
      form: new FormData(),
      uploadPercentage: 0,
      extErr: false,
      successAdded: false,
      errMessage: "",
      failedAdded: false
    };
  },
  watch: {
    isChild(v) {
      if (!v) {
        return (this.newCategory.parentId = null);
      }
    }
  },
  methods: {
    imageHandler(e) {
      this.uploadPercentage = 0;
      this.extErr = false;
      this.form = new FormData();

      let ext = ["png", "jpeg", "jpg"];
      if (ext.includes(e.target.files[0].name.split(".").pop())) {
        this.form.append("thumb", e.target.files[0]);
        const config = {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          onUploadProgress: function(progressEvent) {
            this.uploadPercentage = parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            );
          }.bind(this)
        };
        axios
          .post("/moderator/category/upload-image", this.form, config)
          .then(res => {
            if (res.data.message == "done") {
              this.newCategory.image = res.data.image;
            }
          });
        console.log(this.form);
      } else {
        this.extErr = true;
      }
    },
    addCategory() {
      this.successAdded = false;
      axios({
        url: "/moderator/card/category/create",
        method: "POST",
        data: {
          name: this.newCategory.name,
          parentId: this.newCategory.parentId,
          image: this.newCategory.image
        }
      }).then(res => {
        if (res.data.message == "success") {
          this.successAdded = true;
          return setTimeout(this.hideMessage, 3000);
        } else {
          this.errMessage = res.data.message;
          this.failedAdded = true;
          return setTimeout(this.hideMessage, 3000);
        }
      });
    },
    hideMessage() {
      this.successAdded = false;
      this.failedAdded = false;
    }
  }
};
</script>

<style scoped>
.form-container {
  padding: 90px;
}
.slider {
  border: 1px solid #e1e1e1;
  padding: 5px;
  background-color: beige;
}
</style>