<template>
  <b-container fluid style="text-align:right;">
    <link rel="stylesheet" href="/ms.css" />

    <b-form @submit="createProduct">
      <b-row class="my-1">
        <!-- title -->

        <!--ar title-->
        <b-col sm="12">
          <b-form-group
            label="العنوان الخاص بالمنتج باللغة العربية:"
            label-for="product-title"
            description="هذا العنوان سيظهر لمستخدمين اللغةالعربية"
          >
            <b-form-input
              required
              :state="product.title.ar.length > 4"
              v-model="product.title.ar"
              type="text"
            ></b-form-input>
          </b-form-group>
        </b-col>

        <!--en title-->
        <b-col sm="12">
          <b-form-group
            label="العنوان الخاص بالمنتج باللغة الانجليزية:"
            label-for="product-title"
            description="هذا العنوان سيظهر لمستخدمين اللغة الانجليزية"
          >
            <b-form-input
              required
              :state="product.title.en.length > 4"
              v-model="product.title.en"
              type="text"
            ></b-form-input>
          </b-form-group>
        </b-col>

        <!--en title-->
        <b-col sm="12">
          <b-form-group
            label="اسم البراند باللغة العربية:"
            label-for="product-title"
            description="مثال سامسونج او أبل "
          >
            <b-form-input v-model="product.brand.ar" type="text"></b-form-input>
          </b-form-group>
        </b-col>

        <!--en title-->
        <b-col sm="12">
          <b-form-group
            label="اسم البراند باللغة الانجليزية:"
            label-for="product-title"
            description="Apple or Samsung "
          >
            <b-form-input v-model="product.brand.en" type="text"></b-form-input>
          </b-form-group>
        </b-col>

        <!-- price -->
        <b-col sm="12">
          <b-form-group
            label="سعر المنتج:"
            label-for="product-price"
            description="من فضلك تأكد ان لوحة المفاتيح باللغة الانجليزية و انت تضيف السعر"
          >
            <b-form-input
              required
              :state="product.price > 0"
              v-model.number="product.price"
              type="number"
            ></b-form-input>
          </b-form-group>
        </b-col>

        <b-col sm="12">
          <b-form-group label="وضع هذا المنتج فى العروض:">
            <b-form-checkbox
              v-model="product.isOffer"
              :value="true"
              :unchecked-value="false"
            >عند اختيارك هذا الاختيار سيظهر هذا المنتج فى صفحة العروض</b-form-checkbox>
          </b-form-group>
        </b-col>

        <b-col sm="12">
          <b-form-group
            label="المخزون:"
            label-for="product-price"
            description="من فضلك وضع عدد القطع فى المخزن بحيث لا يتم طلب اوردرات غير موجودة "
          >
            <b-form-input v-model.number="product.inStock" type="number"></b-form-input>
          </b-form-group>
        </b-col>

        <!-- if has discount -->
        <b-col sm="12">
          <b-form-group
            label="وضع سعر مخفض:"
            label-for="product-hasDiscount"
            description="برجاء اختيار هذا الاختيار ان كنت تريد وضع سعر مخفض لهذا المنتج لفترة زمنية مجدولة"
          >
            <b-form-checkbox
              v-model="product.hasDiscount"
              :value="true"
              :unchecked-value="false"
            >هل تريد وضع تخفيض مجدول على هذا المنتج</b-form-checkbox>
          </b-form-group>
        </b-col>

        <!-- discount price -->
        <b-col sm="12" v-if="product.hasDiscount">
          <b-form-group
            label="سعر التخفيض:"
            label-for="product-price"
            description="من فضلك يجب ان يكون سعر الخصم أقل من سعر المنتج الاصلى"
          >
            <b-form-input
              :state="product.discountPrice < product.price && product.discountPrice != null"
              v-model.number="product.discountPrice"
              type="number"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label="تاريخ انتهاء التخفيض:"
            label-for="product-price"
            description="لن يعمل التخفيض عند انتهاء التاريخ"
          >
            <datepicker
              style="width:100%"
              placeholder="تاريخ انتهاء التخفيض"
              v-model="product.discountEnd"
              name="DisCountEnd"
            ></datepicker>
          </b-form-group>
        </b-col>

        <!-- details -->

        <!--ar details-->
        <b-col sm="12">
          <b-form-group
            label="وصف المنتج باللغة العربية:"
            label-for="product-details"
            description="هذا الوصف الذى سيظهر لمستخدمين اللغة العربية"
          >
            <b-form-textarea
              style="
                  border: 1px solid #e1e1e1;
                  border-radius: 5px;
                  "
              v-model="product.details.ar"
              rows="3"
              max-rows="6"
            ></b-form-textarea>
          </b-form-group>
        </b-col>

        <!--en details-->
        <b-col sm="12">
          <b-form-group
            label="وصف المنتج باللغة الانجليزية:"
            label-for="product-details"
            description="هذا الوصف سيظهر لمستخدمين اللغة الانجليزية"
          >
            <b-form-textarea
              style="
                         border: 1px solid #e1e1e1;
                         border-radius: 5px;
                         "
              v-model="product.details.en"
              rows="3"
              max-rows="6"
            ></b-form-textarea>
          </b-form-group>
        </b-col>

        <!-- categories -->
        <b-col sm="12">
          <b-form-group
            label="القسم:"
            label-for="product-categories"
            description="من فضلك اختر القسم الذى ينتمى له المنتج"
          >
            <multiselect
              v-model="product.categories"
              :options="categories"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              placeholder="الاقسام"
              :custom-label="handleName"
              track-by="_id"
              :preselect-first="true"
              selectedLabel="تم"
              deselectLabel="انقر للازالة"
              selectLabel="اختر"
              style="font-size: 12px; text-align: center !important;"
            ></multiselect>
          </b-form-group>
        </b-col>

        <!--specification-->
        <b-row>
          <b-col sm="12">
            <h5 class="mt-3 mb-3 text-success">اضافة المواصفات مثلا الكاميرة ٨ ميجا</h5>
          </b-col>
          <b-col sm="3">
            <b-form-group
              label="اسم الصفة باللغة العربية:"
              label-for="product-price"
              description="مثلا الكاميرة او حجم الشاشة"
            >
              <b-form-input v-model="newSpec.title.ar"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col sm="3">
            <b-form-group
              label="التفاصيل للصفة باللغة العربية:"
              label-for="product-price"
              description="مثلا ١٨ ميجا او ١٠ بوصة"
            >
              <b-form-input v-model="newSpec.details.ar"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col sm="3">
            <b-form-group
              label="اسم الصفة باللغة الانجليزية:"
              label-for="product-price"
              description="Example Camera or Screen size"
            >
              <b-form-input v-model="newSpec.title.en"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col sm="3">
            <b-form-group
              label="التفاصيل للصفة باللغة الانجليزية:"
              label-for="product-price"
              description="Example 18M or 10 Inch"
            >
              <b-form-input v-model="newSpec.details.en"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col sm="12">
            <b-button
              block
              @click="addSpec"
              :disabled="newSpec.title.ar.length < 1 || newSpec.title.en.length < 1 || newSpec.details.ar.length < 1 || newSpec.details.en.length < 1"
              variant="success"
            >اضافة الخاصية</b-button>
          </b-col>
        </b-row>
      </b-row>
      <!-- end of specs-->

      <!--show specs-->
      <div v-if="product.tableOfSpecs.length >= 1">
        <b-table striped hover small :items="product.tableOfSpecs"></b-table>
        <button
          type="button"
          class="btn btn-block btn-danger"
          @click="clearSpecs"
        >اعادة تعيين المواصفات</button>
      </div>

      <!--attributes-->
      <b-row>
        <b-col sm="12">
          <h5
            class="mt-3 mb-3 text-success"
          >اضافة المتغيرات مثلا المساحة ١٦ جيجا و ٣٢ جيجا و ٦٤ جيجا</h5>
        </b-col>

        <b-col sm="4">
          <b-form-group
            label="اسم المتغير باللغة العربية :"
            label-for="product-price"
            description="مثلا المساحة او اللون"
          >
            <b-form-input v-model="newAttr.attr_name.ar"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col sm="8">
          <b-form-group
            label="ادخل المتغيرات باللغة العربية متبوعة بفاصلة , (ستاجد الفاصلة عند الضغط على shift + 'و' ) :"
            label-for="product-price"
            description=" مثلا: احمر,اخضر,اصفر,ازرق"
          >
            <b-form-input v-model="newAttr.attr_values.ar"></b-form-input>
          </b-form-group>
        </b-col>

        <b-col sm="4">
          <b-form-group
            label="اسم المتغير باللغة الانجليزية :"
            label-for="product-price"
            description="Example: storage or color"
          >
            <b-form-input v-model="newAttr.attr_name.en"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col sm="8">
          <b-form-group
            label="ادخل المتغيرات باللغة الانجليزية متبوعة بفاصلة , (ستاجد الفاصلة عند الضغط على shift + 'و' ) :"
            label-for="product-price"
            description=" Example: red,blue,green"
          >
            <b-form-input v-model="newAttr.attr_values.en"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col sm="12">
          <b-button
            block
            @click="addAttr"
            :disabled="newAttr.attr_name.ar.length < 1 || newAttr.attr_name.en.length < 1 || newAttr.attr_values.ar.length < 1 || newAttr.attr_values.en.length < 1"
            variant="success"
          >اضافة المتغيرات</b-button>
        </b-col>

        <!--show attr-->
        <b-col sm="12" v-if="product.tableOfAttrs.length >= 1">
          <h3 class="text text-success">المتغيرات</h3>
          <table class="table table-striped table-sm table-hover">
            <thead>
              <tr>
                <th scope="col">اسم المتغير عربى</th>
                <th scope="col">اسم المتغير انجليزى</th>
                <th scope="col">المتغيرات بالعربية</th>
                <th scope="col">المتغيرات بالانجليزية</th>
                <th scope="col">حذف</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(table,i) in product.tableOfAttrs" :key="i">
                <th scope="row">{{table.arTitle}}</th>
                <td>{{table.enTitle}}</td>
                <td v-html="table.arAttr"></td>
                <td v-html="table.enAttr"></td>
                <td>
                  <b-button @click="deleteAttr(i)" variant="danger sm small">حذف</b-button>
                </td>
              </tr>
            </tbody>
          </table>
        </b-col>
        <div class="row" v-if="product.tableOfAttrs.length >= 1">
          <div class="col-12">
            <h5
              class="mt-3 mb-3 text-success"
            >عند الانتهاء من اضافة كل المتغيرات اضغط هنا لاضافة القطع</h5>
          </div>

          <div class="col-6">
            <div class="row">
              <div class="col-12"></div>
              <b-col sm="12" v-for="(attr,i) in product.attributes" :key="i">
                <label>
                  اسم المتغير
                  <span
                    class="text-success"
                  >{{attr.attr_name.ar +' - ' + attr.attr_name.en}}</span>
                </label>
                <select class="form-control" @change="selectChanged($event,i)">
                  <option
                    v-for="(value ,i) in attr.attr_values"
                    :value="i"
                    :key="i"
                  >{{value.ar+' - '+value.en}}</option>
                </select>
              </b-col>
            </div>
          </div>
          <div class="col-6">
            <div class="row">
              <b-col sm="12">
                <b-form-group
                  label="عدد القطع فى هذا المنتج فى المخزن "
                  label-for="product-price"
                  description=" مثال ٥ قطع "
                >
                  <b-form-input v-model.number="newPieces.inStock"></b-form-input>
                </b-form-group>
              </b-col>

              <b-col sm="12">
                <b-form-group
                  label="السعر لهذه القطعة "
                  label-for="product-price"
                  description=" مثال ٢٠٠ "
                >
                  <b-form-input v-model.number="newPieces.price"></b-form-input>
                </b-form-group>
              </b-col>

              <b-col sm="12">
                <b-form-group
                  label="وضع سعر مخفض:"
                  description="برجاء اختيار هذا الاختيار ان كنت تريد وضع سعر مخفض لهذا المنتج لفترة زمنية مجدولة"
                >
                  <b-form-checkbox
                    v-model="newPieces.hasDiscount"
                    :value="true"
                    :unchecked-value="false"
                  >هل تريد وضع تخفيض مجدول على هذا المنتج</b-form-checkbox>
                </b-form-group>
              </b-col>

              <!-- discount price -->
              <b-col sm="12" v-if="newPieces.hasDiscount">
                <b-form-group
                  label="سعر التخفيض:"
                  label-for="product-price"
                  description="من فضلك يجب ان يكون سعر الخصم أقل من سعر المنتج الاصلى"
                >
                  <b-form-input v-model="newPieces.discountPrice" type="number"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col sm="12" v-if="newPieces.hasDiscount">
                <b-form-group
                  label="تاريخ انتهاء التخفيض:"
                  label-for="product-price"
                  description="لن يعمل التخفيض عند انتهاء التاريخ"
                >
                  <datepicker
                    style="width:100%"
                    placeholder="تاريخ انتهاء التخفيض"
                    v-model="newPieces.discountEnd"
                    name="DisCountEnd"
                  ></datepicker>
                </b-form-group>
              </b-col>

              <!--show attr-->
            </div>
          </div>
          <b-row style="border-bottom: 4px green solid;
    margin: 50px;">
            <b-col sm="12" class="mt-3">
              <b-form-group
                label="رفع الصور الخاصة بهذه القطعة فقط وليس المنتج ككل"
                label-for="images2"
                description="ستعرض هذه الصور عندما يختار هذه القطعة مثلا هاتف لونه احمر فسيظهر هذه الصور عند اختيار اللون الاحمر"
              >
                <input
                  type="file"
                  id="images2"
                  multiple
                  @change="filesChangeForPiece"
                  class="uploadButton-input"
                />
              </b-form-group>
            </b-col>
            <div class="col-xl-12 mb-2 mt-2">
              <div class="progress" v-if="filesUploadsPercentPiece > 0">
                <div
                  class="progress-bar"
                  role="progressbar"
                  :style="{'width': filesUploadsPercentPiece+'%'}"
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >{{filesUploadsPercentPiece + '%'}}</div>
              </div>
              <div class="col-xl-12 mb-2 mt-2">
                <span>اختر بعض الصور التى تبرز محتويات العمل</span>
                <p class="alert alert-danger" v-if="filesExtErrorPiece">
                  يجب ان تكون الملفات المرفوعة بصيغة png, jpeg, jpg, pdf,
                  doc, docx
                </p>

                <div class="row">
                  <div
                    class="m-3"
                    style="height:300px;width:200px;"
                    v-for="(src , index) in newPieces.images"
                    :key="index"
                  >
                    <img
                      :src="'/uploads/products/'+src"
                      style="
                      height:100%;
                      width:100%;
                      object-fit: cover;
                    "
                    />
                    <button
                      @click="removeImagePiece(index)"
                      type="button"
                      style="
                        position: relative;
                        display: block;
                        margin: -96px auto;
                        background-color: #f44336;
                        border: 0;
                        padding: 10px;
                        color: #fff;

                  "
                    >ازالة الملف</button>
                  </div>
                </div>
              </div>
            </div>
            <b-col sm="12">
              <b-button @click="addPiece" block variant="success">اضافة القطعة</b-button>
            </b-col>
          </b-row>
        </div>
        <b-col sm="12" v-if="product.tableOfPieces.length >= 1">
          <h3 class="text text-success">القطع</h3>

          <table class="table table-striped table-sm table-hover">
            <thead>
              <tr>
                <th scope="col">المتغيرات</th>
                <th scope="col">السعر</th>
                <th scope="col">السعر المخفض</th>
                <th scope="col">تاريخ انتهاء التخفيض</th>
                <th scope="col">عدد القطع</th>
                <th scope="col">حذف</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(table,i) in product.tableOfPieces" :key="i">
                <th scope="row" v-html="table.attributes"></th>
                <td>{{table.price}}</td>
                <td>{{table.discountPrice? table.discountPrice : 'لا يوجد سعر مخفض'}}</td>
                <td>{{table.discountEnd | formatDate }}</td>
                <td>{{table.inStock}}</td>
                <td>
                  <b-button @click="deletePiece(i)" variant="danger sm small">حذف</b-button>
                </td>
              </tr>
            </tbody>
          </table>
        </b-col>
      </b-row>

      <!--upload images-->
      <b-row>
        <b-col sm="12" class="mt-3">
          <b-form-group
            label="رفع الصور الخاصة بالمنتج بشكل عام و ستكون هذه الصور التى تعرض قبل اختيار المتغيرات"
            label-for="images"
            description="هذه هي الصور الخاصة بالمنتج بشكل عام بغض النظر عن المتغيرات و القطع"
          >
            <input
              type="file"
              id="images"
              multiple
              @change="filesChange"
              class="uploadButton-input"
            />
          </b-form-group>
        </b-col>
        <div class="col-xl-12 mb-2 mt-2">
          <div class="progress" v-if="filesUploadsPercent > 0">
            <div
              class="progress-bar"
              role="progressbar"
              :style="{'width': filesUploadsPercent+'%'}"
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            >{{filesUploadsPercent + '%'}}</div>
          </div>
          <div class="col-xl-12 mb-2 mt-2">
            <span>اختر بعض الصور التى تبرز محتويات العمل</span>
            <p class="alert alert-danger" v-if="filesExtError">
              يجب ان تكون الملفات المرفوعة بصيغة png, jpeg, jpg, pdf,
              doc, docx
            </p>

            <div class="row">
              <div
                class="m-3"
                style="height:300px;width:200px;"
                v-for="(src ,index) in product.images"
                :key="index"
              >
                <img
                  :src="'/uploads/products/'+src"
                  style="
                      height:100%;
                      width:100%;
                      object-fit: cover;
                    "
                />
                <button
                  @click="removeImage(index)"
                  type="button"
                  style="
                        position: relative;
                        display: block;
                        margin: -96px auto;
                        background-color: #f44336;
                        border: 0;
                        padding: 10px;
                        color: #fff;

                  "
                >ازالة الملف</button>
              </div>
            </div>
          </div>
        </div>
      </b-row>

      <button type="submit" class="btn btn-block btn-success">تعديل المنتج</button>
    </b-form>
  </b-container>
