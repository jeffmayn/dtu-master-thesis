<template>
   <div id="losForm">
      <br>
      <div id="menu-title">You are about to add a child component to: keyboard</div>
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

                  <th class="has-text-centered">Product</th>
                  <th class="has-text-centered"></th>
               </tr>
            </thead>
            <tbody>
            <tr v-for="product in result" :key = "product.id">
   
               <td>
                  {{ product }}
               </td>
               <td>
                  <a class="button is-success is-small" @click="deleteComponent(item.component_id)">Add</a>
               </td>
            </tr>
         </tbody>
         </table>
      </div>
      <div id="pagination">
      <button @click="prev" class="button is-success is-small">←</button>
       <b> {{ page_viewing }}</b> (of {{ response.length }}) <button @click="next" class="button is-success is-small">→</button>
      </div>
      <br>
      <br>
      <button @click="getJson" class="button is-success is-normal">Save</button>&nbsp;&nbsp;
      <button @click="toggleMenu" class="button is-danger is-normal">Cancel</button>
   </div>


</template>
   
<script>
import axios from "axios";
import url from "../config/settings.js";



export default {
   mounted() {

   },

   data() {
      return {
         items: [],
         vendor: "",
         product: "",
         response: [],
         result: [],
         page: 1,
         page_viewing: ""
      };
   },
   created() {
   },
   methods: {
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
            myList.push(this.response[i].cpeTitle);
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
#losForm {
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

#menu {
   position: absolute;
   left: 400px;
   top: 100px;
   z-index: 11;
}

#menu-title {
   text-align: center;
}
</style>