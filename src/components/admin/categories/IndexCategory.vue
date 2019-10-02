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

        <div class="body table-responsive">
          <table class="table table-hover m-b-0">
            <thead>
              <tr>
                <th>#</th>
                <th>الصورة</th>
                <th>اسم القسم</th>
                <th data-breakpoints="sm xs">القسم الرئيسية لهذا القسم</th>
                <th data-breakpoints="xs">عدد المنتجات</th>
                <th data-breakpoints="sm xs md">تعديل او حذف</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(cat,i) in categories" :key="cat._id">
                <td>{{i+1}}</td>
                <td>
                  <img :src="'/uploads/cat-thumbs/resized/'+cat.image" width="48" alt="Product img" />
                </td>
                <td>
                  <h5>{{cat.name}}</h5>
                </td>
                <td>
                  <span class="text-muted">{{cat.parentId ? cat.parentId.name : 'قسم رئيسى'}}</span>
                </td>
                <td>{{cat.productCount}}</td>
                <td>
                  <a
                    :href="'/admin/category/edit/'+cat._id"
                    class="btn btn-default waves-effect waves-float waves-green"
                  >
                    <i class="zmdi zmdi-edit"></i>
                  </a>
                  <button
                    @click="remove(cat,i)"
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
      categories: [],
      nextPage: null,
      lastPage: 3
    };
  },
  methods: {
    async getCategories() {
      const res = await axios({
        url: `/app/category/paginate?page=${this.page}&limit=${this.limit}`
      });
      this.categories = res.data.data;
      this.lastPage = res.data.lastPage;
      this.nextPage = res.data.nextPage;
    },
    remove(cat, i) {
      axios({
        url: "/admin/category/delete",
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

