<template>
   <div id="search_form">
      <br>
      <div id="menu-title">You are about to add a child component to: {{ node_title }}</div>
      <hr>
      <table>
         <thead>
            <tr>
               <th>
                  Vendor
                  <div class="control">
                     <input class="input" v-model="vendor" type="text" placeholder="E.g. Microsoft" />
                  </div>
               </th>
               <th>
                  Product
                  <div class="control">
                     <input class="input" v-model="product" type="text" placeholder="E.g office" />
                  </div>
               </th>
               <th>
                  <br>&nbsp;
                  <button @click="searchProduct" class="button is-success is-normal">Search</button>
                <!--  <button @click="searchByID('CVE-2019-1010218')" class="button is-success is-normal">Search</button> -->
               </th>
            </tr>
         </thead>
      </table>
      <div id="response-frame">
         <table class="table is-striped is-bordered mt-2 is-fullwidth">
            <thead>
               <tr id="response-title">

                  <th class="">Results: {{ response.length }}</th>
                  <th class="has-text-centered"></th>
               </tr>
            </thead>
            <tbody>
            <tr v-for="product in result" :key = "product.id">
   
               <td>
                  {{ product.title }}
               </td>
               <td style="width: 20px;">
                  <a class="button is-success is-small" @click="add(product)">Add</a>
               </td>
            </tr>
         </tbody>
         </table>
      </div>
      <div id="pagination">
         page {{ page }} / {{ Math.floor(response.length / 5)+1 }} 
      <br>
      <button @click="prev" class="button is-success is-small">←</button>&nbsp;
      <button @click="next" class="button is-success is-small">→</button>
      </div>
      <div v-if="picked_products != 0">Added:</div>
      <tr v-for="(product, index) in picked_products">
        <div id="added-list-spacer"> <a class="button is-danger is-small" @click="remove(index)">x</a> {{ product.title }}</div>
   
      </tr>
      
      <br>
      <br>
      <button @click="save" class="button is-success is-normal">Save</button>&nbsp;&nbsp;
      <button @click="closeWindow" class="button is-danger is-normal">Cancel</button>
   </div>


</template>
   
<script>
import { toInteger } from "@antv/x6/lib/util/number/number";
import axios from "axios";
import url from "../config/settings.js";



export default {
   props: ['node_title'],
   mounted() {

   },

   data() {
      return {
         items: [],
         vendor: "",
         product: [],
         picked_products: [],
         response: [],
         result: [],
         page: 1,
         page_viewing: ""
      };
   },
   created() {
   },
   methods: {
      save() {
         this.$emit("data", this.picked_products);
      },
      remove(index) {

         this.picked_products.splice(index, 1);
         
      },
      add(product) {
         //console.log(product.title + "\n" + product.name);
         this.picked_products.push(product);
      },
      closeWindow() {
         this.$emit('close');
      },
      prev() {
         if (this.page > 1) {
            this.page = this.page - 1; 
            this.paginator();
         }
         
        
   

       },
      next() { 
         if (this.page < this.response.length / 5) {
            this.page = this.page + 1;
            this.paginator();
         }
      },
      paginator() {

         // array.slice((page_number - 1) * page_size, page_number * page_size);

         const page_size = 5;
         console.log(this.response.length);

         let myList = [];

         for (let i = 0; i < this.response.length; i++){
            myList.push({
               title: this.response[i].cpeTitle,
               name: this.response[i].cpeName,
            });
         }



         


         this.result = myList.slice((this.page - 1) * page_size, this.page * page_size);

         
         this.page_viewing = (0).toString() + " - " + (page_size * this.page).toString();
      

       

       //  this.result = 






         
      },
      async searchByID(id) {
         try {

            const response = await axios.get(url + `cve/${id}`);

            console.log(response.data);

            this.response = response.data;
         
         } catch (err) {
            console.log(err);
        } 
      },

      async searchProduct() {
         try {

            const response = await axios.post(url + "searchProduct", {
               vendor: this.vendor,
               product: this.product,
            });

            console.log(response.data);

            this.response = response.data;
            this.paginator();
         
         } catch (err) {
            console.log(err);
        } 
      },

   }

};
</script>
   
<style>

#added-list-spacer{
   margin-top: 2px;
}

#pagination {
   margin-top: 5px;
   text-align: right;
   line-height: 32px;
}


#response-frame {
   background-color: white;
   width: 100%;
   height: 275px;

}
#search_form {
   width: 600px;
   max-width: 600px;
   margin-left: 10px;
   margin-right: 10px;
   background-color: #E7E7E7;
   text-align: left;
   padding: 10px;
   border-radius: 10px;
   border-color: black;
   border-style: solid;
   border-width: 1px;
 
}

#menu_search {
   position: absolute;
   left: 340px;
   top: 80px;
   z-index: 12;
}

#menu-title {
   text-align: center;
}
</style>