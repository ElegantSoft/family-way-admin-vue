<template>
  <div style="text-align:right">
		    <link rel="stylesheet" href="/ms.css" />

    <vue-form-generator :schema="schema" :model="model"></vue-form-generator>
    <div>
      <h4>الصلاحيات</h4>

      <div class="form-group">
        <input type="checkbox" id="create-product" :value="canCreateProduct" v-model="model.rules" />
        <label for="create-product">انشاء و تعديل المنتجات</label>
      </div>
      <div class="form-group">
        <input type="checkbox" id="create-coupon" :value="canCreateCoupon" v-model="model.rules" />
        <label for="create-coupon">انشاء وتعديل الكوبونات</label>
      </div>
      <div class="form-group">
        <input type="checkbox" id="create-slider" :value="canCreateSliders" v-model="model.rules" />
        <label for="create-slider">التحكم فى السلايدر و البنرات</label>
      </div>
      <div class="form-group">
        <input type="checkbox" id="create-orders" :value="canManageOrders" v-model="model.rules" />
        <label for="create-orders">التحكم فى الاوردرات</label>
      </div>
      <div class="form-group">
        <input type="checkbox" id="create-delayed" :value="canManageDelayed" v-model="model.rules" />
        <label for="create-delayed">التحكم فى الطلبات المؤجلة</label>
      </div>
      <div class="form-group">
        <input type="checkbox" id="create-cards" :value="canManageCards" v-model="model.rules" />
        <label for="create-cards">التحكم فى البطاقات</label>
      </div>
    </div>
		<div>
			<h4>الاقسام التى يستطيع النشر بها المنتجات </h4>
			<div class="form-group">
          <label>من فضلك اختر القسم</label>
          <multiselect
            v-model="model.controlledCategories"
            :options="categories"
            :multiple="true"
            :close-on-select="false"
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
    <button type="button" class="btn btn-block btn-success" @click="create">اضافة مدير</button>
  </div>
</template>

<script>
import Axios from "axios";
import rules from "../../../../../../config/moderatorRules";
export default {
  data() {
    return {
      model: {
        email: "",
        password: "",
        phone: "",
        name: "",
        username: "",
        controlledCategories: [],
        rules: []
      },
      canCreateProduct: rules.CAN_CREAT_PRODUCT,
      canCreateCoupon: rules.CAN_CREATE_COUPONS,
      canCreateSliders: rules.CAN_CREATE_SLIDERS,
      canManageOrders: rules.CAN_MANAGE_ORDERS,
      canManageDelayed: rules.CAN_MANAGE_DELAYED,
      canManageCards: rules.CAN_MANAGE_CARDS,
      schema: {
        groups: [
          {
            legend: "اضافة مدير ",
            fields: [
              {
                type: "input",
                inputType: "text",
                label:
                  "البريد الالكترونى للمدير يجب ان يكون بريد فريد لا يمكن ان يكون مستخدم من قبل",
                model: "email"
              },
              {
                type: "input",
                inputType: "text",
                label: "الرقم السرى",
                model: "password"
              },
              {
                type: "input",
                inputType: "text",
                label: "الهاتف الجوال و يجب ان يكون فريد و غير مكرر",
                model: "phone"
              },
              {
                type: "input",
                inputType: "text",
                label: "اسم المدير",
                model: "name"
              },
              {
                type: "input",
                inputType: "text",
                label: "اسم المستخدم للحساب و يجب ان يكون فريد و غير مكرر",
                model: "username"
              }
            ]
          }
        ]
      },
      categories: []
    };
  },
  mounted() {
    Axios.get("/app/category/get-children").then(
      res => (this.categories = res.data.cats)
    );
  },
  methods: {
    create() {
      Axios.post("/admin/moderators", {
        email: this.model.email,
        password: this.model.password,
        phone: this.model.phone,
        name: this.model.name,
        username: this.model.username,
				rules: this.model.rules,
				controlledCategories: this.model.controlledCategories
      }).then(res => {
        if (res.status == 201) {
          alert("تم الاضافة بنجاح");
        }
      }).catch(error => alert('هناك بيانات خاطئة او بيانات مكررة'));
		},
		handleNameCat(cat) {
      return cat.name.ar + " " + cat.name.en;
    },
  }
};
</script>

<style scoped>
</style>