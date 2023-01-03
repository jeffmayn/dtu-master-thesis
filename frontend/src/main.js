import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Graph, Node, Shape, Edge } from '@antv/x6'

createApp(App).use(router).mount('#app')


const graph = new Graph({
   container: document.getElementById('model'),
      //$('#model')[0],
   grid: true,
   height: 600
});

const graph2 = new Graph({
   container:document.getElementById('response'),
      //$('#response')[0],
   grid: true,
   height: 600,
});


const target = graph.addNode({
   shape: 'rect',
   label: 'INPUT',
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
