<template>
  <div id="app">
    <h1>Application</h1>
    <!-- <Formwizard/> -->
    <!-- <Login/> -->
    <router-view/>
  </div>
</template>
<script>

// import Formwizard from './form-wizard/index.vue'
// import Login from './Login/Index'
export default {
  name: 'Todos',
  components:{
    // Firebase,
  // Formwizard,  
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
