<template>
  <div class="row clearfix">
    <div class="col-lg-12">
      <div class="card product_item_list" style="padding:35px">
        <div class="col-sm-4">
          <div class="form-group">
            <label style="text-align:right">عدد العناصر المعروضة</label>
            <select v-model.number="limit" class="form-control show-tick">
              <option value="5">5</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>
        <!-- product-table -->
        <div class="body table-responsive">
          <table class="table table-hover m-b-0">
            <thead>
              <tr>
                <th>#</th>
                <th>التوقيت</th>
                <th data-breakpoints="sm xs md">تعديل او حذف</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product,i) in products" :key="product._id">
                <td>{{i+1}}</td>
                <td>{{getDiscount(product)}}</td>
                <td>
                  <a
                    :href="'/admin/time/edit/'+product._id"
                    class="btn btn-default waves-effect waves-float waves-green"
                  >
                    <i class="zmdi zmdi-edit"></i>
                  </a>
                  <button
                    @click="remove(product,i)"
                    type="button"
                    class="btn btn-default waves-effect waves-float waves-red"
                  >
                    <i class="zmdi zmdi-delete"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- product-table -->
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
import { bus } from "../../../main";
import axios from "axios";

export default {
  data() {
    return {
      page: 1,
      limit: 20,
      products: [],
      nextPage: null,
      lastPage: 3
    };
  },
  methods: {
    async getCategories() {
      const res = await axios({
        url: `/admin/time/paginate?page=${this.page}&limit=${this.limit}`
      });
      this.products = res.data.data;
      this.lastPage = res.data.lastPage;
      this.nextPage = res.data.nextPage;
    },
    getDiscount(product) {
      return `من: ${this.convertTime(product.from)} الى: ${this.convertTime(
        product.to
      )}`;
    },
    convertTime(hour) {
      if (hour === 0) {
        return 12 + "AM";
      } else if (hour === 12) {
        return hour + "PM";
      } else {
        return hour <= 12 ? hour + "AM" : hour - 12 + "PM";
      }
    },

    inStock(product) {
      if (product.pieces.length) {
        let stock = 0;
        product.pieces.map(piece => {
          stock += piece.inStock;
        });
        return stock;
      } else {
        return product.inStock;
      }
    },
    remove(cat, i) {
      axios({
        url: "/admin/time/" + cat._id,
        method: "DELETE"
      }).then(res => {
        if (res.data.message == "deleted") {
          alert("تم مسح القسم");
          this.$delete(this.products, i);
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
