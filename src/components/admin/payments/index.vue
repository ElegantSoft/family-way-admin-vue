<template>
  <div class="row clearfix">
    <div class="col-lg-12">
      <div class="card product_item_list" style="padding:35px">
        <div class="col-sm-4"></div>

        <div class="body table-responsive">
          <table class="table table-hover m-b-0">
            <thead>
              <tr>
                <th>#</th>
                <th>الاسم</th>
                <th>عدد المدن</th>
                <th>تعديل المدن</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(cat,i) in categories" :key="cat._id">
                <td>{{i+1}}</td>

                <td>
                  <h5>{{cat.nameAr+' '+cat.nameEn}}</h5>
                </td>
                <td>
                  <h5>{{cat.cities.length}}</h5>
                </td>
                <td>
                  <a
                    :href="'/admin/payment/edit/'+cat._id"
                    class="btn btn-default waves-effect waves-float waves-green"
                  >
                    <i class="zmdi zmdi-edit"></i>
                  </a>
                </td>

                <td></td>
              </tr>
            </tbody>
          </table>
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
      categories: []
    };
  },
  methods: {
    async getCategories() {
      const res = await axios({
        url: `/admin/payment/index`
      });
      this.categories = res.data;
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

