<template>
   <div id="rcm_form">
      <div @click="openSearchWindow">Open {{ rightClickMenuTitle }}<br></div>
      Add child product<br>

   </div>


</template>
   
<script>
import { toInteger } from "@antv/x6/lib/util/number/number";
import axios from "axios";
import url from "../config/settings.js";



export default {
   props: ['rightClickMenuTitle'],
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
      openSearchWindow() {
         this.$emit('openSearchWindow');
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



#rcm_form {
   position: absolute;
   width: 175px;
   max-width: 175px;
   min-width: 175px;
   background-color: #E7E7E7;
   text-align: left;
   padding: 10px;
   border-radius: 3px;
   border-color: black;
   border-style: solid;
   border-width: 1px;
}

#menu_rcm {
   position: absolute;
   left: 340px;
   top: 80px;
   z-index: 11;
}


</style>