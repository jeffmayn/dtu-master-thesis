<template><br><br><br>
  <div class="about">
    <h1>ABOUT</h1>
    <form>
      <b>Threat Identification & Response</b><br>
      Master thesis project done at the technical university of denmark<br>
      Version: 0.0.1<br>
      Licence: GNU General Public Licence 3.0<br>
      <br>
      <br>
      Last updated: 6. february, 2023
    </form>
    <h1>HOW TO USE TIR FRAMEWORK</h1>
    <form>
      <b>What is it?</b><br>
      TIR is a threat modeling tool that let you define a system with an easy drag-n-drop behavior of components into your model canvas. You define the input, output, state and control of your system. When your system is build you can click the run-button and calculate all known threats to your system. <br><br>
      <b>Note:</b> that only INPUT is implemented at this point. Output, State and Control is not implemented. There exists a component called 'Printer' for output, this is only to show how it would look at behave in the model.
    </form>
    <form>
      <b>What is INPUT?</b><br>
      Input are components that you input to a system. Examples are keyboards, network cards, router, switches. You can define your own input components by navigating to: <p>View > Database > Add New Component</p>
    </form>
    <form>
      <b>How to build a model</b><br>
      You drag in a component from the stencil window on the right into the canvas window on the left. When placed in the canvas window you need to link the component to the associated model-component, e.g. a stencil component with type INPUT is linked to the model-component of type INPUT.
      <br><br>
      Now right click the imported component, here you get the option to add a child component or inspect the object itself. When adding a child component you are presented with a window that let you search for a vendor and/or a product, e.g. 'Microsoft' and 'windows 10'. Here you can add as many child products as needed to build your component.      <br><br>
        You can delete components or link between components by hovering the mouse and click the delete-icon.<br><br>
        When building a model, especially a model with many components and child components, be aware that it can take a while before a result is calculated.
      </form>
  </div>
</template>

<style>
form {
   max-width: 550px;
   margin: 30px auto;
   background-color: #E7E7E7;
   text-align: left;
   padding: 40px;
   border-radius: 10px;
}
</style>