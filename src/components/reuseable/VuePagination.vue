<template>
     <ul class="pagination pagination-primary m-b-0">
          

          <li class="page-item">
               <button
               type="button"
               class="btn btn-sm btn-primary"
               @click="onClickPreviousPage"
               :disabled="isInFirstPage"
               >
               <i class="zmdi zmdi-arrow-right"></i>
               </button>
          </li>
          <li class="page-item">
               <button
               type="button"
               class="btn btn-sm btn-primary"
               @click="onClickFirstPage"
               :disabled="isInFirstPage"
               >
               الصفحة الاولى
               </button>
          </li>

          <li
               v-for="(page,i) in pages"
               class="page-item"
               :key="i"
          >
               <button
               type="button"
               @click="onClickPage(page.name)"
               :disabled="page.isDisabled"
               :class="isPageActive(page.name)"
               >
               {{ page.name }}
               </button>
          </li>
          <li class="page-item">
               <button
               type="button"
               @click="onClickLastPage"
               :disabled="isInLastPage"
               class="btn btn-sm btn-primary"
               >
               الصفحة الآخيرة
               ({{last}})
               </button>
          </li>
          <li class="page-item">
               <button
               type="button"
               @click="onClickNextPage"
               :disabled="isInLastPage"
               class="btn btn-sm btn-primary"
               >
               <i class="zmdi zmdi-arrow-left"></i>
               </button>
          </li>

          
     </ul>

     
</template>

<script>
import {bus} from '../../main'
export default {
     props: {
          maxVisibleButtons: {
               type: Number,
               required: false,
               default: 4
          },
          totalPages: {
               type: Number,
               required: true
          },
          total: {
               type: Number,
               required: true
          },
          currentPage: {
               type: Number,
               required: true
          },
          last:{
               type:Number,
               required:true
          }
     },
     computed: {
          startPage() {
               // When on the first page
               if (this.currentPage === 1) {
               return 1;
               }
               // When on the last page
               if (this.currentPage === this.totalPages) {
               return this.totalPages - this.maxVisibleButtons;
               }
               // When in between
               return this.currentPage - 1;
          },
          pages() {
               const range = [];

               for (let i = this.startPage;
               i <= Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
               i+= 1 ) {
               range.push({
                    name: i,
                    isDisabled: i === this.currentPage
               });
               }

               return range;
          },
          isInFirstPage() {
               return this.currentPage === 1;
          },
          isInLastPage() {
               return this.currentPage === this.totalPages;
          },
     },
     methods: {
          onClickFirstPage() {
               bus.$emit('pagechanged', 1);
          },
          onClickPreviousPage() {
               bus.$emit('pagechanged', this.currentPage - 1);
          },
          onClickPage(page) {
               bus.$emit('pagechanged', page);
          },
          onClickNextPage() {
               bus.$emit('pagechanged', this.currentPage + 1);
          },
          onClickLastPage() {
               bus.$emit('pagechanged', this.totalPages);
          },
          isPageActive(page) {
               if(this.currentPage === page){
                    return 'btn btn-sm btn-success'
               }
               return 'btn btn-sm btn-primary'
          }

     }


}
</script>

<style scoped>
.btn {
     height:30px
}

</style>
