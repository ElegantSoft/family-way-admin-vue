<template>
  <div style="text-align:right">
    <vue-form-generator :schema="schema" :model="model"></vue-form-generator>
    <button type="button" class="btn btn-block btn-success" @click="create">اضافة مديمة</button>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  data() {
    return {
      model: {
        nameAr: "",
        nameEn: "",
        shipPrice: ""
      },
      schema: {
        groups: [
          {
            legend: "أضافة مدينة ",
            fields: [
              {
                type: "input",
                inputType: "text",
                label: "اسم المدينة بالعربي",
                model: "nameAr"
              },
              {
                type: "input",
                inputType: "text",
                label: "اسم المدينة بالانجليزى",
                model: "nameEn"
              },
              {
                type: "input",
                inputType: "number",
                label: "سعر الشحن لهذه المدينة",
                model: "shipPrice"
              }
            ]
          }
        ]
      }
    };
  },
  methods: {
    create() {
      Axios.post("/admin/city/", {
        nameAr: this.model.nameAr,
        nameEn: this.model.nameEn,
        shipPrice: this.model.shipPrice
      }).then(res => {
        if (res.status == 201) {
          alert("تم الاضافة بنجاح");
        }
      });
    }
  }
};
</script>
