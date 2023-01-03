<template>
   <div>
      <div class="field"><label class="label">Product name</label></div>
      <div class="control">
         <input class="input" type="text" placeholder="Product name" v-model="productName"/>
      </div>
   </div>
   <div>
      <div class="field"><label class="label">Price</label></div>
      <div class="control">
         <input class="input" type="text" placeholder="Price" v-model="productPrice"/>
      </div>
   </div>
   <div class="control">
      <button class="button is-success" @click="saveProduct">SAVE</button>
   </div>
</template>

<script>
import axios from "axios";
export default {

   data() {
      return {
         productName: "",
         productPrice: "",
      }
   },
   methods: {
      async saveProduct() {
         try {
         await axios.post("http://localhost:5002/products", {
            product_name: this.productName,
            product_price: this.productPrice
         });
         (this.productName = ""),
            (this.productPrice = "");
            this.$router.push("/");
         } catch (err) {
            console.log(err);
         }
      }
   },
}
</script>

<style>
</style>