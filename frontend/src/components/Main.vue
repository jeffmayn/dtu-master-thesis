<template>
   <br><br>
   Welcome to TIR (Threat Identification & Response)<br>
   <router-link :to="{ name: 'Canvas' }" class="button is-success mt-5">Create new model</router-link>&nbsp;&nbsp;
   <router-link :to="{ name: 'Create' }" class="button is-success mt-5">See tutorial</router-link>

   <!--
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
-->

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


};
</script>

<style>

</style>