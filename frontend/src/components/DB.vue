<template>
   <div><br>
     <!--  <router-link :to="{ name: 'Canvas' }" class="button is-success mt-5">Create new model</router-link>&nbsp;&nbsp;
      <router-link :to="{ name: 'Create' }" class="button is-success mt-5">Add new</router-link>-->
      <router-link :to="{ name: 'Create' }" class="button is-success mt-5">Add new item</router-link>
      <table class="table is-striped is-bordered mt-2 is-fullwidth">
         <thead>
            <tr>
               <th class="has-text-centered">Name</th>
               <th class="has-text-centered">Description</th>
               <th class="has-text-centered">Category</th>
            </tr>
         </thead>
         <tbody>
            <tr v-for="item in items" :key = "item.component_id">
               <td>
                  {{ item.component_name }}
               </td>
               <td>
                  {{ item.component_description }}
               </td>
               <td>
                  {{ item.component_category }}
               </td>
            </tr>
         </tbody>
      </table>
   </div>
</template>

<script>
import { assertExpressionStatement } from '@babel/types';
import axios from "axios";

export default {

   data() {
      return {
         items: [],
      };
   },
   created() {
      this.getProducts();
   },
   methods: {
      async getProducts() {
         try {
            const response = await axios.get("http://localhost:5002/components");
            this.items = response.data;
            console.log(this.items);
         } catch (err) {
            console.log(err);
         }
      }
   }

};
</script>

<style></style>