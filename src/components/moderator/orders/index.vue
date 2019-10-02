<template>
  <div class="row clearfix">
    <div class="col-lg-12">
      <div class="card product_item_list" style="padding:35px">
        <div class="col-sm-4">
          <div class="form-group">
            <label style="text-align:right">عدد الطلبات</label>
            <select v-model.number="limit" class="form-control show-tick">
              <option value="5">5</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>

        <div class="body table-responsive">
          <table class="table table-hover m-b-0">
            <thead>
              <tr>
                <th>رقم الاوردر</th>
                <th>الحالة</th>
                <th>الوقت</th>
                <th>السعر الاجمالى</th>
                <th>عدد المنتجات</th>
                <th>عرض</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(order,i) in categories" :key="i">
                <td>{{order.id}}</td>
                <td v-html="renderStatus(order.status)"></td>
                <td>
                  <span>{{order.created_at | date}}</span>
                </td>
                <td>
                  <span>{{order.totalCost}}</span>
                </td>
                <td>{{order.items.length}}</td>
                <td>
                  <a
                    :href="'/moderator/order/show/'+order._id"
                    class="btn btn-default waves-effect waves-float waves-green"
                  >
                    <i class="zmdi zmdi-eye"></i>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="card">
          <div class="body">
            <vue-pagination
              :total-pages="lastPage"
              :total="lastPage"
              :max-visible-buttons="maxVisible"
              :current-page="page"
              :last="lastPage"
            ></vue-pagination>
          </div>
        </div>
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
  data() {
    return {
      page: 1,
      limit: 20,
      categories: [],
      nextPage: null,
      lastPage: 3
    };
  },
  methods: {
    async getCategories() {
      const res = await axios({
        url: `/moderator/order/paginate?page=${this.page}&limit=${this.limit}`
      });
      this.categories = res.data.data;
      this.lastPage = res.data.lastPage;
      this.nextPage = res.data.nextPage;
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
    },
    remove(cat, i) {
      axios({
        url: "/moderator/category/delete",
        method: "DELETE",
        data: {
          id: cat._id
        }
      }).then(res => {
        if (res.data.message == "deleted") {
          alert("تم مسح القسم");
          this.$delete(this.categories, i);
        }
      });
    }
  },
  computed: {
    maxVisible() {
      return this.lastPage < 5 ? this.lastPage - 1 : 5;
    }
  },
  created() {
    bus.$on("pagechanged", data => {
      this.page = data;
      return this.getCategories();
    });
  },
  mounted() {
    this.getCategories();
  },
  watch: {
    limit(n) {
      this.page = 1;
      return this.getCategories();
    }
  }
};
</script>

<style>
.form-group {
  text-align: right;
}
.bootstrap-select .btn.btn-round.btn-simple .filter-option {
  font-size: 14px;
  float: right;
  text-align: center;
}
</style>

