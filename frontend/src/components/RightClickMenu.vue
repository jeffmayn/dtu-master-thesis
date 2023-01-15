<template>
   <div id="rcm_form">
      <p>
      <div @click="openNodeWindow">Open {{ rightClickMenuTitle }}</div>
      </p>
      <p>
      <div @click="openSearchWindow">Add child product
      </div>
      </p>
   </div>
</template>
   
<script>
import { toInteger } from "@antv/x6/lib/util/number/number";
import axios from "axios";
import url from "../config/settings.js";

export default {
   props: ['rightClickMenuTitle'],
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
      openNodeWindow() {
         this.$emit('openNodeWindow');
      },
      openLoadModelsWindow() {
         this.$emit('openLoadModelsWindow');
      },

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
         const page_size = 5;
         let myList = [];

         for (let i = 0; i < this.response.length; i++) {
            myList.push(this.response[i].cpeTitle);
         }
         this.result = myList.slice((this.page - 1) * page_size, this.page * page_size);
         this.page_viewing = (0).toString() + " - " + (page_size * this.page).toString();
      },

      async searchByID(id) {
         try {
            const response = await axios.get(url + `cve/${id}`);
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

p:hover {
   background-color: #D6D6D6;
   cursor: pointer;
}

#menu_rcm {
   position: absolute;
   left: 340px;
   top: 80px;
   z-index: 11;
}
</style>