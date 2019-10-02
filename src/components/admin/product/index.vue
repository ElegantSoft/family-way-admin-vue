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
                <th>الصورة</th>
                <th>العنوان</th>
                <th>المباع</th>
                <th>السعر</th>
                <th>التخفيض</th>
                <th>فى المخزون</th>
                <th data-breakpoints="sm xs md">تعديل</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product,i) in products" :key="product._id">
                <td>{{i+1}}</td>
                <td>
                  <img
                    :src="'/uploads/products/resized/'+product.images[product.images.length - 1]"
                    width="48"
                    alt="Product img"
                  />
                </td>
                <td>
                  <span>{{product.title.ar | truncate(30, '...')}}</span>
                </td>
                <td>
                  <span class="text-muted">{{product.sold}}</span>
                </td>
                <td>{{product.price}}</td>
                <td>{{getDiscount(product)}}</td>
                <td>{{inStock(product)}}</td>
                <td>
                  <a
                    :href="'/admin/product/edit/'+product._id"
                    class="btn btn-default waves-effect waves-float waves-green"
                  >
                    <i class="zmdi zmdi-edit"></i>
                  </a>
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
        url: `/admin/product/paginate?page=${this.page}&limit=${this.limit}`
      });
      this.products = res.data.data;
      this.lastPage = res.data.lastPage;
      this.nextPage = res.data.nextPage;
    },
    getDiscount(product) {
      const discountDate = new Date(product.discountEnd);
      if (product.hasDiscount) {
        if (discountDate > Date.now()) {
          return product.discountPrice;
        } else {
          return "تاريخ التخفيض انتهى";
        }
      } else {
        return "لا يوجد ";
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
