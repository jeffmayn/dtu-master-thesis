<template>
   <div id="node_form">
      <div id="node-title">{{ title }}</div>
      <div id="response-frame">
         <table class="table is-striped is-bordered mt-2 is-fullwidth">
            <thead>
               <tr id="response-title">

                  <th class="">Child products:</th>
                  <th class="has-text-centered"></th>
               </tr>
            </thead>
            <tbody>
               <tr v-for="(node, index) in nodes">

                  <td>
                     {{ node.title }}
                  </td>
                  <td style="width: 20px;">
                     <a class="button is-danger is-small" @click="remove(index)">x</a>
                  </td>
               </tr>
            </tbody>
         </table>
      </div>
      <br>
      <button @click="closeWindow" class="button is-danger is-normal">Close</button>
   </div>


</template>
   
<script>
import { toInteger } from "@antv/x6/lib/util/number/number";
import axios from "axios";
import url from "../config/settings.js";



export default {
   props: ['title', 'nodes'],
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
      remove(index) {

this.nodes.splice(index, 1);

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

         for (let i = 0; i < this.response.length; i++) {
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

#node_form {
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

#menu_node {
   position: absolute;
   left: 340px;
   top: 80px;
   z-index: 12;
}

#node-title {
   text-align: center;
   font-size: 30px;
}
</style>