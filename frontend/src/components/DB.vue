<template>
      <br><br><br>
   <p>DATABASE</p>
   <div>
      <form>
     <!--  <router-link :to="{ name: 'Canvas' }" class="button is-success mt-5">Create new model</router-link>&nbsp;&nbsp;
      <router-link :to="{ name: 'Create' }" class="button is-success mt-5">Add new</router-link>-->
      <router-link :to="{ name: 'Create' }" class="button is-success mt-5">Add new component</router-link>
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
               <td>
                  <a class="button is-danger is-small" @click="deleteComponent(item.component_id)">X</a>
               </td>
            </tr>
         </tbody>
      </table>
      </form>
   </div>
</template>

<script>
import { assertExpressionStatement } from '@babel/types';
import axios from "axios";
import url from "../config/settings.js";

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
      async deleteComponent(id) {
         try { //http://localhost:5003
            const response = await axios.delete(`${url}delete/${id}`);
            console.log(response.data);
            this.getProducts();
         } catch (err) {
            console.log(err);
         }
      },
      async getProducts() {
         try {
            const response = await axios.get(url + "components");
            this.items = response.data;
            console.log(this.items);
         } catch (err) {
            console.log(err);
         }
      }
   }

};
</script>



<style>
form {
   max-width: 700px;
   margin: 30px auto;
   background-color: #E7E7E7;
   text-align: left;
   padding: 40px;
   border-radius: 10px;
}
</style>

