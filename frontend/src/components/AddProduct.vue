<template>
   <br><br><br>
   <p>Add new component to database</p>
   <form>
      <div>
         <div class="field"><label class="label">Component Name</label></div>
         <div class="control">
            <input class="input" type="text" placeholder="E.g. Printer" v-model="componentName" />
         </div>
      </div>
      <div>
         <br>
         <div class="field"><label class="label">Category</label></div>
         <div class="categories">
            <select v-model="categories">
               <option value="input">Input</option>
               <option value="output">Output</option>
               <option value="state">State</option>
               <option value="control">Control</option>
            </select>
         </div>

         <!-- <div class="control">
            <input class="input" type="text" placeholder="input, output, state or control "
               v-model="componentCategory" />
         </div>-->
      </div>
      <div>
         <br>
         <div class="field"><label class="label">Description</label></div>
         <div class="control">
            <input class="input" type="text" placeholder="Provide a short description" v-model="componentDescription" />
         </div>
      </div>
      <div>
      </div><br>
      <div class="control">
         <button class="button is-success" @click="saveProduct">SAVE</button>
      </div>
   </form>
</template>

<script>
import axios from "axios";
export default {

   data() {
      return {
         componentName: "",
         categories: "input",
         componentDescription: ""
      }
   },
   methods: {
      async saveProduct() {
         try {
          //  await axios.post("http://localhost:5003/components", {
            await axios.post("https://dtu-master-thesis-tir.herokuapp.com/components", {
            
               component_name: this.componentName,
               component_category: this.categories,
               component_description: this.componentDescription
            });
            (this.componentName = ""), (this.componentDescription = "");
            this.$router.push({path: '/'});
         } catch (err) {
            console.log(err);
         }
      }
   },
}
</script>

<style>
form {
   max-width: 420px;
   margin: 30px auto;
   background-color: #E7E7E7;
   text-align: left;
   padding: 40px;
   border-radius: 10px;
}

input,
select {
   display: block;
   padding: 10px 6px;
   width: 100%;
   box-sizing: border-box;
   border: none;


}

input[type="checkbox"] {
   display: inline-block;
   width: 16px;
   margin: 0 10px 0 0;
   position: relative;
   top: 2px;

}
</style>