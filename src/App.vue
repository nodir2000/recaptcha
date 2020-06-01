<template>
  <div id="app">
    <h1>Application</h1>
    <Formwizard />
    <!-- <Firebase/> -->
    <!-- <Card/> -->
    <!-- <router-view/> -->
  </div>
</template>
<script>

// import Card from './card/Card.vue' 
// import Login from './Login/index';
// import Firebase from './firebase/Index.vue'
import Formwizard from './formWizard/index.vue'

export default {
  name: 'Todos',
  components:{
    // Firebase,
  Formwizard,  
    //  Card,
    // Login
    }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  
}
</style>
