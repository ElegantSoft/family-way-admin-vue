<template>
  <div class="row clearfix">
    <div class="col-lg-12">
      <div class="card product_item_list" style="padding:35px">
        <h3
          style="border-bottom: 1px solid #e1e1e1; padding-bottom: 10px;"
        >الطلب رقم #{{order.id}} الحالة {{renderStatus(order.status)}}</h3>
        <h5>المنتجات</h5>
        <div class="product-container" v-for="(item, i ) in order.items" :key="i">
          <p>{{item.product.title}}</p>
          
          <h4>عدد القطع: x{{item.count}} االتكلفة: {{item.cost}}</h4>
        </div>
        <div class="product-container">
          <h5>عنوان الشحن</h5>
          <p>المدينة: {{order.shippingAddress.city.nameAr}}</p>
          <p>الشارع: {{order.shippingAddress.street}}</p>
          <p>رقم الهاتف: {{order.shippingAddress.phone}}</p>
          <p>تفاصيل اضافية: {{order.shippingAddress.details}}</p>
          <h5>وسيلة الدفع</h5>
          <p>{{order.paymentMethod.nameAr}}</p>
          <h5>بيانات المستخدم</h5>
          <p>الاسم: {{order.user.name}}</p>
          <p>البريد: {{order.user.email}}</p>
          <p>النقاط: {{order.user.points}}</p>
          <p>رقم الهاتف المسجل بالحساب: {{order.user.phone}}</p>
        </div>
        <div class="product-container">
          <h5>اجمالى المبلغ: {{order.totalCost}}</h5>
          <p>تغيير حالة الطلب</p>
          <select v-model="order.status">
            <option v-for="(v,k,i) in orderStatus" :key="i" :value="v">{{renderStatus(v)}}</option>
          </select>
        </div>
        <button class="btn btn-success btn-block mt-2" @click="editOrder">تعديل الحالة</button>
      </div>
    </div>
  </div>
</template>

<script>
import orderStatus from "../../../../../../config/orderStatus";
import { bus } from "../../../main";
import moment from "moment";
import axios from "axios";
export default {
  props: ["o"],
  data() {
    return {
      order: JSON.parse(this.o),
      orderStatus: orderStatus
    };
  },
  filters: {},
  methods: {
    async editOrder() {
      const res = await axios.put("/admin/order", {
        id: this.order._id,
        status: this.order.status
      });
      if (res.data.message == "done") {
        alert("تم التعديل بنجاح");
      }
    },
    renderStatus(status) {
      switch (status) {
        case orderStatus.review:
          return "بانتظار المراجعة";
        case orderStatus.processing:
          return "قيد التجهيز";
        case orderStatus.shipped:
          return "فى الشحن";
        case orderStatus.delivered:
          return "تم التسليم";
        case orderStatus.reviewForReturn:
          return " بانتظار المراجعة للارجاع";
        case orderStatus.returned:
          return "مرتجع";
        case orderStatus.notReturned:
          return "تم رفض الارجاع";
        default:
          return "";
      }
    }
  }
};
</script>

<style >
.form-group {
  text-align: right;
}
.bootstrap-select .btn.btn-round.btn-simple .filter-option {
  font-size: 14px;
  float: right;
  text-align: center;
}
.product-container {
  padding: 10px;
  border: 1px solid #e1e1e1;
  margin: 5px;
}
.piece-container > p {
  color: #888;
  font-size: 13px;
}
h5 {
  font-weight: bolder;
  color: #7c4dff;
}
select {
  float: right;
}
</style>

