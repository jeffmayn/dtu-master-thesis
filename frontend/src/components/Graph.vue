<template>
   <div id="model" ref="model_ref"></div>
</template>
   
<script>
import { assertExpressionStatement } from '@babel/types';
import axios from "axios";
import { Addon, Graph, Node, Shape, Edge } from '@antv/x6'




export default {
   props: ['header'],
   mounted() {
      // this.$refs.container.focus()
      const graph = new Graph({
               container: this.$refs.model_ref,
               grid: true,
               height: 600,
               connecting: {
                  allowBlank: false,
                  snap: true,
                  validateConnection: function (args) {
                     //console.log(args.sourcePort);
                     if (args.sourcePort == "input") {
                        return args.targetCell.id == "inpt";
                     }

                     if (args.sourcePort == "output") {
                        return args.targetCell.id == "outpt";
                     }

                  }
               }
      });
      const input = graph.addNode({
               shape: 'rect',
               label: 'INPUT',
               id: 'inpt',
               nodeMovable: true,
               /*
               ports: {
                  groups: {
                     group1: {
                        markup: {
                           tagName: 'circle',
                           selector: 'circle',
                           attrs: {
                              r: 6,
                              fill: '#FFF',
                              stroke: '#000'
                           }
                        },
                        attrs: {},
                        zIndex: 1,
                        position: {
                           name: 'left',
                           args: {},
                        },
                     },
                  },
                  items: [
                     { id: 'port1', group: 'group1' },
                     { id: 'port2', group: 'group1' },
                     { id: 'port3', group: 'group1'}
                  ],
               },
               */

               x: 145,
               y: 140,
               width: 70,
               height: 200,
               attrs: {
                  body: {
                     fill: '#83E397',
                  }
               }
            });





            const output = graph.addNode({
               shape: 'rect',
               label: 'OUTPUT',
               id: 'outpt',
               x: 415,
               y: 140,
               width: 70,
               height: 200,
               attrs: {
                  label: {
                     direction: 'up'
                  },
                  body: {
                     fill: '#93CEFE',

                  }
               }
            });

            const control = graph.addNode({
               shape: 'rect',
               label: 'CONTROL',
               id: 'ctrl',
               x: 215,
               y: 85,
               width: 200,
               height: 55,
               attrs: {

                  body: {
                     fill: '#FF9494',
                  }
               }
            });

            const state = graph.addNode({
               shape: 'rect',
               label: 'STATE',
               x: 215,
               y: 340,
               width: 200,
               height: 55,
               attrs: {
                  body: {
                     fill: '#ECD333',
                  }
               }
            });

            const system = graph.addNode({
               shape: 'rect',
               label: 'SYSTEM',
               x: 215,
               y: 140,
               width: 200,
               height: 200,
               attrs: {
                  body: {
                     fill: '#D7D7D7',
                  }
               }
            });

   },

   data() {
      return {
         items: [],
      };
   },
   created() {
      this.displayGraph();
   },
   methods: {

      async displayGraph() {




         

      }

   }

};
</script>
   
<style>

</style>