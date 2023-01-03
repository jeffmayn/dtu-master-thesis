<template>
  <div id ="nav" class="container is-max-desktop"></div>
  <router-view/>


  <DockMenu
    :items="items"
    :on-selected="handleSelected"
    :theme="{
      primary: '#7F939D',
      secondary: '#607A87',
      tertiary: '#4B5C65',
      textColor: '#FFFFFF',
      textHoverColor: '#FFFFFF',
    }"
  />

  <!DOCTYPE html>
   <html lang="en">
   <head>
      <meta charset="UTF-8" />
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
         integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>TIR - Threat Identification & Response</title>
   </head>

   <body>
      <div id="app"></div>
      <div class="container-fluid">
         <div class="column">
            <div id="topbar"></div>
            <div class="row">
               <div class="col-md-6">
                  <div id="model">
                  </div>
               </div>
               <div class="col-md-6">
                  <div id="response">
                  </div>
               </div>
            </div>
         </div>
      </div>
   </body>
   </html>





</template>

<style>
@import "~bulma/css/bulma.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#model, #response {
  background-color: white;
  margin: 20px 0;
  border-width: 1px;
  border-style: solid;
  border-color: black;
  height: 100vh;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
import { DockMenu } from "vue-dock-menu";
import "vue-dock-menu/dist/vue-dock-menu.css";
import router from "@/router";



export default {
  name: "App",
  components: {
    DockMenu,
  },
  setup() {
    const handleSelected = (val) => {

      

  

      if (val.name == "Database") {
        router.push("/database");
       
       // <router-link :to="{ name: 'Canvas' }" class="button is-success mt-5">Create new model</router-link>
      } 

      if (val.name == "Main Canvas") {
        router.push("/canvas");
      }

      
    };

    return {
      handleSelected,
    };
  },
  data() {
    return {
      count: 0,
      items: [
        {
          name: "file",
          menu: [
            { name: "New File" },
            { name: "Open File" },
            { isDivider: true },
            { name: "Load demo" },
            { isDivider: true },
            { name: "Save" },
            { name: "Save As..." },
            { isDivider: true },
            { name: "Close" },
            { name: "Exit" },
          ],
        },
        {
          name: "edit",
          menu: [
            { name: "Undo" },
            { name: "Redo" },
            { isDivider: true },
            { name: "Cut" },
            { name: "Copy" },
            { name: "Paste" },
          ],
        },
        { //  <router-link :to="{ name: 'Canvas' }" class="button is-success mt-5">Create new model</router-link>
          name: "View",
          menu: [
            { name: "Main Canvas"},
            { name: "Database" },/*
            { isDivider: true },
            {
              name: "Add new threat",
              menu: [{ name: "..." }, { name: "..." }],
            },*/
          ],
        },
        {
          name: "Help",
          menu: [{ name: "About" }, { name: "Guide" }],
        },
      ],
    };
  },
};
</script>
