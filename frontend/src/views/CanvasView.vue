<template>
   <div>
     <Canvas />
   </div>




 </template>
 
 <script>
 // @ is an alias to /src
import Canvas from '@/components/Canvas.vue'
import { Graph, Node, Shape, Edge } from '@antv/x6'






 
 export default {
   name: 'CanvasView',
   components: {
      Canvas
   }
 }
 </script>
 