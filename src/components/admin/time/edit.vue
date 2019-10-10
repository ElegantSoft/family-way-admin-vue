<template>
  <b-container fluid style="text-align:right;">
    <link rel="stylesheet" href="/ms.css" />
    <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
  </b-container>
</template>

<script>
import axios from "axios";
import moment from "moment";
import pikaday from "pikaday";
import { validators } from "vue-form-generator";
import VueFormGenerator from "vue-form-generator";
validators.zipcode = (value, field, model) => {
  if (!value) {
    return ["هذا الحقل مطلوب"];
  }
  if (value <= model.from) {
    return ["يجب ان يكون وقت اكبر من الوقت (من)"];
  } else {
    return [];
  }
};
export default {
  props: ["oldmodel"],
  data() {
    return {
      model: JSON.parse(this.oldmodel),
      schema: {
        groups: [
          {
            legend: "تعديل ",
            fields: [
              {
                type: "select",
                label: "من",
                required: true,
                model: "from",
                validator: validators.integer.locale({
                  fieldIsRequired: "هذا الحقل مطلوب"
                }),
                values: () => {
                  let values = [];
                  for (let i = 0; i < 24; i++) {
                    values.push({ name: this.convertTime(i), id: i });
                  }
                  return values;
                }
              },
              {
                type: "select",
                label: "الى",
                required: true,
                min: 5,
                validator: ["zipcode"],
                model: "to",
                values: () => {
                  let values = [];
                  for (let i = 0; i < 24; i++) {
                    values.push({ name: this.convertTime(i), id: i });
                  }
                  return values;
                }
              },
              {
                type: "submit",
                buttonText: "تعديل",
                validateBeforeSubmit: true,
                onSubmit: () => {
                  axios
                    .put("/admin/time/" + this.model._id, {
                      newModel: this.model
                    })
                    .then(res => {
                      if (res.data.message == "updated") {
                        alert("تم التعديل بنجاح ");
                      }
                    });
                  // alert("test");
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

  methods: {
    zipcode(value) {
      if (value < 10) {
        return ["Invalid Zip Code."];
      } else {
        return [];
      }
    },
    convertTime(hour) {
      if (hour === 0) {
        return 12 + "AM";
      } else if (hour === 12) {
        return hour + "PM";
      } else {
        return hour <= 12 ? hour + "AM" : hour - 12 + "PM";
      }
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