</template>

<script>
import axios from "axios";
import Datepicker from "vuejs-datepicker";
import moment from "moment";

export default {
  props: ["prod"],
  components: {
    Datepicker
  },

  data() {
    return {
      product: JSON.parse(this.prod),
      newPieces: {
        attributes: [],
        price: null,
        hasDiscount: false,
        discountPrice: null,
        discountEnd: null,
        inStock: 0,
        images: []
      },
      newAttr: {
        attr_name: {
          ar: "",
          en: ""
        },
        attr_values: {
          ar: "",
          en: ""
        }
      },
      newSpec: {
        title: {
          ar: "",
          en: ""
        },
        details: {
          ar: "",
          en: ""
        }
      },

      categories: [],
      files: [],
      uploadPercentage: 0,
      extErr: false,
      filesExtError: false,
      filesExtErrorPiece: false,
      filesUploadsPercent: 0,
      filesUploadsPercentPiece: 0
    };
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    clearSpecs() {
      this.product.tableOfSpecs = [];
      this.product.specs = [];
    },
    /**
     * assign value to attribute when change value
     * @return void
     * @param e Event
     * @param i Index of Attribute
     */
    selectChanged(e, i) {
      const selectedValueIndex = e.target.value;
      this.newPieces.attributes[i].attr_value.ar = this.product.attributes[
        i
      ].attr_values[selectedValueIndex].ar;
      this.newPieces.attributes[i].attr_value.en = this.product.attributes[
        i
      ].attr_values[selectedValueIndex].en;
      // console.log(selectedValueIndex,i)
    },
    handleName(cat) {
      return cat.name.ar + " " + cat.name.en;
    },

    /**
     * Fetching categories
     * @return void
     */
    fetchCategories() {
      axios
        .get("/app/category/get-children")
        .then(res => (this.categories = res.data.cats));
    },

    /**
     * Creating new product
     * @param e Event
     */
    createProduct(e) {
      e.preventDefault();
      if (confirm("هل انت متاكد من البيانات و ستقوم بتعديل المنتج المنتج ؟")) {
        axios
          .post("/admin/product/edit", {
            product: this.product
          })
          .then(res => {
            if (res.data.message == "updated") {
              alert("تم تعديل المنتج بنجاح يمكنك انشاء منتج آخر");
            }
          });
      }
    },

    /**
     * add new specialize
     * @return void
     */
    async addSpec() {
      const newSpec2 = {
        title: {
          ar: this.newSpec.title.ar,
          en: this.newSpec.title.en
        },
        details: {
          ar: this.newSpec.details.ar,
          en: this.newSpec.details.en
        }
      };
      await this.product.specs.push(newSpec2);
      await this.removeNewSpecAndAssignToTable();
    },

    /**
     * reset new specialize and assign its value to
     * the table of specializes
     * @return void
     */
    removeNewSpecAndAssignToTable() {
      const newItemForTable = {
        "الاسم بالعربى": this.newSpec.title.ar,
        "الوصف بالعربى": this.newSpec.details.ar,
        "الاسم بالانجليزية": this.newSpec.title.en,
        "الوصف بالانجليزية": this.newSpec.details.en
      };
      this.product.tableOfSpecs.push(newItemForTable);
      this.newSpec.title.ar = "";
      this.newSpec.title.en = "";
      this.newSpec.details.ar = "";
      this.newSpec.details.en = "";
    },

    /**
     * add attribute
     * @return void
     */
    addAttr() {
      const ar_title = this.newAttr.attr_name.ar;
      const en_title = this.newAttr.attr_name.en;

      const ar_values_array = this.newAttr.attr_values.ar.split(",");
      const ar_values_array_filtered = ar_values_array.filter(item => {
        return item != "";
      });

      const en_values_array = this.newAttr.attr_values.en.split(",");
      const en_values_array_filtered = en_values_array.filter(item => {
        return item != "";
      });
      let TableOfAttr = {
        arTitle: ar_title,
        enTitle: en_title,
        arAttr: "",
        enAttr: ""
      };
      TableOfAttr.arAttr += "<div>";
      ar_values_array_filtered.forEach(item => {
        TableOfAttr.arAttr +=
          '<span class="badge badge-success">' + item + "</span>";
      });
      TableOfAttr.arAttr += "</div>";

      TableOfAttr.enAttr += "<div>";
      en_values_array_filtered.forEach(item => {
        TableOfAttr.enAttr +=
          '<span class="badge badge-success">' + item + "</span>";
      });
      TableOfAttr.enAttr += "</div>";
      this.product.tableOfAttrs.push(TableOfAttr);

      //add to original product
      let oneAttr = {
        attr_name: {
          ar: ar_title,
          en: en_title
        },
        attr_values: []
      };
      ar_values_array_filtered.forEach(item => {
        return oneAttr.attr_values.push({
          ar: item,
          en: ""
        });
      });

      oneAttr.attr_values.map((item, i) => {
        return (item.en = en_values_array_filtered[i]);
      });
      this.product.attributes.push(oneAttr);

      let attribute = {
        attr_name: {
          ar: ar_title,
          en: en_title
        },
        attr_value: {
          ar: ar_values_array_filtered[0],
          en: en_values_array_filtered[0]
        }
      };
      this.newPieces.attributes.push(attribute);
      this.newAttr.attr_name.ar = "";
      this.newAttr.attr_name.en = "";
      this.newAttr.attr_values.ar = "";
      this.newAttr.attr_values.en = "";
    },

    /**
     * delete attribute by id
     * @return void
     * @param id
     */
    deleteAttr(id) {
      this.$delete(this.product.tableOfAttrs, id);
      this.$delete(this.product.attributes, id);
      this.$delete(this.newPieces.attributes, id);
    },

    /**
     * add new piece to product and reset the new piece object
     * @return void
     */
    addPiece() {
      let newPiece = {
        attributes: [],
        price: this.newPieces.price,
        hasDiscount: this.newPieces.hasDiscount,
        discountPrice: this.newPieces.discountPrice,
        discountEnd: this.newPieces.discountEnd,
        inStock: this.newPieces.inStock,
        images: this.newPieces.images
      };
      this.newPieces.attributes.map((item, i) => {
        console.log(item);
        let NAFNP = {
          attr_name: {
            ar: item.attr_name.ar,
            en: item.attr_name.en
          },
          attr_value: {
            ar: item.attr_value.ar,
            en: item.attr_value.en
          }
        };
        newPiece.attributes.push(NAFNP);
      });
      console.log(newPiece);
      this.product.pieces.push(newPiece);

      let newTableOfPiecesItem = {
        attributes: "",
        price: this.newPieces.price,
        hasDiscount: this.newPieces.hasDiscount,
        discountPrice: this.newPieces.discountPrice,
        discountEnd: this.newPieces.discountEnd,
        inStock: this.newPieces.inStock
      };

      newTableOfPiecesItem.attributes += "<div>";
      newPiece.attributes.map((item, i) => {
        newTableOfPiecesItem.attributes +=
          '<span class="badge badge-success">' +
          item.attr_name.ar +
          ": " +
          item.attr_value.ar +
          "</span>";
      });
      newTableOfPiecesItem.attributes += "</div>";

      this.product.tableOfPieces.push(newTableOfPiecesItem);

      this.newPieces.price = null;
      this.newPieces.hasDiscount = false;
      this.newPieces.discountPrice = null;
      this.newPieces.discountEnd = null;
      this.newPieces.inStock = 0;
      this.newPieces.images = [];
    },

    /**
     * Deleting pieces
     * @return void
     * @param i Index of Piece
     */
    deletePiece(i) {
      this.$delete(this.product.tableOfPieces, i);
      this.$delete(this.product.pieces, i);
    },

    /**
     * upload images
     * @param e Event
     */
    filesChange(e) {
      this.form = new FormData();
      this.files = [];
      this.filesExtError = false;
      this.filesUploadsPercent = 0;
      let files = e.target.files;
      if (!files.length) {
        return false;
      }
      for (let i = 0; i < files.length; i++) {
        let ext = ["png", "jpeg", "jpg", "pdf", "doc", "docx"];
        if (!ext.includes(e.target.files[i].name.split(".").pop())) {
          return (this.filesExtError = true);
        }
        this.files.push(files[i]);
      }
      for (let i = 0; i < this.files.length; i++) {
        this.form.append("images", this.files[i]);
      }
      const config = {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        onUploadProgress: function(progressEvent) {
          this.filesUploadsPercent = parseInt(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          );
        }.bind(this)
      };
      axios
        .post("/admin/product/upload-images", this.form, config)
        .then(res => {
          this.filesUploadsPercent = 0;
          res.data.images.map(file => {
            this.product.images.push(file);
          });
        })
        .catch(err => {});
    },
    filesChangeForPiece(e) {
      this.form = new FormData();
      this.files = [];
      this.filesExtErrorPiece = false;
      this.filesUploadsPercentPiece = 0;
      let files = e.target.files;
      if (!files.length) {
        return false;
      }
      for (let i = 0; i < files.length; i++) {
        let ext = ["png", "jpeg", "jpg", "pdf", "doc", "docx"];
        if (!ext.includes(e.target.files[i].name.split(".").pop())) {
          return (this.filesExtErrorPiece = true);
        }
        this.files.push(files[i]);
      }
      for (let i = 0; i < this.files.length; i++) {
        this.form.append("images", this.files[i]);
      }
      const config = {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        onUploadProgress: function(progressEvent) {
          this.filesUploadsPercentPiece = parseInt(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          );
        }.bind(this)
      };
      axios
        .post("/admin/product/upload-images", this.form, config)
        .then(res => {
          this.filesUploadsPercentPiece = 0;
          res.data.images.map(file => {
            this.newPieces.images.push(file);
          });
        })
        .catch(err => {});
    },
    removeImagePiece(i) {
      this.$delete(this.newPieces.images, i);
    },

    /**
     * @param i Index
     * @return void
     */
    removeImage(i) {
      this.$delete(this.product.images, i);
    }
  },

  filters: {
    /**
     * Filter product discount expiration date
     * @param data
     * @return Date
     */
    formatDate(data) {
      if (data) {
        moment.locale("ar_SA");
        return moment(String(data)).fromNow();
      } else {
        return "لا يوجد تاريخ انتهاء";
      }
    }
  }
};
</script>

<style>
</style>
