<template>
	<div class="form-container row container" style="text-align:right">
        <link rel="stylesheet" href="/ms.css" />

   <b-col sm="12">
          <b-form-group
            label="المدن:"
            label-for="product-categories"
            description="من فضلك اختر المدن التى تتوفر بها هذه الوسيلة"
          >
            <multiselect
              v-model="newPayment.cities"
              :options="cities"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              placeholder="المدن"
              label="nameAr"
              track-by="_id"
              selectedLabel="تم"
              deselectLabel="انقر للازالة"
              selectLabel="اختر"
              style="font-size: 12px; text-align: center !important;"
            ></multiselect>
          </b-form-group>
        </b-col>

				<button class="btn btn-success btn-block" @click="save()">حفظ</button>
   
   
   
    
  </div>
</template>

<script>
import axios from "axios";
import { setTimeout } from "timers";
import Axios from 'axios';

export default {
	props:['payment'],
	data() {
		return {
			newPayment:JSON.parse(this.payment),
			cities:[]
		}
	},
	mounted(){
		Axios.get("/moderator/city/index?page=1&limit=99999999").then(res=>{
			 this.cities = res.data.data;
		})
	},
	methods:{
		save(){
			Axios({
				url:`/moderator/payment/${this.newPayment._id}`,
				method:'PUT',
				data:{
					cities:this.newPayment.cities
				}
			}).then(res=>{
				if(res.status == 203){
					alert("تم الحفظ")
				}
			})
		}
	}

}
</script>

<style scoped>
.form-container {
  padding: 90px;
}
.slider {
  border: 1px solid #e1e1e1;
  padding: 5px;
  background-color: beige;
}
</style>