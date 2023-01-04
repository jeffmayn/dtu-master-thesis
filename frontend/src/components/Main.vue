<template>
   <div id="space"></div>
   <table class="table is-bordered mt-2 is-fullwidth">
      <thead>
         <tr>
            <th id="stencil" ref="stencil_ref"></th>
            <th id="model" ref="model_ref"></th>
         </tr>
      </thead>
   </table>

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
   
</template>

<script>
import { assertExpressionStatement } from '@babel/types';
import { Addon, Graph, Node, Shape, Edge } from '@antv/x6'
import axios from "axios";
import { useNotification } from '@kyvg/vue3-notification';
// MAYBE REMOVE
const notification = useNotification();





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
            console.log(response.data);
           
       
         } catch (err) {
           // console.log(err);
            notification.notify({
               title: "ost"
            });
         }
      }
   },

   mounted() {

     console.log("data: " + this.items);




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

      const stencil = new Addon.Stencil({
         title: 'Components',
         target: graph,
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


      const printer = new Shape.Rect({
         shape: 'rect',
         label: 'PRINTER',
         id: 'printer',
         x: 5,
         y: 50,
         width: 100,
         height: 25,

         ports: {
            groups: {
               in: {
                  position: { name: "right" },
                  attrs: {

                     circle: {
                        r: 6,
                        magnet: true
                     }
                  }
               },

            },
            items: [
               {
                  id: 'input',
                  group: 'in'
               }
            ]
         },
         attrs: {
            body: {
               strokeWidth: 1,
               fill: '#83E397',
            }
         }
      });

      const networkcard = new Shape.Rect({
         shape: 'rect',
         label: 'NETWORK CARD',
         id: 'networkcard',
         x: 5,
         y: 50,
         width: 135,
         height: 25,
         attrs: {
            body: {
               strokeWidth: 1,
               fill: 'white',
            }
         }
      });

      const ethernet = new Shape.Rect({
         shape: 'rect',
         label: 'ETHERNET CABLE',
         id: 'ethernetcable',
         x: 5,
         y: 50,
         width: 122,
         height: 25,
         ports: {
            groups: {
               in: {
                  position: { name: "left" },
                  attrs: {
                     circle: {
                        magnet: true
                     }
                  }
               },

            },
            items: [
               {
                  id: 'output',
                  group: 'in'
               }
            ]
         },
         attrs: {
            body: {
               strokeWidth: 1,
               fill: 'white',
            }
         }
      });


      stencil.load([printer, networkcard], 'group1');
      stencil.load([ethernet], 'group2')

      document.getElementById("stencil").appendChild(stencil.container);



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

      /*
      class Input extends Shape.Circle {
         constructor() {
            
         }
      }
      */
      /*
      graph.addEdge({
         source: 'printer',
         target: 'inpt'
      });
      */

      graph.on("node:contextmenu", ({ node }) => {

      });

      graph.on("node:mouseenter", ({ node }) => {
         node.addTools({
            name: 'button-remove',
            args: {
               offset: { x: 10, y: 10 }
            }
         })
      });

      graph.on("node:mouseleave", ({ node }) => {
         node.removeTools();
      });

      graph.on("edge:mouseenter", ({ edge }) => {
         edge.addTools({
            name: "button-remove"
         })
      });

      graph.on("edge:mouseleave", ({ edge }) => {
         edge.removeTools();
      });



      console.log(this.$refs.sten)


   },



};
</script>

<style>
#space {
   height: 3.3vh;
}


#canvas-title {
   font-size: 20px;
   z-index: 99;
}

#btn {
   position: absolute;
   bottom: 0;
   left: 10;
   padding-bottom: 2%;
   padding-left: 2%;
   z-index: 10;
}

#model {
   background-color: white;
   width: 100%;
   height: 50vh;
   margin: 2px 0;
   position: relative;
   z-index: 1;
}

#stencil {
   width: 350px;
   height: 50vh;
   margin: 2px 0;
   position: relative;
   z-index: 1;

}

#response {
   background-color: white;
   width: 40vh;
   height: 50vh;
   margin: 2px 0;
   border-width: 1px;
   border-style: solid;
   border-color: black;
   position: relative;
   z-index: 1;
}

#inumeration {
   background-color: white;
   width: 120vh;
   height: 15vh;
   margin: 2px 0;
   border-width: 1px;
   border-style: solid;
   border-color: black;
   position: relative;
   z-index: 1;
}
</style>