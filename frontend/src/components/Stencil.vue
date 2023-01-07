<template>
   <div id="stencil" ref="stencil_ref"></div>
</template>
   
<script>
import { assertExpressionStatement } from '@babel/types';
import axios from "axios";
import GraphComponent from './Graph.vue';
import { Addon, Graph, Node, Shape, Edge } from '@antv/x6'




export default {
   components: { GraphComponent },
   props: ['graph'],
   mounted() {
      // this.$refs.container.focus()

   },

   data() {
      return {
         items: [],
      };
   },
   created() {
      this.displayStencil();
   },
   methods: {

      async displayStencil() {
         
         const stencil = new Addon.Stencil({
               title: 'Components',
               target: this.graph,
               stencilGraphHeight: 120,
               stencilGraphWidth: 280,
               search(cell, keyword) {
                  return cell.shape.indexOf(keyword) !== -1
               },
               placeholder: 'Search all',
               notFoundText: 'Not Found',
               collapsable: true,

               groups: [
                  {
                     name: 'group1',
                     title: 'INPUT',
                  },
                  {
                     name: 'group2',
                     title: 'CONTROL',
                     collapsed: true
                  },
                  {
                     name: 'group3',
                     title: 'STATE',
                     collapsed: true
                  },
                  {
                     name: 'group4',
                     title: 'OUTPUT',
                     collapsed: true
                  },
               ],
         });
            
      }

   }

};
</script>
   
<style>

</style>