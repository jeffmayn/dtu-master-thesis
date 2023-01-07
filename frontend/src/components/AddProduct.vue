<template>
   <br><br>
   <div>
      <div class="field"><label class="label">Product name</label></div>
      <div class="control">
         <input class="input" type="text" placeholder="Product name" v-model="componentName" />
      </div>
   </div>
   <div>
      <div class="field"><label class="label">Category</label></div>
      <div class="control">
         <input class="input" type="text" placeholder="input, output, state or control " v-model="componentCategory" />
      </div>
   </div>
   <div>
      <div class="field"><label class="label">Description</label></div>
      <div class="control">
         <input class="input" type="text" placeholder="Product description" v-model="componentDescription" />
      </div>
   </div>
   <div>
      <div class="field"><label class="label">CVE URL</label></div>
      <div class="control">
         <input class="input" type="text" placeholder="Link to the CVE database of the product" v-model="componentCVE" />
      </div>
   </div><br>
   <div class="control">
      <button class="button is-success" @click="saveProduct">SAVE</button>
   </div>
</template>

<script>
import axios from "axios";
export default {

   data() {
      return {
         componentName: "",
         componentCategory: "",
         componentDescription: "",
         componentCVE: "",
      }
   },
   methods: {
      async saveProduct() {
         try {
            await axios.post("http://localhost:5003/components", {
               component_name: this.componentName,
               component_category: this.componentCategory,
               component_description: this.componentDescription,
               component_cve_url: this.componentCVE
            });
            (this.componentName = ""),(this.componentCategory = ""),(this.componentDescription = ""),(this.componentCVE = "");
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