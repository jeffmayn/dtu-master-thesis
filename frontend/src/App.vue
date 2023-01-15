<template>
  <div id="nav" class="container is-max-desktop"></div>
  <router-view />
  <DockMenu :items="items" :on-selected="handleSelected" :theme="{
  primary: '#7F939D',
  secondary: '#607A87',
  tertiary: '#4B5C65',
  textColor: '#FFFFFF',
  textHoverColor: '#FFFFFF',
}" />
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
      }

      if (val.name == "Main Canvas") {
        router.push("/");
      }

      if (val.name == "About") {
        router.push("/about");
      }

      if (val.name == "Load demo") {

        console.log("loading..");
       
        
        
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
            { name: "Main Canvas" },
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
          menu: [{ name: "About" }],
        },
      ],
    };
  },
};
</script>
