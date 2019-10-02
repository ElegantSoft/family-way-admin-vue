import Vue from "vue";

export const bus = new Vue();
import BootstrapVue from "bootstrap-vue";
import moment from "moment";

Vue.use(BootstrapVue);
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import VueFormGenerator from "vue-form-generator";
Vue.use(VueFormGenerator);

import "vue-form-generator/dist/vfg.css";

Vue.config.productionTip = false;
//packages
Vue.component("multiselect", require("vue-multiselect").default);

/**
 * admin
 */
Vue.component(
  "add-category",
  require("./components/admin/categories/AddCategory.vue").default
);
Vue.component(
  "edit-category",
  require("./components/admin/categories/edit.vue").default
);
Vue.component(
  "control-slider",
  require("./components/admin/slider/ControlSlider.vue").default
);
Vue.component(
  "control-sliderii",
  require("./components/admin/slider/ControlSlider2.vue").default
);
Vue.component(
  "control-banner",
  require("./components/moderator/banners/edit.vue").default
);
Vue.component(
  "index-category",
  require("./components/admin/categories/IndexCategory.vue").default
);

//product
Vue.component(
  "create-product",
  require("./components/admin/product/create.vue").default
);
Vue.component(
  "index-product",
  require("./components/admin/product/index.vue").default
);
Vue.component(
  "edit-product",
  require("./components/admin/product/edit.vue").default
);

Vue.component(
  "vue-pagination",
  require("./components/reuseable/VuePagination.vue").default
);

//cards
Vue.component(
  "create-card-category",
  require("./components/admin/cards/categories/create.vue").default
);
Vue.component(
  "edit-card-category",
  require("./components/admin/cards/categories/edit.vue").default
);
Vue.component(
  "create-card-card",
  require("./components/admin/cards/cards/create.vue").default
);
Vue.component(
  "index-card-category",
  require("./components/admin/cards/categories/index.vue").default
);
Vue.component(
  "index-card-card",
  require("./components/admin/cards/cards/index.vue").default
);
Vue.component(
  "edit-card-card",
  require("./components/admin/cards/cards/edit.vue").default
);

//cites
Vue.component(
  "create-city",
  require("./components/admin/cities/create.vue").default
);
Vue.component(
  "index-city",
  require("./components/admin/cities/index.vue").default
);
Vue.component(
  "edit-city",
  require("./components/admin/cities/edit.vue").default
);

//payment
Vue.component(
  "index-payment",
  require("./components/admin/payments/index.vue").default
);
Vue.component(
  "edit-payment",
  require("./components/admin/payments/edit.vue").default
);

//coupons
Vue.component(
  "create-coupon",
  require("./components/admin/coupon/create.vue").default
);
Vue.component(
  "index-coupon",
  require("./components/admin/coupon/index.vue").default
);
Vue.component(
  "edit-coupon",
  require("./components/admin/coupon/edit.vue").default
);

//orders
Vue.component(
  "index-order",
  require("./components/admin/orders/index.vue").default
);
Vue.component(
  "show-order",
  require("./components/admin/orders/show.vue").default
);
Vue.component(
  "index-delayed",
  require("./components/admin/delayed/index.vue").default
);

//manage moderators
Vue.component(
  "create-moderator",
  require("./components/admin/moderators/create.vue").default
);
Vue.component(
  "index-moderator",
  require("./components/admin/moderators/index.vue").default
);
Vue.component(
  "edit-moderator",
  require("./components/admin/moderators/edit.vue").default
);

/**
 * Moderator
 */
Vue.component(
  "m-index-delayed",
  require("./components/moderator/delayed/index.vue").default
);
Vue.component(
  "m-add-category",
  require("./components/moderator/categories/AddCategory.vue").default
);
Vue.component(
  "m-edit-category",
  require("./components/moderator/categories/edit.vue").default
);
Vue.component(
  "m-control-slider",
  require("./components/moderator/slider/ControlSlider.vue").default
);
Vue.component(
  "m-control-sliderii",
  require("./components/moderator/slider/ControlSlider2.vue").default
);
Vue.component(
  "m-control-banner",
  require("./components/moderator/banners/edit.vue").default
);
Vue.component(
  "m-index-category",
  require("./components/moderator/categories/IndexCategory.vue").default
);

//product
Vue.component(
  "m-create-product",
  require("./components/moderator/product/create.vue").default
);
Vue.component(
  "m-index-product",
  require("./components/moderator/product/index.vue").default
);
Vue.component(
  "m-edit-product",
  require("./components/moderator/product/edit.vue").default
);

//cards
Vue.component(
  "m-create-card-category",
  require("./components/moderator/cards/categories/create.vue").default
);
Vue.component(
  "m-edit-card-category",
  require("./components/moderator/cards/categories/edit.vue").default
);
Vue.component(
  "m-create-card-card",
  require("./components/moderator/cards/cards/create.vue").default
);
Vue.component(
  "m-index-card-category",
  require("./components/moderator/cards/categories/index.vue").default
);
Vue.component(
  "m-index-card-card",
  require("./components/moderator/cards/cards/index.vue").default
);
Vue.component(
  "m-edit-card-card",
  require("./components/moderator/cards/cards/edit.vue").default
);

//cites
Vue.component(
  "m-create-city",
  require("./components/moderator/cities/create.vue").default
);
Vue.component(
  "m-index-city",
  require("./components/moderator/cities/index.vue").default
);
Vue.component(
  "m-edit-city",
  require("./components/moderator/cities/edit.vue").default
);

//payment
Vue.component(
  "m-index-payment",
  require("./components/moderator/payments/index.vue").default
);
Vue.component(
  "m-edit-payment",
  require("./components/moderator/payments/edit.vue").default
);

//coupons
Vue.component(
  "m-create-coupon",
  require("./components/moderator/coupon/create.vue").default
);
Vue.component(
  "m-index-coupon",
  require("./components/moderator/coupon/index.vue").default
);
Vue.component(
  "m-edit-coupon",
  require("./components/moderator/coupon/edit.vue").default
);

//orders
Vue.component(
  "m-index-order",
  require("./components/moderator/orders/index.vue").default
);
Vue.component(
  "m-show-order",
  require("./components/moderator/orders/show.vue").default
);

var filter = function(text, length, clamp) {
  clamp = clamp || "...";
  var node = document.createElement("div");
  node.innerHTML = text;
  var content = node.textContent;
  return content.length > length ? content.slice(0, length) + clamp : content;
};
var formateDate = function(data) {
  if (data) {
    moment.locale("ar_SA");
    return moment(String(data)).fromNow();
  } else {
    return "";
  }
};

Vue.filter("truncate", filter);
Vue.filter("date", formateDate);

new Vue({
  el: "#app"
});
